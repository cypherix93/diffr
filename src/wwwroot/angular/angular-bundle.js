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
        $http.get("angular/meta.json")
            .success(function(response)
            {
                $rootScope.AppName = response.name;
                $rootScope.AppVersion = response.version;
                $rootScope.AppDescription = response.description;
                $rootScope.AppCopyright = response.copyright;
                $rootScope.AppAuthors = response.authors;
            });

        $rootScope.PageName = "Home";

        $rootScope.$ui = $ui;
    }])
    // Bootstrap global events
    .run(["$rootScope", "$location", function ($rootScope, $location)
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