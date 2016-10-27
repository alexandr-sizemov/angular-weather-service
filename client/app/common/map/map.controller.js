import config from './map.config.js'

class MapController {
  constructor(scope, weather) {
    this.name = 'Map';
    this._scope = scope
    this._weather = weather

    this._scope.getLocation = this.getLocation.bind(this)
    this._scope.formVisible = false
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
    if(navigator){
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            map.setCenter(center)
          },
          () => {
            scope.formVisible = true
            scope.$apply()
          }
        )
    }
 
  }

  getLocation(){

    let map = this.map
    let city = this._scope.city
    let postcode = this._scope.postcode

    this.geocoder.geocode({'address': postcode+ ' '+ city}, function(results, status) {
          if (status === 'OK') {

            map.setCenter(results[0].geometry.location)
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
  }

}

export default MapController;
