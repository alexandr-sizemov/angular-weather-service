import config from './weather.config.js'

class WeatherService {

  constructor($http) {
    this.$http = $http
    this.stationList = []
    
    this.api = config.api
    this.token = config.token
  }

  getWeatherData(map){
    let url = this.api

    let token = this.token
    let bounds = map.getBounds(),
        zoom = map.getZoom();

    let ln = bounds.getNorthEast();
    let ln2 = bounds.getSouthWest();

    let lng1 = ln.lng()
    let lat1 = ln.lat()
    let lng2 = ln2.lng()
    let lat2 = ln2.lat()
    
    url += `?bbox=${lng1},${lat1},${lng2},${lat2},${zoom}&cluster=yes&appid=${token}`

    this.$http.get(url).then((response) => {
      this.clearWeather();
      response.data.list.forEach( (city) => {
          var weatherMarker = this.getMarker(map, city.coord.lat, city.coord.lon, city.weather[0].icon);
          this.stationList.push(weatherMarker);
        });
      })
  }


  getMarker(map, lat, lng, iconId) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: config.iconUrl+`${iconId}.png`
    });
  }

  clearWeather() {
    this.stationList.forEach((station) => station.setMap(null) );
  }

}



export default WeatherService;