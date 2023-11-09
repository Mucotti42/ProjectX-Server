const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "626300",
    connectionLimit: 10
})

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
    console.log(`SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`);
    return new Promise((resolve, reject) => {
        pool.query(`SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}
module.exports = {
    GetData,
    CheckData,
    InsertData
};

const CheckData = async function (tableName, fieldName, key, value, queryWith = 'primaryKey') {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT ${fieldName} FROM ${tableName} WHERE ${queryWith} = ? AND ${fieldName} = ?`, [key, value], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  const InsertData = async function (tableName, key, fieldName, newValue, queryWith = 'primaryKey') {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE ${tableName} SET ${fieldName} = ? WHERE ${queryWith} = ?`, [newValue, key], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };