const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "626300",
    connectionLimit: 10
})

//  pool.query('SELECT userName FROM projectxdb.playerinfo WHERE primaryKey = 1;', (err, res) =>{
//      if (err) {
//          return console.error("Sorgu Hatası:", err);
//      }
//      console.log(res);})
module.exports = {
    GetValue:function() {
        pool.query('SELECT * FROM projectxdb.playerinfo;', (err, res) =>{
        if (err) {
            return console.error("Sorgu Hatası:", err);
        }
        return res + 'a';
    })
}}

async function GetData(tableName, fieldName, key, queryWith = 'primaryKey') {        
    pool.query(`SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`, (error, results) => {
        console.log(res)        
    });
}
module.exports = {
    GetData
};