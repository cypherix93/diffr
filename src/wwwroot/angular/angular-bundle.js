/* Global Angular App Declaration */

var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ui.bootstrap",
        "contenteditable"
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
            $location.url("/");
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
AngularApp.controller("DiffCtrl", ["$scope", function($scope)
{
    $scope.DiffText = {
        Left: "",
        Right: ""
    };

    $scope.DiffData = {
        Left: [],
        Right: []
    };

    var diffInnerHtml = {
        Left: "",
        Right: ""
    };

    $scope.$watchGroup(["DiffText.Left", "DiffText.Right"], function(newVal)
    {
        var leftText = newVal[0];
        var rightText = newVal[1];

        if(leftText === null || rightText === null)
            return;

        console.log($("<div>" + leftText.toString() + "</div>").html());
    });

    $scope.$watchGroup(["DiffData.Left", "DiffData.Right"], function(newVal)
    {
        var leftLines = newVal[0];
        var rightLines = newVal[1];


    });
}]);
AngularApp.service("$ui", ["$timeout", function ($timeout)
{
    // When the DOM is ready, call callback.
    this.Ready = function (callback)
    {
        angular.element(document).ready(callback);
    };
}]);
AngularApp.service("$diffr", function()
{
    var _this = this;


});