exports.Match = class{
    constructor(player1, player2,gameMode,map, gameId){
        this.player1 = player1 
        this.player2 = player2
        this.gameMode = gameMode;
        this.gameId = gameId;
        this.map = map;
        this.startedTime = Date.now();
        this.result = 0;
        this.gameState = 0;
        this.readyPlayerList = new Array();
        this.players = new Array();
        this.players.push(player1);
        this.players.push(player2);
        this.turn = -1;
    }
}
const matches = new Map();

exports.GetMatch = function (gameId) {
    console.log(matches.has(gameId))
    console.log('matches get ', matches)
    console.log('get match with id: ' + gameId)
    let match = matches.get(gameId);
    console.log('p1 get '+ match)
    if(match)
        return match;

    console.log('No Match Found!!!')
}

exports.SetMatch = function (gameId, match) {
    console.log('set match with id: ' + gameId)
    console.log('p1 set '+match.player1)
    matches.set(gameId, match);
    console.log('matches set ', matches)
}

exports.SetMatchState = function(gameId, state){
    GetMatch(gameId).gameState = state;
}


