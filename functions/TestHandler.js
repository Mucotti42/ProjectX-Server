const db = require('../database.js')
const communication = require('../Communication.js')


exports.GetAge = async function(client,data){
    let dbData = await db.GetData('playerinfo', 'userName', data.value);
    console.log('GetAge' + dbData);
    communication.SendPackage(client,'Print', dbData["userName"])
}