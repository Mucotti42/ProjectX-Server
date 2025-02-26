const db = require('./database')
const dbTables = require('./dbTables')

exports.CalculateRank = async (playerId, opponentId, result) => {
    let previousRank = await db.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, playerId)
    previousRank = previousRank.playerRank
    console.log("previousRank: " + previousRank)
    let opponentRank = await db.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.RANK, opponentId)
    opponentRank = opponentRank.playerRank;
    console.log("opponentRank: " + opponentRank)
    let matchCount = await db.GetData(dbTables.tableTypes.MATCHINFO, dbTables.matchInfo.MATCHCOUNT, playerId)
    matchCount = matchCount.matchCount
    console.log("matchCount: " + matchCount)
    const resultValue = result;
    //const expectedResult = 1 / (1 + 10 * (1 / ((opponentRank - previousRank) / 400)));
    const expectedResult = 1 / (1 + Math.pow(10, (opponentRank - previousRank) / 400));
    console.log("expectedResult: " + expectedResult)
    const k = 40 / (1 + matchCount / 30.0);
    const newRank = Math.round(previousRank + k * (resultValue - expectedResult));
    const rankData ={
        oldRank: previousRank,
        newRank: newRank
    }
    console.log(rankData)
    console.log("newRank: " + newRank)
    console.log("Rank calculation: " + "previous rank: " + previousRank + " new rank " + newRank)
    return rankData;
};