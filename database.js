const {createPool} = require('mysql')
//Local
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "626300",
//     connectionLimit: 10
// })
//Server
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Celestial01!",
  connectionLimit: 10
})

      async function GetCharacterData(key, fieldName = null,  callback = null) {

        if(fieldName == null)
          fieldName = '*'

        if(typeof key === 'string')
        key = pool.escape(key);
        
        query = `SELECT ${fieldName} FROM projectxdb.characterinfo WHERE type = ${key};`;
        console.log(query);

        const results = await new Promise((resolve, reject) => {
          pool.query(query, (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('ch data results:');
              console.log(results);
            
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
      async function GetData(tableName, fieldName, key, queryWith = 'primaryKey', callback = null) {
        // Escape key if it's a string
        console.log('isString: ');
        console.log(typeof key === 'string');
        key = typeof key === 'string' ? pool.escape(key) : key;
      
        const query = `SELECT ${fieldName} FROM projectxdb.${tableName} WHERE ${queryWith} = ${key};`;
        console.log(query);
      
        const results = await new Promise((resolve, reject) => {
          pool.query(query, (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('results:');
              console.log(results);
              console.log('is array ' + Array.isArray(results));
              console.log('length ' + results.length);
            
              if (Array.isArray(results) && results.length < 2) {
                results = results[0];
              }
            
              console.log(results);
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

      async function IsRowExists(tableName, key, queryWith = 'primaryKey') {
        const query = `SELECT COUNT(*) as count FROM projectxdb.${tableName} WHERE ${queryWith} = ?`;
      
        try {
          const results = await pool.query(query, [key]);
          const count = results.count;
          console.log('row count' + count)
          if (count > 0) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
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
          GetCharacterData
      };