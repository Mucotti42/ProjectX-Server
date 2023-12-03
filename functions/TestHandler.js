const db = require('../database.js')
const communication = require('../communication.js')
const dbTables = require('../dbTables.js')

exports.setTest = function (client, data) {
    var mode = data.value;
    console.log(mode)
    db.SetData(dbTables.tableTypes.PLAYERINFO,dbTables.playerInfo.CHARACTERS,3,JSON.stringify(mode))
}
