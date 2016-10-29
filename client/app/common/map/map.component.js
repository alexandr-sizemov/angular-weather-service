import template from './map.html';
import controller from './map.controller';
import './map.styl';

let mapComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller: ['$scope', 'WeatherService', 'locationNotifyService', controller],
  scope:{
    getLocation:'='
  }
};

export default mapComponent;