const activeMatches = require('./activeMatches')
const userManager = require('./UserManager')

//Communication------------------------
exports.SendPackage = (client, type, data) => {
    class pack{
        constructor(type, data){
            this.type = type
            this.data = data
        }
    }

    let package = ToJson(new pack(type, data))
    console.log(package)
    client.send(package)
};

exports.SendAll = (gameId, type, data) => {
    let players = activeMatches.GetMatch(gameId).players;
    for (const player in players) {
        let client = userManager.GetPlayerWithPrimaryKey(player).client;
        this.SendPackage(client,type,data)
    }
};

exports.SendError = (client, data) => {
    this.SendPackage(client, 'Error', data)
};

function ToJson(dataPackage)
{
    return JSON.stringify(dataPackage)
}
function FromJson(data)
{
    return JSON.parse(data);
}
//-------------------------------------