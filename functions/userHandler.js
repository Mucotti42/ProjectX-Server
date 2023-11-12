const db = require('../database.js')

exports.testb = function(client,data){
    console.log('testb' + data.value);
}