const messageHandlers = require('./messageHandler');
const WebSocket = require('ws')
const registration = require('./Registration')



const wsPort = 8080

//Starting ----------------------------
const server = new WebSocket.Server({port: wsPort},()=>
{
    console.log('server started')
})

module.exports = server;

server.on('listening', () =>
{
    console.log('server is listening on port ' + wsPort)
})
//-------------------------------------

//Client Connection -------------------
server.on('connection',(client) =>
{
    //console.log('New client with id: ' + req.headers['sec-websocket-key'])
    
    registration.Welcome(client)
    client.on('message', (message)=>
    {
        let data = JSON.parse(message);
        //console.log(dbaase.GetValue())

        console.log(data.type)
        
        //global[data.type](client, data);
        messageHandlers.handleMessage(data.type,client,data);        
    })
})