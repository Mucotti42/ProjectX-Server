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
        Placement(match.id, match.pieceType, match.position);
      }, 10000);
}

exports.Placement = function (matchId,pieceType,position){
    match.player1
}
//TODO BLOCKING STATE
exports.SetPlacementState = function(gameId){
    communication.SendAll(gameId, 'PlacementState', newTurn)
}