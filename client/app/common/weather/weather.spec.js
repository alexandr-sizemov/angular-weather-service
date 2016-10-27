// specs here
import WeatherModule from './weather'
import WeatherService from './weather.service';

describe('Weather Service', () => {
  let $rootScope, makeController;

  beforeEach(window.module(WeatherModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_
  }));

  describe('Given a new istance', () => {
    let weatherService
    let httpBackend 
    beforeEach(inject( ($http, $httpBackend) => {
      weatherService = new WeatherService($http)
      httpBackend = $httpBackend
    }));

    it('has a stationList empty array', () => {
      expect(weatherService.stationList).to.be.instanceof(Array)
      expect(weatherService.stationList).to.be.empty      
    });

    it('has an api property of type string', () => {
      expect(weatherService.api).to.be.a('string')
      expect(weatherService.api).to.not.be.empty
    });

    it('has a token property of type string', () => {
      expect(weatherService.token).to.be.a('string')
      expect(weatherService.token).to.not.be.empty
    });

    describe('call the getWeatherData(map) method', (done) => {
      beforeEach(() => {
        httpBackend
          .when('GET', 'http://api.openweathermap.org/data/2.5/box/city?bbox=1,44,10,50,8&cluster=yes&appid=47da3950edf0fcef40421e3233676404')
          .respond(200, openweatherresponse );
          weatherService.getWeatherData(google.maps)
      });

      it('should fill the stationList with markers returned by the openweather api', () => {
        setTimeout(() => {
          expect(weatherService.stationList).to.have.lengthOf(5);
          done();
        }, 1000);
      });

    
    });

    describe('call the clearWeather() method', () => {
      beforeEach(() => {
        httpBackend
          .when('GET', 'http://api.openweathermap.org/data/2.5/box/city?bbox=1,44,10,50,8&cluster=yes&appid=47da3950edf0fcef40421e3233676404')
          .respond(200, openweatherresponse );

        weatherService.getWeatherData(google.maps)
        weatherService.clearWeather()
      });
        
      it('should clear the stationList array', () => {
        setTimeout(() => {
          expect(weatherService.stationList).to.be.empty
          done();
        }, 1000);
      });
    
    });

  });

});
