const userManager = require('./UserManager.js')
const communication = require('./communication.js')
const matchProgress = require('./matchProgress.js');
const ActiveMatches = require('./ActiveMatches.js')
const Match = ActiveMatches.Match;
const gameStates = require('./gameStates').States


exports.LoadMatch = function (player1, player2,gameMode) {
    

    var map = Math.floor(Math.random() * 4);
    var gameId = Math.floor(100000 + Math.random() * 900000).toString();
    
    var match = new Match(player1,player2,gameMode,map,gameId)

    if(player1 == null || player2 == null)
    {
        console.log("Player no more active in Loadmatch Matchbegining")
        return;
    }

    var p1 = userManager.GetPlayerWithPrimaryKey(player1);
    var p2 = userManager.GetPlayerWithPrimaryKey(player2);

    if(p1 == null || p2 == null)
    {
        console.log("p no more active in Loadmatch Matchbegining")
        return;
    }

    ActiveMatches.SetMatch(gameId,match)

    communication.SendPackage(p1.client,'LoadMatch',match);
    communication.SendPackage(p2.client,'LoadMatch',match);

    console.log('Match Loaded')
}

exports.PlayerSceneLoaded = function(primaryKey, gameId){
    const match = ActiveMatches.GetMatch(gameId);
    if(match == null) return;
    match.readyPlayerList.push(primaryKey)

    if(match.readyPlayerList.length == 2){

        ActiveMatches.SetMatchState(gameId, gameStates.LOADED)
        matchProgress.StartMatch(match);
    }
}

exports.EndGame = function (player1, player2,gameMode) {
    console.log('Game Ended')
}
