const communication = require('./communication.js')

const db = require('./database.js')


class Player{
    constructor(primaryKey, client, socialId){
        this.primaryKey = primaryKey
        this.client = client
        this.enteranceTime = new Date(Date.now());
        this.socialId = socialId;
    }
}
const playerInfoList = []  //Holds Player Info

module.exports = {
    Welcome: function(client)
    {
        communication.SendPackage(client,'Hi')
    },
    
    RegisterPlayerInfo: function(primaryKey, client, socialId){
        const p = new Player(primaryKey, client, socialId)
        playerInfoList.push(p)
        console.log('new player registered ' + primaryKey + ' ')
        console.log(playerInfoList.length)
    },

    DisconnectedPlayer: async function(client){
        const player = this.GetPlayerWithClient(client);
        if(player == null) return;

        const jsonData = {
            startDate: player.enteranceTime.toISOString(),
            endDate: new Date(Date.now())
        };
        const session = await db.GetData('sessioninfo', 'enterance',player.primaryKey)
        const data = JSON.parse(session.enterance);
        data.push(jsonData);
        db.SetData('sessioninfo', 'enterance',player.primaryKey,JSON.stringify(data))
        //console.log(JSON.stringify(session));

        console.log('Previous Player Count: ',playerInfoList.length)
        if(playerInfoList.includes(player))
            playerInfoList.splice(player,1);

        console.log('Current Player Count: ',playerInfoList.length)
    },

    GetPlayerWithPrimaryKey: function(primaryKey){
        console.log('find player with primaryKey : ', primaryKey)
        console.log(playerInfoList)
        const foundPlayer = playerInfoList.find(player => player.primaryKey === primaryKey);

        if(foundPlayer)
            return foundPlayer

        console.log('No player found with id: ' + primaryKey)
    },

    GetPlayerWithSocialId: function(socialId){
        console.log('find player with socialId : ', socialId)
        const foundPlayer = playerInfoList.find(player => player.socialId === socialId);

        if(foundPlayer)
            return foundPlayer

        console.log(playerInfoList);
        console.log('No player found with social id: ' + socialId)
    },

    GetPlayerWithClient: function(client){

        console.log('Info list Player Count: ',playerInfoList.length)
        const foundPlayer = playerInfoList.find(player => player.client === client);

        if (foundPlayer)
            return foundPlayer;
        else if(playerInfoList.length === 1)
            return playerInfoList[0]

        console.log("No player id found ")
    }
}