const db = require('../database.js')
const communication = require('../Communication.js')
const dbFields = require('./dbTables')

exports.GetAge = async function(client,data){
    let dbData = await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME, data.value);
    console.log('GetAge' + dbData);
    communication.SendPackage(client,'Print', dbData["userName"])

    var value =[
        [1,'Uzay']
    ]
    db.InsertData(dbFields.tableTypes.PLAYERINFO,value)
}