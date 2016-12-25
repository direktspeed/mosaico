import Component from 'can-component/';
import Map from 'can-define/map/';
import './naviagation-silver.less!';
import template from './naviagation-silver.stache!';

export const ViewModel = Map.extend({
    message: function() {
      return 'This is the naviagation-silver component'
    }
});

export default Component.extend({
  tag: 'naviagation-silver',
  viewModel: ViewModel,
  view: template
});
