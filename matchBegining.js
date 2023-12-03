const userManager = require('./UserManager.js')
const communication = require('./communication.js')
const matchProgress = require('./matchProgress.js');
const ActiveMatches = require('./ActiveMatches.js')
const Match = ActiveMatches.Match;

exports.LoadMatch = function (player1, player2,gameMode) {

    var map = Math.floor(Math.random() * 1);
    var gameId = '1'; //TODO UUID
    
    var match = new Match(player1,player2,gameMode,map,gameId)
    ActiveMatches.SetMatch(gameId,match)

    var client1 = userManager.GetPlayerWithPrimaryKey(player1).client;
    var client2 = userManager.GetPlayerWithPrimaryKey(player2).client;

    communication.SendPackage(client1,'LoadMatch',match);
    communication.SendPackage(client2,'LoadMatch',match);

    console.log('Match Loaded')
}

exports.PlayerSceneLoaded = function(primaryKey, gameId){
    const match = ActiveMatches.GetMatch(gameId);
    match.readyPlayerList.push(primaryKey)

    if(match.readyPlayerList.length == 2)
        matchProgress.StartMatch(match);
}

exports.EndGame = function (player1, player2,gameMode) {
    console.log('Game Ended')
}