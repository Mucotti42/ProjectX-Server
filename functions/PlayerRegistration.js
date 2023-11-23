const db = require('../database.js')
const communication = require('../communication.js')
const dbFields = require('../dbTables.js')
const userManager = require('../UserManager.js')

exports.RegisterPlayer = async function(client,data){
    
    if(data.isPrimaryKey){
        if(await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,data.key))
            console.log('User exist')
            db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME,data.key,'primaryKey',
            (incomingdata) => {
                console.log('returning value with call back' + incomingdata.userName);
                userManager.RegisterPlayerInfo(data.key,client)
              })
    }
    else{
        console.log('No user exist')
        const userdata ={
            primaryKey: 'UUID()',
            userName: 'New Player',
            apiId: data.key,
            playerRank : 50
        };
        await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);

        db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, data.key,'apiId',
            (data) => {
                communication.SendPackage(client,'SavePrimaryKey',data)
                console.log('Player primary ID sent succesfully!')
                key = data.primaryKey;
                userManager.RegisterPlayerInfo(key,client)
              })
    }
    
}
exports.Disconnect = async function(){
        
}