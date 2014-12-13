;
angular.module('app', ['ui.router', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'app.config', 'app.auth', 'app.utils', 'app.resource'])
    .config(['$stateProvider', '$urlRouterProvider', '$animateProvider', function($stateProvider, $urlRouterProvider, $animateProvider) {


        $stateProvider
            .state('auth', {
                abstract: true,
                url: '/',
                resolve: {
                    provinces: ['Location', function(Location) {
                        return Location.getProvinces();
                    }],
                    cities: ['Location', function(Location) {
                        return Location.getCities();
                    }]
                },
                templateUrl: 'partials/entry.tpl.html',
                controller: 'AuthController as authCtrl'
            })
            .state('auth.login', {
                url: 'login',
                templateUrl: 'partials/auth/login.tpl.html',
                data: {
                    pageTitle: 'login'
                }
            })
            .state('auth.register', {
                url: 'register',
                templateUrl: 'partials/auth/register.tpl.html',
                data: {
                    pageTitle: 'register'
                }
            })
            .state('admin', {
                abstract: true,
                url: '/admin',
                resolve: {
                    hospital: ['Hospital','$window',function(Hospital,$window){
                        return Hospital.get({hid: $window.sessionStorage.hid}).$promise.then(function(data){
                            return data.hospital;
                        });
                    }],
                    departments: ['Department','$window',function(Department,$window){
                        return Department.list({
                            hid: $window.sessionStorage.hid
                        });
                    }]
                },
                templateUrl: 'partials/admin/admin.tpl.html',
                controller: 'AdminController as adminCtrl',
                data: {
                    requiredAuthentication: true
                }
            })
            .state('admin.settings', {
                url: '/settings',
                templateUrl: 'partials/admin/setting.tpl.html',
                data: {
                    pageTitle: '管理中心'
                }
            })
            .state('admin.departments',{
                url: '/departments',
                templateUrl: 'partials/admin/department.tpl.html',
                controller: 'DepartmentController as departmentCtrl',
                data: {
                    pageTitle: '科室管理'
                }
            })
            .state('admin.doctors',{
                url: '/doctors',
                templateUrl: 'partials/admin/doctor.tpl.html',
                controller: 'DoctorController as doctorCtrl',
                resolve: {
                    doctors: ['Doctor','$window',function(Doctor,$window){
                        return Doctor.list({
                            hid: $window.sessionStorage.hid
                        });
                    }]
                },
                data: {
                    pageTitle: '医生管理'
                }
            })
            .state('admin.sources',{
                url: '/sources',
                templateUrl: 'partials/admin/source.tpl.html',
                controller: 'SourceController as sourceCtrl',
                data: {
                    pageTitle: '号源管理'
                }
            })
            .state('admin.registrations',{
                url: '/registrations',
                templateUrl: 'partials/admin/registration.tpl.html',
                controller: 'RegistrationController as registrationCtrl',
                data: {
                    pageTitle: '预约处理'
                }
            })


        ;

        $urlRouterProvider.otherwise('/login');
        $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);
    }])
    .run(['$rootScope', '$state', 'AUTH_EVENTS', 'AuthService', '$http',
        function($rootScope, $state, AUTH_EVENTS, AuthService, $http) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8;";

            $rootScope.$state = $state;

            $rootScope.$on(AUTH_EVENTS.loginSucceeded, function() {
                $state.go('admin.departments');
            });
            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
                console.log('not authorizated event broadcast, return to state: session');
                $state.go('auth.login');
            });

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.log('stateChangeStart to: ' + toState.name);
                if (toState.data && toState.data.requiredAuthentication && !AuthService.isAuthenticated()) {
                    event.preventDefault();
                    console.log(toState.name + ' needs authenticate');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            });
        }
    ]);


;