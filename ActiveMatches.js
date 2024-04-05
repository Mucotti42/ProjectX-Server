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

exports.EndMatch = function(gameId){
    if(matches.has(gameId)){
        matches.delete(gameId)
        console.log('Game End with gameId : ', gameId)
    }
}