import config from './map.config.js'
import {eventsList} from '../locationForm/locationForm'

class MapController {
  constructor(scope, weather, locationNotifyService) {
    this.name = 'Map';
    this._scope = scope
    this._weather = weather
    this._locationNotifyService = locationNotifyService

    this.getUserGeolocation = this.getUserGeolocation.bind(this)
    this._locationNotifyService.subscribe(scope, eventsList.locationChange,  this.getLocation.bind(this))
    this.initialize()
  }

  initialize(){
    this.map = new google.maps.Map(document.getElementById('map'), config )
    this.geocoder = new google.maps.Geocoder()
    this.getUserGeolocation()
    google.maps.event.addListener(this.map,'idle', () => { this._weather.getWeatherData(this.map) })
  }

  getUserGeolocation() {

    let map = this.map
    let scope = this._scope
    let locationNotifyService = this._locationNotifyService
    if(navigator){
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            map.setCenter(center)
          },
          () => { locationNotifyService.notify(eventsList.toggleFormVisibility,true) }
        )
    }
 
  }

  getLocation(event, location){
    let map = this.map
    let locationNotifyService = this._locationNotifyService
    this.geocoder.geocode({'address': location.country + ' ' + location.postcode}, function(results, status) {
          if (status === 'OK') {

            map.setCenter(results[0].geometry.location)
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            locationNotifyService.notify(
              eventsList.toggleFormVisibility,
              {
                isVisible: true,
                info:'Geocode was not successful for the following reason: ' + status
              })
          }
        });
  }

}

export default MapController;
