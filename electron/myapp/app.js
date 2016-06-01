//document.write("The current version is "+process.version)

//alert(process.version)
(function(){
'use strict';
var myapp=angular.module("app",[]);
myapp.controller("SpicyController",['$scope',function($scope){
    $scope.customSpice="wahada";
    $scope.spice='very';

    $scope.spicy=function(spice){
        $scope.spice=spice;
    };
}]);
})();
