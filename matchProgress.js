const communication = require('./communication')
const activeMatches = require('./ActiveMatches')
const gameStates = require('./gameStates').States
const database = require('./database')
const dbTables = require('./dbTables')
const userManager = require('./UserManager')

class Piece{
    constructor(pieceId, pieceType, piecePos, health, damage){
        this.pieceId = pieceId;
        this.pieceType = pieceType;
        this.piecePos = piecePos;
        this.health = health;
        this.isAlive = true;
        this.damage = damage;
        //TODO this.pieceStates = new Array[];
    }
}

exports.StartMatch = function (match){
    setTimeout(() => {
        this.SetPlacementState(match.gameId);
      }, 1000);
}

exports.Placement = function (matchId,pieceType,position){
    //communication.SendAll(matchId, )
}

exports.SetPlacementState = async function(matchId){
    //communication.SendAll(matchId, 'PlacementState')
    var match = activeMatches.GetMatch(matchId);

    const [data1, data2] = await Promise.all([
        getPlayerCharacterData(match.player1),
        getPlayerCharacterData(match.player2)
    ]);

    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player1).client,'PlacementState',data1)
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player2).client,'PlacementState',data2)
    
    activeMatches.SetMatchState(matchId,gameStates.PLACEMENT)
}

async function getPlayerCharacterData(playerId) {
    return await database.GetData(dbTables.tableTypes.PLAYERINFO, dbTables.playerInfo.CHARACTERS, playerId);
}
