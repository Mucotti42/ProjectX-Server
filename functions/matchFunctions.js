const userManager = require('../UserManager.js')
const matchBegining = require('../matchBegining.js')
const matchProgress = require('../matchProgress.js')
const activeMatches = require("../ActiveMatches")
const communication = require("../communication")

exports.GameSceneLoaded = function (client,data) {
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in GameSceneLoaded MatchFunctions")
        return;
    }
    matchBegining.PlayerSceneLoaded(player.primaryKey, data.value)
}

exports.PiecePlacement = function (client,data) {
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in PiecePlacement MatchFunctions")
        return;
    }
    matchProgress.Placement(data.matchId,player.primaryKey, data.pieceType, data.coord)
}

exports.PlacementReady = function (client,data) {
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in PlacementReady MatchFunctions")
        return;
    }
    matchProgress.PlacementReady(player.primaryKey, data.value);
}

exports.PlacementUnready = function (client,data) {
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in PlacementUnready MatchFunctions")
        return;
    }
    matchProgress.PlacementUnready(player.primaryKey, data.value);
}

exports.EndGame = function (client,data) {
    activeMatches.EndMatch(data.value);
}

exports.Surrender = function (client,data) {
    if(activeMatches.GetMatch(data.value) == null) return;

    let players = activeMatches.GetMatch(data.value).players;
    let loser = userManager.GetPlayerWithClient(client);
    if(loser == null){
        console.log("Loser Player not found in Surrender MatchFunctions")
        return;
    }

    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let p = userManager.GetPlayerWithPrimaryKey(player);
        if(p == null)
        {
            console.log("p not found in Surrender MatchFunctions")
            return;
        }
        if(p.client == null) return;
        communication.SendPackage(p.client,"PlayerSurrendered",loser.primaryKey)
    }

    activeMatches.EndMatch(data.value);
}

exports.PieceMove = function (client,data) {
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in PieceMove MatchFunctions")
        return;
    }
    matchProgress.Move(player.primaryKey,data.matchId,data.moveType,data.pieceId,data.coord);
}

exports.ChangeLocation = function (client, data){
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in ChangeLocation MatchFunctions")
        return;
    }
    matchProgress.ChangeLocation(player.primaryKey,data.matchId, data.pieceId, data.targetCoord);
}
exports.RemovePiece = function (client, data){
    let player = userManager.GetPlayerWithClient(client);
    if(player == null){
        console.log("Player not found in RemovePiece MatchFunctions")
        return;
    }
    matchProgress.RemovePiece(player.primaryKey,data.matchId, data.pieceId);
}
exports.EndTurn = function(client,data){
    matchProgress.NextTurn(data.value)
}