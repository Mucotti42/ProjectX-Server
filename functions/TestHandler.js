const db = require('../database.js')
const communication = require('../Communication.js')
const dbFields = require('../dbTables.js')

exports.GetAge = async function(client,data){
    let dbData = await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME, data.primaryKey);
    console.log('GetAge' + dbData);
    communication.SendPackage(client,'Print', dbData["userName"])

    // var value =[
    //     [1,'Uzay']
    // ]
    const userdata ={
        primaryKey: 'UUID()',
        userName: 'Berkay'
    };
    await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);
    console.log(await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, userdata.userName, dbFields.playerInfo.USERNAME))
}