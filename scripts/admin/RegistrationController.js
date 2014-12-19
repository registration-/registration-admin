;
'use strict';
angular.module('app')
    .controller('RegistrationController', ['$rootScope', '$scope', '$window', 'Hospital', 'Department', function($rootScope, $scope, $window, Hospital, Department) {
        var scope = this;
        scope.status = {};
        scope.metas = {};
        scope.temps = {};

        /////////////////////////////////////////////////////////////////////////////
        /// adminController event handler
        /////////////////////////////////////////////////////////////////////////////

       scope.getRegistration = function(){
            if(scope.code && scope.code.length > 10){
                Hospital.getRegistration({
                    hid: $window.sessionStorage.hid,
                    code: scope.code
                },function(registration){
                    if(registration){
                        console.log(registration);
                        scope.registration = registration;
                    }
                },function(err){
                    console.log(err);
                });
            }
       };
       scope.checkRegistration = function(){
            Hospital.checkRegistration({
                hid: $window.sessionStorage.hid,
                rid: scope.registration.id
            },{
                status: 'F'
            },function(){
                $window.alert('确认就诊成功！')；
                scope.registration = null;
            },function(){

            });
       };

    }]);