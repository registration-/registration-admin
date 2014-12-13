;'use strict';

angular.module('app.resource')
    .factory('Department', ['$resource','APP_CONFIG',function($resource,APP_CONFIG){
    return $resource(APP_CONFIG.api.base, null, {
        list:{
            method: 'GET',
            url: APP_CONFIG.api.hospital.base + '/:hid/departments'
        },
        create:{
            method: 'POST',
            url: APP_CONFIG.api.hospital.base + '/:hid/departments'
        }
    });
}]);