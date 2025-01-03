const db = require('../database.js')
const dbFields = require('../dbTables.js')
const communication = require('../communication.js')
const matchBegining = require("../matchBegining");
const userManager = require('../UserManager.js')

const inviteResults = {
    NoPlayerFound: 0,
    PlayerRejected: 1,
}

exports.FriendsHaveGame = async function (client,data) {
    let friendIds = data.value;
    let results = await Promise.all(friendIds.map(async (friendId) => {
        return await db.IsRowExists(dbFields.tableTypes.PLAYERINFO, friendId, dbFields.playerInfo.APIID);
    }));
    communication.SendPackage(client, 'OwnedFriends', results);
}

// value: (socialId)
//
/**
 * Gets and game friendship invite, saves in database, sends invited client if its online
 * param {data} value: socialId
 * Example db entry { key: "12345", nick: "Player1" }
 */
exports.GameFriendshipInvite = async function (client, data) {
    const player = userManager.GetPlayerWithClient(client);
    let incomingInvites = await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.INCOMINGINVITES, data.value, dbFields.playerInfo.SOCIALID)
    console.log("result: " + incomingInvites)
    if (!Array.isArray(incomingInvites))
        incomingInvites = []

    incomingInvites = incomingInvites.filter(item => item.key !== player.primaryKey);
    let newElement = { key: player.primaryKey, nick: player.userName };

    incomingInvites.unshift(newElement);
    db.SetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.INCOMINGINVITES, data.value, JSON.stringify(incomingInvites), dbFields.playerInfo.SOCIALID)

    let invitedPlayer = userManager.GetPlayerWithSocialId(data.value)
    if(invitedPlayer){
        communication.SendPackage(invitedPlayer.client, "IncomingGameFriendshipInvite", { socialId: player.socialId, nick: player.userName })
    }
}

exports.FriendInviteConfirmation = function (client, data) {
    //TODO OFFLINE CHECK
    const player1 = userManager.GetPlayerWithSocialId(data.value)
    const player2 = userManager.GetPlayerWithClient(client)

    communication.SendPackage(player1.client, "NewFriend", {socialId: player2.socialId, nick: player2.userName})
    communication.SendPackage(player2.client, "NewFriend", {socialId: player1.socialId, nick: player1.userName})
}

exports.GameInvite = function (client, data) {
    const player = userManager.GetPlayerWithClient(client);
    const invitedPlayer = userManager.GetPlayerWithSocialId(data.value.toString());
    if(invitedPlayer == null){
        communication.SendPackage(client, "InviteResult", inviteResults.NoPlayerFound)
        return;
    }
    db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME, player.primaryKey, dbFields.playerInfo.PRIMARYKEY,
        (dbData) => {
            var playerData = {
                nick: dbData.userName,
                inviterKey: player.primaryKey
            };
            communication.SendPackage(invitedPlayer.client,'IncomingInvite',playerData)
        })
}

exports.InviteAccepted = function (client, data) {
    matchBegining.LoadMatch(userManager.GetPlayerWithClient(client).primaryKey, data.value, 0)
}

exports.SteamFriendInviteAccepted = function (client, data) {
    matchBegining.LoadMatch(userManager.GetPlayerWithClient(client).primaryKey, userManager.GetPlayerWithSocialId(data.value), 0)
}

exports.InviteDeclined = function (client, data) {
    communication.SendPackage(userManager.GetPlayerWithPrimaryKey(data.value).client, "InviteResult", inviteResults.PlayerRejected);
}