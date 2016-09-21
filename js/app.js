(function(){
	angular
	.module('myApp', ['ngAnimate', 'ui.router', 'ngMaterial'])

	.config(['$httpProvider', function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
		console.log($httpProvider.defaults.headers);
	}]);
})();