const db = require('../database.js')
const communication = require('../communication.js')
const dbTables = require('../dbTables.js')
const matchBegining = require("../matchBegining");
const matchProgress = require('../matchProgress')

exports.setTest = function (client, data) {
    matchBegining.LoadMatch(player.primaryKey,otherPlayer.primaryKey,player.gameMode)
}

exports.GetCharacterData = function (client,data){
    matchProgress.GetCharacterData(client);
}
