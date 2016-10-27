import angular from 'angular';
import Map from './map/map';
import Weather from './weather/weather';
import LocationForm from './locationform/locationform';

let commonModule = angular.module('app.common', [
  Weather,
  Map,
  LocationForm
])
  
.name;

export default commonModule;
