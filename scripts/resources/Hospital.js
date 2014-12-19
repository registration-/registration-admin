;'use strict';

angular.module('app.resource')
    .factory('Hospital', ['$resource','APP_CONFIG',function($resource,APP_CONFIG){
    return $resource(APP_CONFIG.api, null, {
        register: {
            method: 'POST',
            url: APP_CONFIG.api.hospital.register
        },
        login: {
            method: 'POST',
            url: APP_CONFIG.api.hospital.login
        },
        get: {
            method: 'GET',
            url: APP_CONFIG.api.hospital.get
        },
        getRegistration: {
            method: 'GET',
            url: APP_CONFIG.api.hospital.base + '/:hid/registrations/:code'
        },
        checkRegistration: {
            method: 'PUT',
            url: APP_CONFIG.api.hospital.base + '/:hid/registrations/:rid'
        },
        update: {
            method: 'PUT',
            url: APP_CONFIG.api.hospital.base + '/:hid'
        }
    });
}]);