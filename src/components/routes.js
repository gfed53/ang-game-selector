// jshint esversion: 6

(function(){
	angular
	.module('myApp')

	.config(['$stateProvider', '$urlRouterProvider', routerConfig])

	function routerConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('home')
		const MY_ROOT = {
			name: 'root',
			url: '/',
			views: {
				'header': {
					templateUrl: './partials/header/header.html',
					controller: 'HeaderCtrl',
					controllerAs: 'header'
				},
				'content': {
					templateUrl: './partials/content/content.html'
				},
				'menu@root': {
					templateUrl: './partials/header/menu/menu.html',
					controller: 'MenuCtrl',
					controllerAs: 'menu'
				}
			}
		},
		ABOUT = {
			name: 'about',
			url: 'about',
			parent: 'root',
			views: {
				'content@': {
					templateUrl: './partials/about/about.html',
					controller: 'AboutCtrl',
					controllerAs: 'about'
				}
			}
		},
		HOME = {
			name: 'home',
			url: 'home',
			parent: 'root',
			views: {
				'content@': {
					templateUrl: './partials/questions/questions.html',
					controller: 'QuestionsCtrl',
					controllerAs: 'questions'
				}
			}
		};

		$stateProvider
		.state(MY_ROOT)
		.state(ABOUT)
		.state(HOME)
	}

})();