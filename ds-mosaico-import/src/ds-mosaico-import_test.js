import QUnit from 'steal-qunit';
import plugin from './ds-mosaico-import';

QUnit.module('ds-mosaico-import');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof plugin, 'function');
  QUnit.equal(plugin(), 'This is the ds-mosaico-import plugin');
});
