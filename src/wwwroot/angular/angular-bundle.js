/* Global Angular App Declaration */

var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ui.bootstrap"
    ]);

// Configure Angular App Initialization
AngularApp
    .run(["$rootScope", "$http", "$ui", function ($rootScope, $http, $ui)
    {
        // Put $rootScope variables here
        $rootScope.$ui = $ui;
    }])
    // Bootstrap global events
    .run(["$rootScope", "$window", function ($rootScope, $window)
    {
        $rootScope.$ui.Ready(function ()
        {
            // This is to prevent JSON.stringify from making UTC dates with timezone offsets
            // Now what you enter, you will recieve
            Date.prototype.toJSON = function ()
            {
                return new Date(this.getTime() - (this.getTimezoneOffset() * 60000)).toISOString();
            };
        });
    }]);

// Configure Angular App Preferences
AngularApp
    .config(["$routeProvider", function ($routeProvider)
    {
        $routeProvider
            // route for the home page
            .when("/",
                {
                    templateUrl: "views/home/index.html"
                })
            // route pattern for the other pages
            .when("/:name",
                {
                    templateUrl: function(urlattr)
                    {
                        return "views/" + urlattr.name + "/index.html";
                    }
                });
    }])
    .config(["$locationProvider", function ($locationProvider)
    {
        $locationProvider.html5Mode(false);
    }]);
AngularApp.service("$ui", ["$timeout", function ($timeout)
{
    // When the DOM is ready, call callback.
    this.Ready = function (callback)
    {
        angular.element(document).ready(callback);
    };
}]);