var questApp = angular.module('questApp', ["ngRoute"])
    .config(function($routeProvider){
        $locationProvider.html5mode({
            enabled:true,
            requareBase:false,
        })
        .when('/page',
        {
            restrict: 'E',
            templateUrl:'views/page.html',
            controller:'pageCtrl'
        })
        .when('/page',
        {
            restrict: 'E',
            templateUrl:'views/page.html',
            controller:'pageCtrl'
        })
        .when('/rents/',
        {
            restrict: 'E',
            templateUrl:'views/rentsTable.html',
            controller:'rentsTableCtrl'
        })
        .otherwise({
            redirectTo: '/'
      });
});