import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('mosaico-admin functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('mosaico-admin main page shows up', function() {
  F('title').text('mosaico-admin', 'Title is set');
});
