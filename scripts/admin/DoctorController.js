;
'use strict';
angular.module('app')
    .controller('DoctorController', ['$rootScope', '$scope', '$window', 'Hospital', 'Department', 'departments', 'Doctor', 'doctors', function($rootScope, $scope, $window, Hospital, Department, departments, Doctor, doctors) {
        var scope = this;
        scope.status = {};
        scope.metas = {};
        scope.temps = {};
        scope.temps.doctors = [];
        scope.temps.sources = [];


        scope.departments = $scope.$parent.adminCtrl.departments;
        scope.doctors = doctors;
        scope.doctors.$promise.then(function(){
            scope.doctors.forEach(function(d){
                d.sources.forEach(function(s){
                    s.date = new Date(s.date);
                });
            });
            console.log(scope);
        });


        scope.addMoreDoctor = function() {
            var toAdd = scope.temps.doctorToAdd;
            if (toAdd && toAdd.name && toAdd.title && toAdd.department) {
                toAdd.department_id = toAdd.department.id;
                toAdd.department = toAdd.department.name;
                scope.temps.doctors.unshift(toAdd);
                scope.temps.doctorToAdd = {};
            }
        };

        scope.submitNewDoctors = function() {
            // flush
            scope.addMoreDoctor();
            console.log(scope);


            var doctors = scope.temps.doctors;
            if (doctors.length == 0) return;

            // submit
            doctors.forEach(function(doctor) {
                delete doctor['$$hashKey'];
                if (!doctor.avatar) delete doctor.avatar;
                doctor['hospital_id'] = $window.sessionStorage.hid;
            });
            console.log(scope);

            var postData = {
                hospital_id: $window.sessionStorage.hid,
                doctors: doctors
            };
            console.log(postData);
            Doctor.create({
                hid: $window.sessionStorage.hid
            }, postData, function(data) {
                console.log(data);
                if (data.status) {
                    Doctor.list({
                        hid: $window.sessionStorage.hid
                    }, function(d) {
                        if (d && d.length > 0)
                            scope.doctors = d;
                    });
                }
            }, function(data) {
                console.log(data);
            });

        };

        scope.addMoreSource = function(index) {
            var toAdd = scope.temps.sourceToAdd || {};
            if (index !== scope.temps.sourceAddingIndex) {
                if (scope.temps.sourceAddingIndex === undefined) {

                }
                if (toAdd.date && toAdd.amount && toAdd.price) {
                    scope.temps.sources.unshift(toAdd);
                    scope.doctors[scope.temps.sourceAddingIndex].sources = scope.doctors[scope.temps.sourceAddingIndex].sources || [];
                    scope.doctors[scope.temps.sourceAddingIndex].sources.unshift(toAdd);
                    scope.temps.sourceToAdd = {};
                    scope.submitSources();
                }
                scope.temps.sourceAddingIndex = index;
            } else if (toAdd.date && toAdd.amount && toAdd.price) {
                scope.temps.sources.unshift(toAdd);
                scope.doctors[index].sources = scope.doctors[index].sources || [];
                scope.doctors[index].sources.unshift(toAdd);
                scope.temps.sourceToAdd = {};
            }
            console.log(scope);
        };
        scope.submitSources = function(index) {
            var sources = scope.temps.sources;
            if (sources.length == 0) {
                delete scope.temps.sourceAddingIndex;
                return;
            }

            if(index !== undefined && index === scope.temps.sourceAddingIndex){
                delete scope.temps.sourceAddingIndex;
            }

            // submit
            index = index || scope.temps.sourceAddingIndex;
            var did = scope.doctors[index].id;
            sources.forEach(function(source) {
                delete source['$$hashKey'];
                source.doctor_id = did;
            });

            var postData = {
                sources: sources
            };
            console.log(postData);
            scope.temps.sources = [];

            Doctor.addSources({
                hid: $window.sessionStorage.hid
            }, postData, function(s) {
                console.log(s);
            }, function(s) {
                console.log(s);
                scope.temps.sources = scope.temps.sources.concat(postData.sources);
            });

        };

        /////////////////////////////////////////////////////////////////////////////
        /// adminController event handler
        /////////////////////////////////////////////////////////////////////////////


    }]);