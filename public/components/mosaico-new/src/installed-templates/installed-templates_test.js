import QUnit from 'steal-qunit';
import { ViewModel } from './installed-templates';

// ViewModel unit tests
QUnit.module('mosaico-admin/installed-templates');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the installed-templates component');
});
