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
		HOME = {
			name: 'home',
			url: 'home',
			parent: 'root',
			views: {
				'content@': {
					templateUrl: './partials/home/home.html',
					controller: 'HomeCtrl',
					controllerAs: 'home'
				}
			}
		},
		QUESTIONS = {
			name: 'questions',
			url: 'questions',
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
		.state(HOME)
		.state(QUESTIONS)
	}

})();