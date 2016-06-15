var mltApp = angular.module("AppMultiversidad",['ngRoute']);

mltApp.controller("EstadoListController", EstadoListController);

mltApp.config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/demo',
        controller: 'EstadoListController'
      });
	}]);



function EstadoListController($scope, $http){
	$scope.estados = [];
	$http.get("/api/estados")
	.success(function(data){
			console.log(data);
			$scope.estados = data;
		})
		.error(function(error){
			console.log(error)
		});
}