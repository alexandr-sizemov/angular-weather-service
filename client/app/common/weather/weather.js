import angular from 'angular';
import WeatherService from './weather.service';

let weather = angular.module('weather', [])

.service('WeatherService', ['$http', WeatherService])
  
.name;

export default weather;
