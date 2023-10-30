  const dbFields = require('./dbTables')
  const db = require('./database')

    console.error("before");
    QU();
    console.log("after");
    
    async function QU() {        
      await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.USERNAME, 1)
    };
