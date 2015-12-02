AngularApp.service("$ui", function ($timeout)
{
    // When the DOM is ready, call callback.
    this.Ready = function (callback)
    {
        angular.element(document).ready(callback);
    };
});