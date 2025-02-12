const {createPool} = require('mysql')

const os = require('os');

let pool;
console.log(os.platform())
if (os.platform() === 'win32') {
  // Windows environment
  pool = createPool({
    host: "localhost",
    user: "root",
    password: "626300",
    connectionLimit: 10
  });
} else {
  // Assume it's a Linux environment
  pool = createPool({
    host: "localhost",
    user: "root",
    password: "Celestial01!",
    connectionLimit: 10
  });
}
      async function GetCharacterData(key = null, fieldName = null,  callback = null) {

        if(fieldName === null)
          fieldName = '*'

        if(typeof key === 'string')
        key = pool.escape(key);
        let query = '';
        if(key === null)
          query = `SELECT ${fieldName} FROM projectxdb.characterinfo;`
        else
          query = `SELECT ${fieldName} FROM projectxdb.characterinfo WHERE type = ${key};`;

        console.log(query);

        const results = await new Promise((resolve, reject) => {
          pool.query(query, (error, results) => {
            if (error) {
              reject(error);
            } else {
              if (Array.isArray(results) && results.length < 2) {
                results = results[0];
              }
              resolve(results);
            }
          });
        });

        if (callback) {
          callback(results);
        }

        return results;
}
      async function GetData(tableName, fieldName = null, key = null, queryWith = 'primaryKey', callback = null) {

        if(fieldName === null)
          fieldName = '*'

        key = typeof key === 'string' ? pool.escape(key) : key;

        let query = '';
        if(key === null)
            query = `SELECT ${fieldName} FROM projectxdb.${tableName}`;
        else
            query = `SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`;
        console.log(query);
      
        const results = await new Promise((resolve, reject) => {
          pool.query(query, (error, results) => {
            if (error) {
              reject(error);
            } else {

              console.log("isarray " + Array.isArray(results) +" lenghth " + results.length + " res" + results + " res0" + results[0])
              if (Array.isArray(results) && results.length < 2) {
                results = results[0];
              }

              resolve(results);
            }
          });
        });
      
        // Call the callback function after retrieving data
        if (callback) {
          callback(results);
        }

        console.log("GetData: ",results)
        return results;
      }

async function GetDataWithQuery(query, callback = null) {
  const results = await new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (Array.isArray(results) && results.length < 2) {
          results = results[0];
        }

        resolve(results);
      }
    });
  });

  // Call the callback function after retrieving data
  if (callback) {
    callback(results);
  }

  return results;
}
async function IsRowExists(tableName, key, queryWith = 'primaryKey',callback = null) {
  // Escape key if it's a string
  key = typeof key === 'string' ? pool.escape(key) : key;

  const query = `SELECT COUNT(*) as count FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`;
  //console.log(query);
  let isExist;
  await new Promise((resolve, reject) => {
    pool.query(query, (error, _results) => {
      if (error) {
        reject(error);
      } else {

        const count = _results[0].count;
        if (callback) {
          callback(count);
        }
        resolve(_results);
        isExist = count > 0;
      }
    });
  });
  return isExist;
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

        const SetData = async function (tableName, fieldName, key, value, queryWith = 'primaryKey') {
          return new Promise((resolve, reject) => {
            pool.query(`UPDATE projectxdb.${tableName} SET ${fieldName} = ? WHERE ${queryWith} = ?`, [value, key], (error, results) => {
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
          IsRowExists,
          CheckData,
          InsertData,
          GetCharacterData,
          GetDataWithQuery
      };