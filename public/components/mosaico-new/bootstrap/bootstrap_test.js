import QUnit from 'steal-qunit';
import { ViewModel } from './bootstrap';

// ViewModel unit tests
QUnit.module('mosaico-admin/bootstrap');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the bootstrap component');
});
