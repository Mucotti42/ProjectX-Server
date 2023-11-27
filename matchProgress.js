const communication = require('./communication')
const activeMatches = require('./activeMatches')
const gameStates = require('./gameStates').States

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
        this.SetPlacementState(match.id);
      }, 1000);
}

exports.Placement = function (matchId,pieceType,position){
    //communication.SendAll(matchId, )
}

exports.SetPlacementState = function(matchId){
    communication.SendAll(matchId, 'PlacementState')
    activeMatches.SetMatchState(matchId,gameStates.PLACEMENT)
}