const db = require('../database.js')
const communication = require('../communication.js')
const dbFields = require('../dbTables.js')
const userManager = require('../UserManager.js')

exports.RegisterPlayer = async function(client, data){

    const isExist = await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,data.key,dbFields.playerInfo.APIID)
    let newPlayer = false
    let userName = data.tempUserName
    const apiId = data.key
    let primaryKey = ""
    let socialId = ""
    let registrationDate = ""
    if(isExist)
    {
        await db.GetData(dbFields.tableTypes.PLAYERINFO, null, data.key, dbFields.playerInfo.APIID,
        (incomingData) => {
            userName = incomingData.userName;
            console.log('returning value with call back ' + incomingData.primaryKey);
            primaryKey = incomingData.primaryKey;
            socialId = incomingData.socialId
            registrationDate = incomingData.registrationDate
            userManager.RegisterPlayerInfo(incomingData.primaryKey, client, incomingData.socialId, userName)
        })
    }
    else
    {
        socialId = Math.floor(100000 + Math.random() * 900000).toString();
        registrationDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
        newPlayer = true;
        console.log('No user exist')
        const userdata ={
            primaryKey: 'UUID()',
            userName: userName,
            apiId: data.key,
            playerRank : 50,
            characters : '[0, 1, 9, 2, 13, 5, 6, 7, 3, 4, 10]',
            socialId : socialId,
            registrationDate: registrationDate
        };

        await db.InsertData(dbFields.tableTypes.PLAYERINFO,userdata);
        
        await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.PRIMARYKEY, data.key, dbFields.playerInfo.APIID,
            (data) => {
                primaryKey = data.primaryKey;
                const sessionData ={
                    primaryKey : primaryKey,
                    enterance : '[]'
                };
                const matchData ={
                    primaryKey: primaryKey,
                    matchCount: 0,
                    winCount: 0,
                    loseCount: 0
                }
                db.InsertData(dbFields.tableTypes.SESSIONINFO,sessionData);
                db.InsertData(dbFields.tableTypes.MATCHINFO,matchData);
                //TODO Edit the code at the buttom line that is for testing purposes
                //const d = [0, 1, 2, 5, 7, 10]
                //db.SetData(dbFields.tableTypes.PLAYERINFO,dbFields.playerInfo.CHARACTERS,key,JSON.stringify(d))
                userManager.RegisterPlayerInfo(primaryKey, client, socialId, userName)
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
        primaryKey : primaryKey,
    };
    console.log(data);
    communication.SendPackage(client,'CompleteRegistration',data)
}
exports.Disconnect = async function(){

}