const currentDate = new Date(Date.now());
//console.log(currentDate);

const db = require('./database.js')
const dbFields = require('./dbTables.js')
//db.GetData('playerinfo','playerRank',0,'apiID')
db.IsRowExists(dbFields.tableTypes.PLAYERINFO,'0',dbFields.playerInfo.APIID)
async function Test(){
    console.log(await db.IsRowExists(dbFields.tableTypes.PLAYERINFO,0,dbFields.playerInfo.APIID))
}

// İki tarih arasındaki farkı almak için iki Date nesnesi oluştur
const startDate = new Date('2023-12-11T19:27:41.179Z');
const endDate = new Date(); // Şu anki tarih ve saat

// İki tarih arasındaki farkı milisaniye cinsinden hesapla
const timeDifferenceInMilliseconds = endDate - startDate;

// Milisaniyeyi saniyeye çevir
const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);

// Saniyeyi dakikaya, dakikayı saate çevir
const seconds = timeDifferenceInSeconds % 60;
const minutes = Math.floor(timeDifferenceInSeconds / 60) % 60;
const hours = Math.floor(timeDifferenceInSeconds / 3600);

//console.log('Time Difference in Hours:Minutes:Seconds:', `${hours}:${minutes}:${seconds}`);

const sstartDate = new Date('2023-12-11T19:27:41.179Z');
const jsonData = {
    startDate: sstartDate.toISOString(),
    // Diğer alanları da buraya ekleyebilirsiniz
};

//console.log(JSON.stringify(jsonData));
