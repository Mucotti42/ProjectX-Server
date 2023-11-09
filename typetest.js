  const dbFields = require('./dbTables')
  const db = require('./database')

    console.error("before");
    QU();
    console.log("after");
    
    async function QU() {        
      try {
        let data = await db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.MAIL, '4', dbFields.playerInfo.RANK);
        console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(error);
      }
    };
