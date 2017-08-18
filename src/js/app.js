// jshint esversion: 6

(function(){
	angular
	.module('myApp', ['ngAnimate', 'ui.router', 'ngMaterial'])

	.config(['$httpProvider', '$mdThemingProvider', function($httpProvider, $mdThemingProvider){
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
    		.accentPalette('deep-orange');
	}])

	.run(['agsInitLogin', (agsInitLogin)=>{
		agsInitLogin.init()
			.then(()=>{
				//Do nothing
				console.log('apisObj',agsInitLogin.apisObj);
			});
	}]);
})();