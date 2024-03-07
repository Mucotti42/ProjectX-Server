const matchmaking = require('../matchmakingHandler')
const matchBegining = require("../matchBegining");
const communication = require("../communication");
const userManager = require('../UserManager.js')
const db = require("../database");
const dbFields = require("../dbTables");

exports.Play = function (client, data) {
    var mode = data.value;
    //TODO Handle game mode
    matchmaking.StartMatchmaking(client,mode)
}
exports.GameInvite = function (client, data) {
    const player = userManager.GetPlayerWithClient(client);
    const invitedPlayer = userManager.GetPlayerWithSocialId(data.value.toString());
    if(invitedPlayer == null){
        communication.SendPackage(client, "InviteResult", "No player found with id " + data.value.toString())
        return;
    }
    db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME, player.primaryKey, dbFields.playerInfo.PRIMARYKEY,
        (dbData) => {
            console.log(dbData)
            var playerData = {
                userName: dbData.userName,
                inviterKey: player.primaryKey
            };
            communication.SendPackage(invitedPlayer.client,'IncomingInvite',playerData)
    })
}
exports.InviteAccepted = function (client, data) {
    matchBegining.LoadMatch(userManager.GetPlayerWithClient(client).primaryKey, data.value, 0)
}
exports.InviteDeclined = function (client, data) {
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(data.value).client, "InviteResult", "Player declined your invite!");
}