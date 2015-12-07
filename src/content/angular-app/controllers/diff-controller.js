AngularApp.controller("DiffCtrl", function($scope, $diffr)
{
    $scope.DiffText = {
        Left: "",
        Right: ""
    };

    $scope.DiffResults = {
        left: "",
        right: ""
    };

    $scope.Differentiate = function()
    {
        var leftText = $scope.DiffText.Left;
        var rightText = $scope.DiffText.Right;

        if(leftText === null || rightText === null)
            return;

        $scope.DiffResults = $diffr.Diff(leftText, rightText);

        //$scope.DiffText.Left = $scope.DiffResults.Left;
        //$scope.DiffText.Right = $scope.DiffResults.Right;
    };
});