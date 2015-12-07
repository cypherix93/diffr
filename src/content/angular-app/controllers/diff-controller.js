AngularApp.controller("DiffCtrl", function($scope)
{
    $scope.DiffLeft = "";
    $scope.DiffRight = "";

    $scope.DiffLeftData = [];
    $scope.DiffRightData = [];

    $scope.$watch("DiffLeft", function(newVal)
    {
        if(newVal === null)
            return;

        $scope.DiffLeftData = newVal.toString().split("<br>");
    });
    $scope.$watch("DiffRight", function(newVal)
    {
        if(newVal === null)
            return;

        $scope.DiffRightData = newVal.toString().split("<br>");
    });
});