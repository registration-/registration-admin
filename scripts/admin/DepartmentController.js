;
'use strict';
angular.module('app')
    .controller('DepartmentController', ['$rootScope', '$scope', 'Hospital', 'Department','departments',function($rootScope, $scope, Hospital,Department,departments) {
        var scope = this;
        scope.status = {};
        scope.metas = {};
        scope.temps = {};
        scope.temps.departments = [];
        scope.metas.activeCategoryIndex = 0;

        scope.departments = $scope.$parent.adminCtrl.departments;

        scope.addDepartment = function(){
            var toAdd = scope.temps.departmentToAdd;
            if(!toAdd){
                scope.temps.departmentToAdd = {
                    category: '',
                    name: '',
                    description: ''
                };
            }else if(toAdd.category && toAdd.name){
                scope.temps.departments.unshift(toAdd);
                scope.temps.departmentToAdd = {
                    category: '',
                    name: '',
                    description: ''
                };
            }
        };

        scope.submitNewDepartments = function(){
            var toAdd = scope.temps.departmentToAdd;
            if(toAdd && toAdd.name && toAdd.category){
                scope.temps.departmentToAdd = null;
                scope.temps.departments.unshift(toAdd);
            }
            if(scope.temps.departments.length > 0){
                var postData = {
                    hospital_id : $scope.$parent.adminCtrl.hospital.id,
                    departments: scope.temps.departments
                };
                postData.departments.forEach(function(e){
                    delete e['$$hashKey'];
                });     
                console.log(postData);
                Department.create({
                    hid: $scope.$parent.adminCtrl.hospital.id
                },postData,function(data){
                    console.log(data);
                    scope.temps.departments = [];
                    
                    Department.list({
                        hid: $scope.$parent.adminCtrl.hospital.id
                    },function(d){
                        $scope.$parent.adminCtrl.departments = d;
                        scope.departments = $scope.$parent.adminCtrl.departments;
                    });
                    
                },function(data){
                    console.log(data);
                });
            }

        };


        /////////////////////////////////////////////////////////////////////////////
        /// adminController event handler
        /////////////////////////////////////////////////////////////////////////////


    }]);