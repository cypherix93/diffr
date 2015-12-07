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

    $scope.$watchGroup(["DiffText.Left", "DiffText.Right"], function(newVal)
    {
        var leftText = newVal[0];
        var rightText = newVal[1];

        if(leftText === null || rightText === null)
            return;

        $scope.DiffResults = $diffr.Diff(leftText, rightText);
    });
});