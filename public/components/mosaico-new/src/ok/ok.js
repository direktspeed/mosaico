import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './ok.less!';
import template from './ok.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the ok component'
    }
  }
});

export default Component.extend({
  tag: 'ok',
  viewModel: ViewModel,
  template
});