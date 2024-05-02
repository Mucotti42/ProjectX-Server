const userManager = require('../UserManager.js')
const matchBegining = require('../matchBegining.js')
const matchProgress = require('../matchProgress.js')
const activeMatches = require("../ActiveMatches")
const communication = require("../communication")

exports.GameSceneLoaded = function (client,data) {
    matchBegining.PlayerSceneLoaded(userManager.GetPlayerWithClient(client).primaryKey, data.value)
}

exports.PiecePlacement = function (client,data) {
    matchProgress.Placement(data.matchId,userManager.GetPlayerWithClient(client).primaryKey, data.pieceType, data.coord)
}

exports.PlacementReady = function (client,data) {
    matchProgress.PlacementReady(userManager.GetPlayerWithClient(client).primaryKey, data.value);
}

exports.PlacementUnready = function (client,data) {
    matchProgress.PlacementUnready(userManager.GetPlayerWithClient(client).primaryKey, data.value);
}

exports.EndGame = function (client,data) {
    activeMatches.EndMatch(data.value);
}

exports.Surrender = function (client,data) {
    const players = activeMatches.GetMatch(data.value).players;
    const loserId = userManager.GetPlayerWithClient(client).primaryKey;
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let client = userManager.GetPlayerWithPrimaryKey(player).client;
        communication.SendPackage(client,"PlayerSurrendered",loserId)
    }

    activeMatches.EndMatch(data.value);
}

exports.PieceMove = function (client,data) {
    matchProgress.Move(userManager.GetPlayerWithClient(client).primaryKey,data.matchId,data.moveType,data.pieceId,data.coord);
}

exports.ChangeLocation = function (client, data){
    matchProgress.ChangeLocation(userManager.GetPlayerWithClient(client).primaryKey,data.matchId, data.pieceId, data.targetCoord);
}
exports.EndTurn = function(client,data){
    matchProgress.NextTurn(data.value)
}