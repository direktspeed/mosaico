import QUnit from 'steal-qunit';
import { ViewModel } from './naviagation-silver';

// ViewModel unit tests
QUnit.module('mosaico-admin/naviagation-silver');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the naviagation-silver component');
});
