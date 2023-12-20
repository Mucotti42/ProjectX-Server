const db = require('../database.js')
const communication = require('../communication.js')
const dbFields = require('../dbTables.js')
const userManager = require('../UserManager.js')

exports.RegisterPlayer = async function(client,data){

    const isExist = await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,data.key,dbFields.playerInfo.APIID);
    console.log('exist' , isExist)
    let newPlayer = false;
    if(isExist)
    {
        console.log('User exist')
        
        db.GetData(dbFields.tableTypes.PLAYERINFO, null, data.key, dbFields.playerInfo.APIID,
        (incomingdata) => {
            console.log('returning value with call back' + incomingdata.userName);
            userManager.RegisterPlayerInfo(incomingdata.primaryKey,client)
        })
    }
    else
    {
        newPlayer = true;
        console.log('No user exist')
        const userdata ={
            primaryKey: 'UUID()',
            userName: 'New Player',
            apiId: data.key,
            playerRank : 50,
            characters : '[0, 1, 2, 3]'
        };
        await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);
        
        db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, data.key, dbFields.playerInfo.APIID,
            (data) => {
                key = data.primaryKey;
                const sessionData ={
                    primaryKey : key,
                    enterance : '[]'
                };
                db.InsertData(dbFields.tableTypes.SESSIONINFO,sessionData);
                //TODO Edit the code at the buttom line that is for testing purposes
                //const d = [0, 1, 2, 5, 7, 10]
                //db.SetData(dbFields.tableTypes.PLAYERINFO,dbFields.playerInfo.CHARACTERS,key,JSON.stringify(d))
                userManager.RegisterPlayerInfo(key,client)
            })
    }
    db.GetDataWithQuery('SELECT projectxdb.marketpieceinfo.*, projectxdb.characterinfo.damage, projectxdb.characterinfo.health FROM projectxdb.marketpieceinfo' +
        ' JOIN projectxdb.characterinfo ON projectxdb.marketpieceinfo.id = projectxdb.characterinfo.type;', (data)=>{
        communication.SendPackage(client,'RegisterMarketPieces',data)
    })
    communication.SendPackage(client,'CompleteRegistration',newPlayer)
}
exports.Disconnect = async function(){
        
}