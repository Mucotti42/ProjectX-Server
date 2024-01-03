const userManager = require('../UserManager.js')
const matchBegining = require('../matchBegining.js')
const matchProgress = require('../matchProgress.js')

exports.GameSceneLoaded = function (client,data) {
    matchBegining.PlayerSceneLoaded(userManager.GetPlayerWithClient(client).primaryKey, data.value)
}

// type = "PiecePlacement",matchId = MatchManager.instance.activeMatch.gameId,
//             coord = piece.coord, pieceType = piece.type };
exports.PiecePlacement = function (client,data) {

    console.log('match' ,data.matchId)
    matchProgress.Placement(data.matchId,userManager.GetPlayerWithClient(client).primaryKey, data.pieceType, data.coord)
}
exports.PieceMove = function (client,data) {
    matchProgress.Move(userManager.GetPlayerWithClient(client).primaryKey,data.matchId,data.moveType,data.pieceId,data.coord);
}
exports.EndTurn = function(client,data){
    matchProgress.NextTurn(data.value)
}