const db = require('../database.js')
const dbFields = require('../dbTables.js')
const communication = require('../communication.js')

exports.FriendsHaveGame = async function (client,data) {
    console.log(data)
    let friendIds = data.value;
    let results = await Promise.all(friendIds.map(async (friendId) => {
        return await db.IsRowExists(dbFields.tableTypes.PLAYERINFO, friendId, dbFields.playerInfo.APIID);
    }));
    communication.SendPackage(client, 'OwnedFriends', results);
}