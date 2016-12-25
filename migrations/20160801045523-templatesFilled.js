exports.up = function(db, callback) {
  db.createTable('templatesfilled', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: true },
    template: 'string',
    metadata: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('templatesfilled', callback);
};
