(function(){
	angular
	.module('myApp', ['ngAnimate', 'ui.router', 'ngMaterial'])

	.config(['$httpProvider', '$mdThemingProvider', function($httpProvider, $mdThemingProvider){
		$httpProvider.defaults.useXDomain = true;
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
    		.accentPalette('deep-orange');
	}]);
})();