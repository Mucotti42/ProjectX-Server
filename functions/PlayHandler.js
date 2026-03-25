const matchmaking = require("../matchmakingHandler");

exports.Play = function (client, data) {
    var mode = data.value;
    matchmaking.StartMatchmaking(client,mode)
}