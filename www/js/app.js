// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        // Authenticate on Android with Google account
        if (plugins && plugins.GAEAuth) {
            plugins.GAEAuth.get(function(accounts){
                if(accounts.length > 0) {
                    plugins.GAEAuth.authenticate(accounts[0].name, "hashtock", function (url) {
                        $http.get(url);
                    });
                }
            });
        }

        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('tab.orders', {
        url: '/orders',
        views: {
            'tab-orders': {
                templateUrl: 'templates/tab-orders.html',
                controller: 'CurrentOrdersCtrl'
            }
        }
    })

    .state('tab.bank', {
        url: '/bank',
        views: {
            'tab-bank': {
                templateUrl: 'templates/tab-bank.html',
                controller: 'BankCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/profile');

})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post["Content-Type"] = "application/json"
    $httpProvider.defaults.headers.common.Accept = "application/json";
}])
;
