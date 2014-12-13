;angular.module('app.utils')
    .directive('inputHint',function(){
        return {
            restrict: 'A',
            link: function(scope,element,attrs){
                console.log(element);
                console.log(attrs);
            
                console.log();
            }
        };
    });