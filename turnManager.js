const activeMatches = require('./ActiveMatches')
const communication = require('./communication')
const userManager = require('./UserManager')

exports.NextTurn = function(gameId){
    const match = activeMatches.GetMatch(gameId);
    if(match == null) return;

    let newTurn = (match.turn + 1) % 2;
    match.turn = newTurn;

    if(userManager.GetPlayerWithPrimaryKey(match.player1).client == null) return;
    if(userManager.GetPlayerWithPrimaryKey(match.player2).client == null) return;
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player1).client, 'SetTurn', newTurn)
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(match.player2).client, 'SetTurn', newTurn)
}