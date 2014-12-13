;'use strict';
angular.module('app')
    .controller('AdminController', ['$rootScope','$scope', 'hospital', 'departments', function($rootScope,$scope,hospital,departments){
        var scope = this;
        scope.status = {};

        scope.hospital = hospital;
        scope.departments = departments;
        console.log(scope);

        scope.updateHospitalProfile = function(){

        };
        /////////////////////////////////////////////////////////////////////////////
        /// adminController event handler
        /////////////////////////////////////////////////////////////////////////////


    }]);