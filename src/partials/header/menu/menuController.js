(function(){
	angular
	.module('myApp')
	.controller('MenuCtrl', ['$rootScope', '$state', MenuCtrl])

	function MenuCtrl($rootScope, $state){
		const VM = this;

		//Used since AM doesn't have a 'ui-sref-active' feature
		setActive();

		function setActive(){
			VM.currentNavItem = $state.current.name;
		}

	}
})();