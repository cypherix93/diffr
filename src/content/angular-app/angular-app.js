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
    .run(function ($rootScope, $location)
    {
        $rootScope.$on("$routeChangeError", function ()
        {
            $location.url("/error/404");
        });

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
            // route patterns for the other pages
            .when("/:base/:sub",
                {
                    templateUrl: function (urlattr)
                    {
                        return "views/" + urlattr.base + "/" + urlattr.sub + ".html";
                    }
                })
            .when("/:base",
                {
                    templateUrl: function (urlattr)
                    {
                        return "views/" + urlattr.base + "/index.html";
                    }
                });
    })
    .config(function ($locationProvider)
    {
        $locationProvider.html5Mode(false);
    });