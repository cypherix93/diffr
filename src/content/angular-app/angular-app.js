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
    .run(function ($rootScope, $http, $ui)
    {
        // Put $rootScope variables here
        $rootScope.AppName = "diffr";
        $rootScope.PageName = "Home";

        $rootScope.$ui = $ui;
    })
    // Bootstrap global events
    .run(function ($rootScope, $window)
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
    });

// Configure Angular App Preferences
AngularApp
    .config(function ($routeProvider)
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
    })
    .config(function ($locationProvider)
    {
        $locationProvider.html5Mode(false);
    });