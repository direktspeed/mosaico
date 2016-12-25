import QUnit from 'steal-qunit';
import { ViewModel } from './installed-templates';

// ViewModel unit tests
QUnit.module('mosaico-admin/naviagation-silver/installed-templates');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the naviagation-silver-installed-templates component');
});
