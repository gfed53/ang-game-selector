(function(){
	angular
	.module('myApp')
	.controller('MenuCtrl', ['$rootScope', '$state', MenuCtrl])

	function MenuCtrl($rootScope, $state){
		// console.log('menu');
		var vm = this;
		// vm.isActive = isActive;

		console.log($state.current.name);

		//Used since AM doesn't have a 'ui-sref-active' feature
		setActive();

		function setActive(){
			vm.currentNavItem = $state.current.name;
		}

	}
})();