const tableTypes = {
  TESTTABLE:'TestTable',
  PLAYERINFO:'playerinfo',
  DEVICEINFO:'deviceinfo',
  SESSIONINFO:'sessioninfo',
  CHARACTERINFO:'characterinfo'
}

const playerInfo = {
  ID: 'id',
  AGE: 'age',
  PRIMARYKEY: 'primaryKey',
  UNIQUEID: 'uniqueId',
  USERNAME: 'userName',
  DATETIME: 'dateTime',
  MAIL: 'email',
  APIID: 'apiId',
  RANK: 'playerRank',
  CHARACTERS: 'characters'
}
const characterTypes = {
  MUSHROOM:'mushroom',
  PIXIE:'pixie',
  SWORDSMAN:'swordsman',
  ENGAGEANDOUT:'engageandout',
  RHINO:'rhino',
  TWINARCHERS:'twinarchers',
  LIGHTNINGMAGE:'lightningmage',
  SUPERTANK:'supertank',
  NECROMANCER:'necromancer',
  HORTLAK:'hortlak',
  THEKING:'theking'
}
const characterProperties = {
  TYPE:'type',
  HEALTH:'health',
  MAXHEALTH:'maxhealth',
  DAMAGE:'damage',
  HEALAMOUNT:'healamount',
  HEALCOORDS:'healcoords',
  MOVECOORDS:'movecoords',
  ATTACKCOORDS:'attackcoords',
  VARIABLE1:'variable1',
  VARIABLE2:'variable2'
}
module.exports = { tableTypes, playerInfo };
