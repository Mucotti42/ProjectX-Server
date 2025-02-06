const communication = require('./communication.js')

const db = require('./database.js')


class Player{
    constructor(primaryKey, client, socialId, userName){
        this.primaryKey = primaryKey
        this.client = client
        this.enteranceTime = new Date(Date.now())
        this.socialId = socialId
        this.userName =  userName
    }
}
const playerInfoList = []  //Holds Player Info

module.exports = {
    Welcome: function(client)
    {
        communication.SendPackage(client,'Hi')
    },
    
    RegisterPlayerInfo: function(primaryKey, client, socialId, userName){
        const p = new Player(primaryKey, client, socialId, userName)
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

        if(playerInfoList.includes(player))
            playerInfoList.splice(player,1);
    },

    GetPlayerWithPrimaryKey: function(primaryKey){
        console.log("Getting player with: " + primaryKey)
        const foundPlayer = playerInfoList.find(player => player.primaryKey === primaryKey);

        if(foundPlayer)
            return foundPlayer

        console.log('No player found with id: ' + primaryKey)
    },

    GetPlayerWithSocialId: function(socialId){
        const foundPlayer = playerInfoList.find(player => player.socialId === socialId);

        if(foundPlayer)
            return foundPlayer

        console.log('No player found with social id: ' + socialId)
    },

    GetPlayerWithClient: function(client){

        const foundPlayer = playerInfoList.find(player => player.client === client);

        if (foundPlayer)
            return foundPlayer;
        else if(playerInfoList.length === 1)
            return playerInfoList[0]

        console.log("No player id found ")
    },

    IsPlayerOnline: function(socialId){
        const foundPlayer = playerInfoList.find(player => player.socialId === socialId);

        if(foundPlayer)
            return true
        return false
    },
}