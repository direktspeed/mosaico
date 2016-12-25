import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import $ from 'jquery';
import './bootstrap-src';
//import './bootstrap.less!';
import template from './bootstrap.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the bootstrap component'
    }
  }
});

export default Component.extend({
  tag: 'bootstrap',
  viewModel: ViewModel,
  template
});
