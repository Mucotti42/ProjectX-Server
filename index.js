const messageHandlers = require('./messageHandler');
const WebSocket = require('ws')
const userManager = require('./UserManager')
const matchmakingHandler = require('./matchmakingHandler.js')
const db = require("./database");
const dbTables = require('./dbTables.js')


const wsPort = 8080

//Starting ----------------------------
const server = new WebSocket.Server({port: wsPort},()=>
{
    console.log('server started')
})

module.exports = server;

server.on('listening', () =>
{
    console.log('WebSocket server is listening on port ' + wsPort)
})
//-------------------------------------

//Client Connection -------------------
server.on('connection',(client) =>
{
    userManager.Welcome(client)
    client.on('message', (message)=>
    {
        console.log('Player connected:', message);
        let data = JSON.parse(message);
        console.log(data.type)
        
        messageHandlers.handleMessage(data.type,client,data);        
    })

    client.on('close', (code, reason) => {
        console.log('Player disconnected:', code, reason);

        matchmakingHandler.EndMatchmaking(client,1)
        userManager.DisconnectedPlayer(client)
        //db.SetData('sessioninfo',)
    });
})
