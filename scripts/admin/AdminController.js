;'use strict';
angular.module('app')
    .controller('AdminController', ['$rootScope','$scope', '$window', 'Hospital', 'hospital', 'departments', function($rootScope,$scope,$window,Hospital,hospital,departments){
        var scope = this;
        scope.status = {};

        scope.hospital = hospital;
        scope.departments = departments;
        console.log(scope);

        scope.updateHospitalProfile = function(){
            var postDate = {};
            postDate.hospital = {};
            if(scope.hospital.level) postDate.hospital.level = scope.hospital.level;
            if(scope.hospital.type) postDate.hospital.type = scope.hospital.type;
            if(scope.hospital.description) postDate.hospital.description = scope.hospital.description;
            if(scope.hospital.phone) postDate.hospital.phone = scope.hospital.phone;
            if(scope.hospital.website) postDate.hospital.website = scope.hospital.website;
            if(scope.hospital.location) postDate.hospital.location = scope.hospital.location;
            if(scope.hospital.picture) postDate.hospital.picture = scope.hospital.picture;
            if(scope.hospital.rule) postDate.hospital.rule = scope.hospital.rule;

            Hospital.update({
                hid: $window.sessionStorage.hid
            },postDate,function(h){
                $window.alert('跟新医院信息成功');
            },function(e){

            });
        };
        /////////////////////////////////////////////////////////////////////////////
        /// adminController event handler
        /////////////////////////////////////////////////////////////////////////////


    }]);