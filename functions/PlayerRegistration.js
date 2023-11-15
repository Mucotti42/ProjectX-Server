const db = require('../database.js')
const communication = require('../Communication.js')
const dbFields = require('../dbTables.js')

exports.RegisterPlayer = async function(client,data){
    
    if(data.isPrimaryKey){
        
        if(await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,data.key))
            console.log('User exist')
            db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME,data.key,'primaryKey',
            (data) => {
                console.log('returning value with call back' + data.userName);
              })
    }
    else{
        console.log('No user exist')
        const userdata ={
            primaryKey: 'UUID()',
            userName: 'New Player',
            apiId: data.key
        };
        await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);

        db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, data.key,'apiId',
            (data) => {
                communication.SendPackage(client,'SavePrimaryKey',data)
                console.log('Player primary ID sent succesfully!')
              })
    }
}