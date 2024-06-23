const communication = require('./communication')
const activeMatches = require('./ActiveMatches')
const gameStates = require('./gameStates').States
const database = require('./database')
const dbTables = require('./dbTables')
const userManager = require('./UserManager')
const turnManager = require('./turnManager')

class PieceInfo {
    constructor(id, type, value, health, maxHealth, healAmount, coordinate, damage, meleeattackCoordinates, rangedattackCoordinates, movementCoordinates, healCoordinates, ally) {
      this.id = id;
      this.type = type;
      this.value = value
      this.health = health;
      this.maxHealth = maxHealth;
      this.healAmount = healAmount;
      this.coordinate = coordinate;
      this.damage = damage;
      this.meleeattackCoordinates = meleeattackCoordinates;
      this.rangedattackCoordinates = rangedattackCoordinates;
      this.movementCoordinates = movementCoordinates;
      this.healCoordinates = healCoordinates;
      this.ally = ally;
    }
  }
const playerPieces = new Map();

exports.StartMatch = function (match){
    setTimeout(() => {
        this.SetPlacementState(match.gameId);
      }, 1000);
}

exports.Placement = function (matchId,playerId,pieceType,position){
    var match = activeMatches.GetMatch(matchId);
    database.GetCharacterData(pieceType, null, (data) => {
        var id = Math.floor(100000 + Math.random() * 900000);
        
        var piece = new PieceInfo(id,pieceType, data.value,data.health,data.maxhealth,data.healamount,position,data.damage,
            data.meleeattackcoords, data.rangedattackcoords,data.movecoords,data.healcoords, true);

        if(match == null) return;
        let players = match.players;
        //OtherPlayer
        console.log(players[players.indexOf(playerId) ^ 1])
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            
            piece.ally = player == playerId;

            const client = userManager.GetPlayerWithPrimaryKey(player).client;

            communication.SendPackage(client,'PiecePlaced',piece)

            playerPieces.get(playerId).set(id, piece);
        }
      });
}

exports.SetPlacementState = async function(matchId){
    var match = activeMatches.GetMatch(matchId);
    if(match.gameState != gameStates.LOADED) return;
    match.readyPlayerList = new Array();

    const [data1, data2] = await Promise.all([
        getPlayerCharacterData(match.player1),
        getPlayerCharacterData(match.player2)
    ]);
    InitializePieceMap(match.player1); InitializePieceMap(match.player2);
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player1).client,'PlacementState',data1)
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player2).client,'PlacementState',data2)
    
    activeMatches.SetMatchState(matchId,gameStates.PLACEMENT)

    setTimeout(() => {
        this.SetGameplayState(match.gameId);
      }, 90000);

    //TODO 90000
}
function InitializePieceMap(playerId) {
    if(playerPieces.has(playerId))
        playerPieces.delete(playerId);
    playerPieces.set(playerId, new Map())
}

async function getPlayerCharacterData(playerId) {
    return await database.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.CHARACTERS, playerId);
}

exports.SetGameplayState = async function(matchId){
    var match = activeMatches.GetMatch(matchId);
    if(match === null) return;
    var player1 = userManager.GetPlayerWithPrimaryKey(match.player1);
    var player2 = userManager.GetPlayerWithPrimaryKey(match.player2);

    if(match.gameState != gameStates.PLACEMENT) return;
    if(player1.client === null || player2.client === null){
        activeMatches.EndMatch(matchId);
        return;
    }
    var data ={
        localIndex : 0,
        matchId : match.gameId
    };
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player1).client,'GameplayState',data)
    data.localIndex = 1;
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player2).client,'GameplayState',data)

    activeMatches.SetMatchState(matchId,gameStates.PLAYING)
}

exports.Move = async function(playerId,matchId, moveType,pieceId,coord){
    var match = activeMatches.GetMatch(matchId);
    if(match == null) return;

    let players = match.players;
    let otherClient = userManager.GetPlayerWithPrimaryKey(players[players.indexOf(playerId) ^ 1]).client;
    var data = {
        type: moveType,
        pieceId: pieceId,
        targetCoord: coord
    };
    communication.SendPackage(otherClient,'PieceMove',data);
}

exports.ChangeLocation = function (primaryKey, matchId, pieceId, targetCoord){
    var match = activeMatches.GetMatch(matchId);
    if(match == null) return;

    let players = match.players;
    let otherClient = userManager.GetPlayerWithPrimaryKey(players[players.indexOf(primaryKey) ^ 1]).client;
    var data = {
        pieceId: pieceId,
        targetCoord: targetCoord
    };
    communication.SendPackage(otherClient,'LocationChanged',data);
}

exports.RemovePiece = function (primaryKey, matchId, pieceId){
    var match = activeMatches.GetMatch(matchId);
    if(match == null) return;

    let players = match.players;
    let otherClient = userManager.GetPlayerWithPrimaryKey(players[players.indexOf(primaryKey) ^ 1]).client;
    communication.SendPackage(otherClient,'PieceRemoved',pieceId);
}

exports.NextTurn = async function(matchid){
    turnManager.NextTurn(matchid)
}

exports.PlacementReady = function (playerId, matchId){
    var match = activeMatches.GetMatch(matchId);
    match.readyPlayerList.push(playerId);
    if(match.readyPlayerList.length == 2)
        this.SetGameplayState(matchId);
}

exports.PlacementUnready = function (playerId, matchId){
    var match = activeMatches.GetMatch(matchId);
    match.readyPlayerList.splice(playerId,1);
}

exports.GetCharacterData = async function (client)
{
    database.GetCharacterData(null, null, (piece) => {
        const pieces = []
        piece.forEach((data) => {
            var id = Math.floor(100000 + Math.random() * 900000);
            var piece = new PieceInfo(id,data.type, data.value,data.health,data.maxhealth,data.healamount,{"x": 0, "y": 0},data.damage,
                data.meleeattackcoords, data.rangedattackcoords,data.movecoords,data.healcoords, true);

            pieces.push(piece)
        })

        communication.SendPackage(client,'CharacterData',pieces)
    });
}
