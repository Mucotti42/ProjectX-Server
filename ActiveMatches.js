const rankManager = require('./RankManager')
const db = require('./database')
const dbTables = require('./dbTables')
const communication = require('./communication')
const userManager = require('./UserManager')
exports.Match = class{
    constructor(player1, player2,gameMode,map, gameId){
        this.player1 = player1;
        this.player2 = player2;
        this.gameMode = gameMode;
        this.gameId = gameId;
        this.map = map;
        this.startedTime = Date.now();
        this.result = 0;
        this.gameState = 0;
        this.readyPlayerList = new Array();
        this.players = new Array();
        this.players.push(player1);
        this.players.push(player2);
        this.turn = 1;
    }
}
const matches = new Map();

exports.GetMatch = function (gameId) {
    let match = matches.get(gameId);
    if(match)
        return match;

    console.log('No Match Found!!!')
}

exports.IsMaster = function (gameId, playerId) {
    return this.GetMatch(gameId).player1 == playerId
}

exports.SetMatch = function (gameId, match) {
    matches.set(gameId, match);
}

exports.SetMatchState = function(gameId, state){
    this.GetMatch(gameId).gameState = state;
}
exports.EndMatch = async function(gameId, result){
    console.log("gameid: "+ gameId)
    console.log("result " + result)
    if(matches.has(gameId))
    {
        console.log("matches has match")
        var match = matches.get(gameId);
        console.log("matchplayers " + match.players)
        if(result == 2)
        {
            matches.delete(gameId);
            console.log("result draw")
            return;
        }
        let winner = match.players[result]
        let looser = match.players[1 - result]

        console.log("winner " + winner)
        console.log("looser " + looser)
        const winnerRankData = await rankManager.CalculateRank(winner, looser, 1)
        const looserRankData = await rankManager.CalculateRank(looser, winner, 0)
        console.log("winner new rank" + winnerRankData.newRank)
        console.log("looser new rank" + looserRankData.newRank)
        db.GetData(dbTables.tableTypes.MATCHINFO, null, winner, dbTables.matchInfo.PRIMARYKEY, (dbData)=>{
            console.log("winner db data" + dbData)
            const matchData ={
                matchCount: dbData.matchCount + 1,
                winCount: dbData.winCount + 1,
                loseCount: dbData.loseCount
            }
            db.SetData(dbTables.tableTypes.MATCHINFO, null, winner,matchData);
        })
        db.GetData(dbTables.tableTypes.MATCHINFO, null, looser, dbTables.matchInfo.PRIMARYKEY, (dbData)=>{
            console.log("looser db data" + dbData)
            const matchData ={
                matchCount: dbData.matchCount + 1,
                winCount: dbData.winCount,
                loseCount: dbData.loseCount + 1
            }
            db.SetData(dbTables.tableTypes.MATCHINFO,null, looser,matchData);
        })
        db.SetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, winner, winnerRankData.newRank)
        db.SetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, looser, looserRankData.newRank)

        let winnerClient = userManager.GetPlayerWithPrimaryKey(winner);
        let looserClient = userManager.GetPlayerWithPrimaryKey(looser);
        console.log("step3")
        if(winnerClient)
            communication.SendPackage(winnerClient.client, "Elo",{oldRank: winnerRankData.oldRank, newRank: winnerRankData.newRank})

        if(looserClient)
            communication.SendPackage(looserClient.client, "Elo",{oldRank: looserRankData.oldRank, newRank: looserRankData.newRank})
        matches.delete(gameId)
        console.log('Game End with gameId : ', gameId)
    }
    console.log("step4")
}

exports.CCalculateRank = async (playerId, opponentId, result) => {
    const previousRank = await db.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, playerId)
    console.log("previous rank: " + previousRank)
    const opponentRank = await db.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, opponentId)
    console.log("opponent rank: " + opponentRank)
    const matchCount = await db.GetData(dbTables.tableTypes.MATCHINFO, dbTables.matchInfo.MATCHCOUNT, playerId)
    console.log("matchCount: " + matchCount)
    const resultValue = result;
    const expectedResult = 1 / (1 + 10 * (1 / ((opponentRank - previousRank) / 400)));
    const k = 40 / (1 + matchCount / 30.0);
    const newRank = previousRank + k * (resultValue - expectedResult);
    console.log("Rank calculation: " + "previous rank: " + previousRank + " new rank " + newRank)
    return newRank;
};