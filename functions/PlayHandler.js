const matchmaking = require('../matchmakingHandler')
const userManager = require('../UserManager.js')
const matchBegining = require('../matchBegining.js')

exports.Play = function (client, data) {
    var mode = data.value;
    //TODO Handle game mode
    matchmaking.StartMatchmaking(client,mode)
}
exports.GameSceneLoaded = function (client,data) {
    matchBegining.PlayerSceneLoaded(userManager.GetPlayerWithClient(client).primaryKey, data.value)
}