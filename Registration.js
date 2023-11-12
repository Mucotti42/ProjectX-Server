const communication = require('./Communication.js')

class Player{
    constructor(id, nick, client, teamID, leader = false){
        this.id = id;
        this.nick = nick;
        this.client = client;
        this.teamID = teamID;
        this.leader = leader;
    }
}
// key(id) / player(id, nick, client)

const playerInfoList = []  //Holds Player Info
const ids = []             //Holds Player IDs

module.exports = {
    Welcome: function(client)
    {
        //let id = IdCreation()
    
        let p = new Player('0', 'default', 'client', '0')
        communication.SendPackage(client,'Hi', p)
        p.client = client
        playerInfoList.push(p)
    },

    SetUserID: function(client, id){
        GetPlayerWithClient(client).id = id
        console.log('new id: ' + id)
    },

    SetNickName: function(client, nick){
        GetPlayerWithClient(client).nick = nick
        
        console.log('New player nick: ' + nick)

    },

    SetPlayerTeam: function(client, teamID, isPartyLeader = false){
        GetPlayerWithClient(client).teamID = teamID
        this.SetPartyLeader(client, isPartyLeader)
    },

    SetPartyLeader: function(client, isPartyLeader){
        GetPlayerWithClient(client).leader = isPartyLeader
    },

    GetPlayerWithID: function(id){
        if(ids.includes(id))
        {
            let index = ids.indexOf(id)
            return playerInfoList[index]
        }

        console.log('No player found with id: ' + id)
    },

    GetPlayerWithClient: function(client){

        for(let i = 0; i <playerInfoList.length; i++){

            if(client == playerInfoList[i].client){
    
                return playerInfoList[i]
            }
        }
        console.log("No player id found")
    }
}

function GoodBy(client){
    player = GetPlayerWithClient(client)
    playerInfoList.splice(player)
}

function GetPlayerWithClient(client){

    for(let i = 0; i <playerInfoList.length; i++){

        if(client == playerInfoList[i].client){

            return playerInfoList[i]
        }
    }
    console.log("No player id found")
}