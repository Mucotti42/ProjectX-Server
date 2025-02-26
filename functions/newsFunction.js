const communication = require("../communication");
const db = require('../database')
const dbTables = require('../dbTables')
const userManager = require('../UserManager')
exports.GetNews = function (client, data) {
    var language = data.value;
    var query = `SELECT id, priority, JSON_UNQUOTE(head->'$.${language}') AS head, JSON_UNQUOTE(body->'$.${language}') AS body, link FROM projectxdb.news;`;

    db.GetDataWithQuery(query, (dbData) => {
        communication.SendPackage(client, "News", dbData);
    });
};

exports.GetNews = function (client, data) {
    var key = userManager.GetPlayerWithClient(client).primaryKey
    db.GetData(dbTables.tableTypes.PLAYERINFO, null, key, dbTables.playerInfo.PRIMARYKEY, (playerData)=>{
        db.GetData(dbTables.tableTypes.MATCHINFO, null, key, dbTables.playerInfo.PRIMARYKEY, (matchData)=>{
            const profileData ={
                playerRank: playerData.playerRank,
                registrationDate: playerData.registrationDate,
                matchCount: matchData.matchCount,
                winCount: matchData.winCount,
                loseCount: matchData.loseCount
            }
            communication.SendPackage(client, "ProfileData", profileData)
        })
    })
};