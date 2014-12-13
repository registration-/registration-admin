;'use strict';

angular.module('app.resource')
    .factory('Location', ['$resource','APP_CONFIG',function($resource,APP_CONFIG){
    return $resource(APP_CONFIG.api.base, null, {
        getProvinces:{
            method: 'GET',
            url: APP_CONFIG.api.provinces,
            isArray: true
        },
        getCities : {
            method: 'GET',
            url: APP_CONFIG.api.cities,
            isArray: true
        }
    });
}]);