const tableTypes = {
  TESTTABLE:'TestTable',
  PLAYERINFO:'playerinfo',
  DEVICEINFO:'deviceinfo',
  SESSIONINFO:'sessioninfo',
  CHARACTERINFO:'characterinfo',
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

module.exports = { tableTypes, playerInfo, matchInfo };
