import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('ds-mosaico-admin functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('ds-mosaico-admin main page shows up', function() {
  F('title').text('ds-mosaico-admin', 'Title is set');
});
