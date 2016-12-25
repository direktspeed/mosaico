
exports.up = function(db, callback) {
  callback(null, {})
  /*
  db.createTable('players', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    weight: 'int',
    height: 'int',
    birthday: 'date',
    profile: 'text',
    startRank: 'string'
  }, callback);
*/
};

exports.down = function(db, callback) {
  callback(null,{})
  db.dropTable('players', callback);
};
