//Communication------------------------
exports.SendPackage = (client, type, data) => {
    class pack{
        constructor(type, data){
            this.type = type
            this.data = data
        }
    }

    let package = ToJson(new pack(type, data))
    console.log('package sended' + package)
    client.send(package)
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