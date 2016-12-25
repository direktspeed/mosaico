import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './installed-templates.less!';
import template from './installed-templates.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the naviagation-silver-installed-templates component'
    }
  }
});

export default Component.extend({
  tag: 'naviagation-silver-installed-templates',
  viewModel: ViewModel,
  template
});