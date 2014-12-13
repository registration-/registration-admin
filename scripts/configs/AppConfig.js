;
'use strict';

angular.module('app.config', [])
    .constant('APP_CONFIG', (function() {

        var domain = 'https://registration-jlxy.rhcloud.com/api'; // dev

        ///////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////        deployment config
        //////////////////////////////////////////////////////////////////////////////////////////
        //======== uncomment for openshift
        //domain = 'https://izone-domain.rhcloud.com'; // your openshift domain
        

        //======== uncomment for vps
        //domain =  'http://domain'; ///// your domain
        ////////////////////////////////////////////////////////// end of deployment config

        return {
            api: {
                base: domain,
                provinces: domain + '/provinces',
                cities: domain + '/cities',
                hospital:{
                    base: domain + '/hospitals',
                    register: domain + '/hospitals',
                    login: domain + '/hospitals/session',
                    get: domain + '/hospitals/:hid',
                    getDepartments: domain + '/hospitals/:hid/departments',
                    createDepartments: domain + '/hospitals/:hid/departments'
                }
            }
        };
    })());