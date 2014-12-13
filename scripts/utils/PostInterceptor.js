;
'use strict';
angular.module('app.utils')
    .factory('PostInterceptor', ['$rootScope', '$window', '$q', 'AUTH_EVENTS',
        function($rootScope, $window, $q, AUTH_EVENTS) {
            var serialize = function(obj, prefix) {
                var str = [];
                for (var p in obj) {
                    var k = prefix ? prefix + "[" + p + "]" : p,
                        v = obj[p];
                    str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
                return str.join("&");
            };
            return {
                request: function(config) {
                    if(config.data && typeof config.data === 'object'){
                        config.data = serialize(config.data);
                    }
                    config.headers = config.headers || {};
                    console.log(config);
                    return config;
                }
            };
        }
    ]);


angular.module('app.utils').config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('PostInterceptor');
    }
]);