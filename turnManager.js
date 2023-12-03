const activeMatches = require('./ActiveMatches')
const communication = require('./communication')

exports.NextTurn = function(gameId){
    const match = activeMatches.GetMatch(gameId);
    let newTurn = (match.turn++) % 2;

    communication.SendAll(gameId, 'SetTurn', newTurn)
}