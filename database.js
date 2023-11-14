const {createPool} = require('mysql')

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "626300",
//     connectionLimit: 10
// })
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Celestial01!",
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
  //TODO IF QUERY FIELD IS STRING ESCAPE IT
    console.log('isString ' + typeof key === 'string')
    key = typeof key === 'string' ? pool.escape(key) : key;
    console.log(`SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = '${key}';`);
    return new Promise((resolve, reject) => {
        pool.query(`SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                console.log('is array '+ Array.isArray(results));
                console.log('length '+ results.length);
                if(Array.isArray(results) && results.length < 2)
                  results = results[0];
              
              console.log(results);
                resolve(results);
            }
        });
    });
}

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
  
  const SetData = async function (tableName, fieldName, newValue, queryWith = 'primaryKey') {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE ${tableName} SET ${fieldName} = ? WHERE ${queryWith} = ?`, newValue, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  const InsertData = async function (tableName, data) {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(data).join(', ');
      const values = Object.values(data).map(value => (value === 'UUID()' ? value : pool.escape(value))).join(', ');

        const query = `INSERT INTO projectxdb.${tableName} (${fields}) VALUES (${values})`;
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  module.exports = {
    GetData,
    SetData,
    CheckData,
    InsertData
};