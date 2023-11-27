const db = require('./database.js')
const userManager = require('./UserManager.js')
const dbFields = require('./dbTables.js')
const matchBegining = require('./matchBegining.js')

class Player{
    constructor(primaryKey, client,gameMode,rank){
        this.primaryKey = primaryKey
        this.client = client
        this.gameMode = gameMode
        this.rank = rank
        this.range = 3
    }
}
const pool = [];
exports.StartMatchmaking = function (client, gameMode) {
    var p = userManager.GetPlayerWithClient(client)
    var rank = db.GetData(dbFields.tableTypes.PLAYERINFO, dbFields.playerInfo.RANK,p.primaryKey,dbFields.playerInfo.PRIMARYKEY ,(data)=>{
      var player = new Player(p.primaryKey,client,gameMode,data.playerRank)
      pool.push(player)
      console.log('Player started matchmaking with id: ' + p.primaryKey)
    })
    
}
exports.EndMatchmaking = function(client,data){
    const playerIndex = pool.findIndex(player => player.client === client);
    if (playerIndex !== -1) {
    pool.splice(playerIndex, 1);
}
  }

  
  let timer = setInterval(() => {
    // Tüm oyuncuları karşılaştırın.
    for (const player of pool) {
      for (const otherPlayer of pool) {
        if (player.primaryKey === otherPlayer.primaryKey) 
            continue;

            console.log((player.range + otherPlayer.range) - Math.abs(player.rank - otherPlayer.rank))
        if (Math.abs(player.rank - otherPlayer.rank) <= player.range + otherPlayer.range) {
            matchBegining.LoadMatch(player.primaryKey,otherPlayer.primaryKey,player.gameMode)

            pool.splice(pool.indexOf(player), 1);
            pool.splice(pool.indexOf(otherPlayer), 1);
        }
      }
    }
  
    // Range'i güncelle
    for (const player of pool) {
      player.range++;
    }
  
    // Sürekli döngüyü kontrol edin.
  }, 1000);