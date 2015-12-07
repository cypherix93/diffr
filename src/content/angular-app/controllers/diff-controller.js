AngularApp.controller("DiffCtrl", function($scope, $diffr)
{
    $scope.DiffText = {
        Left: "",
        Right: ""
    };

    $scope.$watchGroup(["DiffText.Left", "DiffText.Right"], function(newVal)
    {
        var leftText = newVal[0];
        var rightText = newVal[1];

        if(leftText === null || rightText === null)
            return;

        var diffResult = $diffr.Diff(leftText, rightText);

        newVal[0] = diffResult.left;
        newVal[1] = diffResult.right;
    });
});