AngularApp.controller("DiffCtrl", function ($scope, $sce, $diffr)
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

        //$scope.DiffText.Left = results.Left;
        //$scope.DiffText.Right = results.Right;
    };
});