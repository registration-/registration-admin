;
'use strict';
angular.module('app.auth')
    .controller('AuthController', ['$scope', '$http', '$window', 'APP_CONFIG', 'AUTH_EVENTS', 'provinces', 'cities', 'Hospital',
        function($scope, $http, $window, APP_CONFIG, AUTH_EVENTS, provinces, cities, Hospital) {
            var scope = this;

            scope.provinces = provinces;
            scope.cities = cities;
            console.log(scope);

            scope.status = {};

            // loginFeedback,
            scope.errors = {};

            scope.account = {};

            scope.registration = {

            };

            scope.login = function(account) {
                if (account && account.admin_account && account.admin_password) {
                    scope.status.processing = true;
                    console.log(account);

                    Hospital.login(account, function(data) {
                        scope.status.processing = false;
                        console.log(data);
                        if(data.status){
                            $window.sessionStorage.hid = data.hospital.id;
                            $scope.$emit(AUTH_EVENTS.loginSucceeded);
                        }else{
                            scope.errors.loginFeedback = '账号和密码有误';
                        }
                    }, function(data) {
                        console.log(data);
                        scope.status.processing = false;
                        scope.error = data && data.msg;
                    });

                }
            };
            scope.register = function(registration) {
                registration = registration || scope.registration;
                if (!registration.admin_account) scope.errors.admin_account = '请输入账号';
                if (!registration.admin_password) scope.errors.admin_password = '请输入密码';
                if (!registration.name) scope.errors.name = '请输入医院名称';
                if (registration.admin_password !== registration.confirmed_password) scope.errors.admin_password = '确认密码不一致';
                if (scope.errors.admin_account || scope.errors.admin_password || scope.errors.name) {
                    return;
                }
                var hospital = {
                    admin_account: registration.admin_account,
                    admin_password: registration.admin_password,
                    name: registration.name,
                    city: registration.city.city,
                    province: registration.city.province,
                    city_id: registration.city.id
                };
                console.log(hospital);
                scope.status.processing = true;
                Hospital.register(hospital, function(r) {
                    scope.status.processing = false;
                    if (r.status) {
                        scope.login(hospital);
                    }
                    console.log(r);
                }, function(d) {
                    scope.status.processing = false;
                    console.log(d);
                });
                // $http.post(APP_CONFIG.api.hospital.register, hospital)
                //     .success(function(data) {
                //         console.log(data);
                //     })
                //     .error(function(data) {
                //         console.log(data);
                //     })
                //     .finally(function() {
                //         scope.status.processing = false;
                //     });

            };

            scope.dismissError = function(field) {
                delete scope.errors[field];
            };


        }
    ]);