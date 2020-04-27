//'use strict';
//?lat&lng&viewport
/**
 * @ngdoc overview
 * @name todoAppCodeApp
 * @description
 * # todoAppCodeApp
 *
 * Main module of the application.
 */


/*window.app = angular.module('ui.bootstrap.demo', ['ngAnimate', '']);*/

window.app = angular.module('todoAppCodeApp', ['ngAnimate', 'ngCookies', 'ngRoute', 'ui.router','ngFileUpload']);


app.run(['$rootScope', '$state', 'constants','Upload',function($rootScope, $state, constants, Upload) {
    if($rootScope.loggedIn == true) {

    } else {
        $rootScope.loggedIn = false
    }
}])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', '$qProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false)
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("/", {
                url: "/",
                templateUrl: 'views/mblogin.html',
                controller: 'mbloginCtrl',
            })
            .state("/patient/dashboard", {
                url: "/patient/dashboard",
                templateUrl: 'views/mainTemp.html',
                controller: 'MainCtrl', 
                params: {
                    loggedIn : false,
                    user : null
                }
            })
            .state("/doctor/dashboard", {
                url: "/doctor/dashboard",
                templateUrl: 'views/doctors.html',
                controller: 'MainCtrl', 
                params: {
                    loggedIn : false,
                    user : null
                }
            })
            
        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);
    }
]);
