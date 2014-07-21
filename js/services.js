'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*
angular.module('myApp.services', [])
    .value('version', '0.1')
    .factory('meService', function ($resource) {
        return $resource('http://localhost:8080/dhis/api/me',
            { callback: 'JSON_CALLBACK' },
            { get: { method: 'JSON' } }
        );
    })
*/

var myAppServices = angular.module('myApp.services', ['ngResource']);

myAppServices.factory('meService', ['$resource',
    function($resource){
        return $resource('/dhis/api/me.json', {}, {
            getPage: {method:'GET', isArray:false}
        });
    }]);

myAppServices.factory('userSettingsService', ['$resource',
    function($resource){
        return $resource('/dhis/api/userSettings/exampleapp.usersetting', {}, {
            saveSetting: {method:'POST', isArray:false, headers: {'Content-Type': 'text/plain'}}
        });
    }]);