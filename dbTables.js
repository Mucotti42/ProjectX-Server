const tableTypes = {
  TESTTABLE:'TestTable',
  PLAYERINFO:'playerinfo',
  DEVICEINFO:'deviceinfo',
  SESSIONINFO:'sessioninfo',
  CHARACTERINFO:'characterinfo',
  MARKETPIECEINFO:'marketpieceinfo',
  MATCHINFO:'matchinfo'
}

const playerInfo = {
  ID: 'id',
  AGE: 'age',
  PRIMARYKEY: 'primaryKey',
  UNIQUEID: 'uniqueId',
  USERNAME: 'userName',
  DATETIME: 'dateTime',
  MAIL: 'email',
  APIID: 'apiID',
  RANK: 'playerRank',
  CHARACTERS: 'characters',
  SOCIALID: 'socialId',
  INCOMINGINVITES : 'incomingInvites',
  REGISTRATIONDATE: 'registrationDate'
}

const matchInfo = {
  PRIMARYKEY: 'primaryKey',
  MATCHCOUNT: 'matchCount',
  WINCOUNT: 'winCount',
  LOSECOUNT: 'loseCount'
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

module.exports = { tableTypes, playerInfo,characterTypes, matchInfo };
