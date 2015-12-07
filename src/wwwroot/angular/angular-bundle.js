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
AngularApp.controller("DiffCtrl", ["$scope", "$sce", "$diffr", function ($scope, $sce, $diffr)
{
    $scope.DiffText = {
        Left: "",
        Right: ""
    };

    $scope.Differentiate = function ()
    {
        var leftText = $scope.DiffText.Left;
        var rightText = $scope.DiffText.Right;

        if (leftText === null || rightText === null)
            return;

        var results = $diffr.Diff(leftText, rightText);

        $scope.DiffResults = {
            Left: $sce.trustAsHtml(results.Left),
            Right: $sce.trustAsHtml(results.Right)
        };

        console.log(results);

        $scope.DiffText.Left = results.Left;
        $scope.DiffText.Right = results.Right;
    };
}]);
AngularApp.service("$ui", ["$timeout", function ($timeout)
{
    // When the DOM is ready, call callback.
    this.Ready = function (callback)
    {
        angular.element(document).ready(callback);
    };
}]);
AngularApp.service("diffrHelpers", function ()
{
    var _this = this;

    _this.ProcessHtml = function (htmlText)
    {
        var html = $("<div>" + htmlText + "</div>");
        html.find("br").replaceWith("\n");

        return html.text();
    };

    _this.ParseDiffToHtml = function (diffLines)
    {
        if (diffLines.length === 0)
            return "";

        var html = "";

        for (var i = 0; i < diffLines.length; i++)
        {
            if (i > 0)
                html += "<br>";

            var diffLine = diffLines[i];

            if (diffLine.match === false)
            {
                html += "<span style='color:red'>" + diffLine.text + "</span>";
            }
            else
            {
                html += diffLine.text;
            }
        }

        return html;
    };
});
AngularApp.service("$diffr", ["diffrHelpers", function (diffrHelpers)
{
    var _this = this;

    _this.Diff = function (left, right)
    {
        var leftText = diffrHelpers.ProcessHtml(left);
        var rightText = diffrHelpers.ProcessHtml(right);

        return _this.Differentiate(leftText, rightText);
    };

    _this.Differentiate = function (leftText, rightText)
    {
        var leftLines = _this.GetDiffLines(leftText);
        var rightLines = _this.GetDiffLines(rightText);

        var maxLength = Math.max(leftLines.length, rightLines.length);

        if (maxLength === 0)
            return {
                Left: "",
                Right: ""
            };

        for (var i = 0; i < maxLength; i++)
        {
            var leftLine = leftLines[i];
            var rightLine = rightLines[i];

            // Empty checks
            if (!leftLine)
            {
                rightLine.match = false;
                continue;
            }
            if (!rightLine)
            {
                leftLine.match = false;
                continue;
            }

            // Diff the text on each side
            _this.DiffLine(leftLine, rightLine);
        }

        return {
            Left: diffrHelpers.ParseDiffToHtml(leftLines),
            Right: diffrHelpers.ParseDiffToHtml(rightLines)
        }
    };

    _this.DiffLine = function (leftLine, rightLine)
    {
        if (leftLine.text !== rightLine.text)
        {
            leftLine.match = false;
            rightLine.match = false;
        }
    };

    _this.GetDiffLines = function (text)
    {
        if (!text)
            return [];

        var lines = text.toString().split("\n");
        var diffLines = [];

        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];

            diffLines.push({
                text: line
            });
        }

        return diffLines;
    };
}]);