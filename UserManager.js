const communication = require('./communication.js')
const db = require('./database.js')


class Player{
    constructor(primaryKey, client){
        this.primaryKey = primaryKey
        this.client = client
    }
}
const playerInfoList = []  //Holds Player Info

module.exports = {
    Welcome: function(client)
    {
        communication.SendPackage(client,'Hi')
    },
    
    RegisterPlayerInfo: function(primaryKey, client){
        let p = new Player(primaryKey,client)
        playerInfoList.push(p)
        console.log('new player registered ' + primaryKey + ' ')
        console.log(playerInfoList.length)
    },
    DisconnectedPlayer: function(client){
        var player = this.GetPlayerWithClient(client);
        if(playerInfoList.includes(player))
            playerInfoList.splice(player);

        console.log(playerInfoList.length)
    },

    GetPlayerWithPrimaryKey: function(primaryKey){
        const foundPlayer = playerInfoList.find(player => player.primaryKey === primaryKey);

        if(foundPlayer)
            return foundPlayer

        console.log('No player found with id: ' + id)
    },

    GetPlayerWithClient: function(client){

        const foundPlayer = playerInfoList.find(player => player.client === client);

        if (foundPlayer)
            return foundPlayer;

        console.log("No player id found")
    }
}