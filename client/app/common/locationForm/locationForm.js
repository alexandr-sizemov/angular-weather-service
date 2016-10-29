import template from './locationForm.html'

export const eventsList = {
  locationChange:'location-change',
  toggleFormVisibility:'toggle-form-vibility',
  geocodeResult:'geocode-result'
}

export default angular.module('locationForm',[]).component('locationForm', {
  template: template,
  bindings: {
    country: '&',
    postcode: '&'
  },
  controllerAs: 'locationFormController',
  controller: ['$scope','locationNotifyService', (scope, locationNotifyService) => {

    let toggleForm = (event, action) => { 
      scope.isVisible = action
      scope.$apply()
    }

    let showGeoCodeResult = (event, action) => {
      scope.isResultVisible = action.isVisible
      scope.resultInfo = action.info
      scope.$apply()
    }

    locationNotifyService.subscribe(scope, eventsList.toggleFormVisibility, toggleForm)
    locationNotifyService.subscribe(scope, eventsList.geocodeResult, showGeoCodeResult)

    scope.isVisible = false
    scope.isResultVisible = false
    scope.resultInfo = ''



    scope.getLocation = () => {
      let location = {
        country:scope.country || '',
        postcode: scope.postcode || ''
      }
      locationNotifyService.notify(eventsList.locationChange,  location)
    }

  }]
}).factory('locationNotifyService', ($rootScope) => {
    // minimal observer pattern for notify events between location form and map
    // #events:
    // - location-change
    // - toggle-form
    return {
        subscribe: (scope, event, callback) => {
            var handler = $rootScope.$on(event, callback);
            scope.$on('$destroy', handler)
        },
        notify: (event, data) => {
            if( Object.values(eventsList).some(e => e==event) ){
              $rootScope.$emit(event, data)
            }
        }
    }
})
.name