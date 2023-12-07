const matchmaking = require('../matchmakingHandler')

exports.Play = function (client, data) {
    var mode = data.value;
    //TODO Handle game mode
    matchmaking.StartMatchmaking(client,mode)
}