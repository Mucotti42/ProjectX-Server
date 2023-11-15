const communication = require('./Communication.js')
const db = require('./database.js')

class Player{
    constructor(primaryKey, client){
        this.primaryKey = primaryKey
        this.client = client
    }
}
const playerInfo = []  //Holds Player Info

module.exports = {
    Welcome: function(client)
    {
        communication.SendPackage(client,'Hi', p)
    },
    
    RegisterPlayerInfo: function(primaryKey, client){
        let p = new Player(primaryKey,client)
        playerInfo.push(p)
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

function GoodBy(client){
    playerInfoList.splice(player)
}