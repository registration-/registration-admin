;'use strict';

angular.module('app.resource')
    .factory('Doctor', ['$resource','APP_CONFIG',function($resource,APP_CONFIG){
    return $resource(APP_CONFIG.api.hospital.base, null, {
        list:{
            method: 'GET',
            url: APP_CONFIG.api.hospital.base + '/:hid/doctors',
            isArray: true
        },
        create:{
            method: 'POST',
            url: APP_CONFIG.api.hospital.base + '/:hid/doctors'
        },
        addSources: {
            method: 'POST',
            url: APP_CONFIG.api.hospital.base + '/:hid/sources'
        }
    });
}]);