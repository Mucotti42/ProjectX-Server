const db = require('../database.js')
const communication = require('../communication.js')
const dbFields = require('../dbTables.js')
const userManager = require('../UserManager.js')

exports.RegisterPlayer = async function(client,data){

    const isExist = await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,data.key,dbFields.playerInfo.APIID);
    let newPlayer = false;
    const socialId = Math.floor(100000 + Math.random() * 900000).toString();
    let userName = "New Player";
    const apiId = data.key;
    let primaryKey = "";

    if(isExist)
    {
        await db.GetData(dbFields.tableTypes.PLAYERINFO, null, data.key, dbFields.playerInfo.APIID,
        (incomingdata) => {
            userName = incomingdata.userName;
            console.log('returning value with call back ' + incomingdata.primaryKey);
            primaryKey = incomingdata.primaryKey;
            userManager.RegisterPlayerInfo(incomingdata.primaryKey, client, socialId)
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
            characters : '[0, 1, 2, 3, 4, 5, 6, 7, 8, 10]'
        };
        await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);
        
        db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, data.key, dbFields.playerInfo.APIID,
            (data) => {
                primaryKey = data.primaryKey;
                const sessionData ={
                    primaryKey : primaryKey,
                    enterance : '[]'
                };
                db.InsertData(dbFields.tableTypes.SESSIONINFO,sessionData);
                //TODO Edit the code at the buttom line that is for testing purposes
                //const d = [0, 1, 2, 5, 7, 10]
                //db.SetData(dbFields.tableTypes.PLAYERINFO,dbFields.playerInfo.CHARACTERS,key,JSON.stringify(d))
                userManager.RegisterPlayerInfo(primaryKey, client, socialId)
            })
    }
    db.GetDataWithQuery('SELECT projectxdb.marketpieceinfo.*, projectxdb.characterinfo.damage, projectxdb.characterinfo.health FROM projectxdb.marketpieceinfo' +
        ' JOIN projectxdb.characterinfo ON projectxdb.marketpieceinfo.id = projectxdb.characterinfo.type;', (data)=>{
        communication.SendPackage(client,'RegisterMarketPieces',data)
    })
    var data = {
        newPlayer: newPlayer,
        socialId: socialId,
        userName: userName,
        apiId : data.key,
        primaryKey : primaryKey
    };
    console.log(data);
    communication.SendPackage(client,'CompleteRegistration',data)
}
exports.Disconnect = async function(){
        
}