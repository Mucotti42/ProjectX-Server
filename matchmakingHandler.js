const db = require('./database.js');
const userManager = require('./UserManager.js');
const dbFields = require('./dbTables.js');
const matchBegining = require('./matchBegining.js');

class Player {
    constructor(primaryKey, client, gameMode, rank) {
        this.primaryKey = primaryKey;
        this.client = client;
        this.gameMode = gameMode; // 1 = ranked, 2 = casual
        this.rank = rank;
        this.range = 3;
    }
}

// gameMode değerleri: 1 = ranked, 2 = casual
const pool = {
    1: [], // ranked
    2: []  // casual
};

exports.StartMatchmaking = function (client, gameMode) {
    const p = userManager.GetPlayerWithClient(client);

    db.GetData(
        dbFields.tableTypes.PLAYERINFO,
        dbFields.playerInfo.RANK,
        p.primaryKey,
        dbFields.playerInfo.PRIMARYKEY,
        (data) => {
            const playerRank = gameMode === 1 ? data : 0; // only ranked mode uses rank
            const player = new Player(p.primaryKey, client, gameMode, playerRank);
            pool[gameMode].push(player);
            console.log(`Player ${p.primaryKey} started matchmaking in mode ${gameMode === 1 ? 'ranked' : 'casual'}`);
        }
    );
};

exports.EndMatchmaking = function (client, gameMode) {
    const arr = pool[gameMode];
    const playerIndex = arr.findIndex(player => player.client === client);
    if (playerIndex !== -1) {
        arr.splice(playerIndex, 1);
        console.log(`Player left matchmaking from mode ${gameMode === 1 ? 'ranked' : 'casual'}`);
    }
};

function matchPlayersFromPool(poolArray, gameMode) {
    for (const player of [...poolArray]) {
        for (const otherPlayer of [...poolArray]) {
            if (player.primaryKey === otherPlayer.primaryKey) continue;

            const rankGap = Math.abs(player.rank - otherPlayer.rank);
            const allowedGap = player.range + otherPlayer.range;

            if (rankGap <= allowedGap) {
                matchBegining.LoadMatch(
                    player.primaryKey,
                    otherPlayer.primaryKey,
                    gameMode,
                    Math.floor(Math.random() * 4)
                );

                poolArray.splice(poolArray.indexOf(player), 1);
                poolArray.splice(poolArray.indexOf(otherPlayer), 1);
                console.log(`Matched ${player.primaryKey} vs ${otherPlayer.primaryKey} in ${gameMode === 1 ? 'ranked' : 'casual'}`);
                break;
            }
        }
    }

    for (const player of poolArray) {
        player.range++;
    }
}

setInterval(() => {
    matchPlayersFromPool(pool[1], 1); // ranked
    matchPlayersFromPool(pool[2], 2); // casual
}, 50);
