(function(){
	angular
	.module('myApp')
	.controller('MenuCtrl', ['$rootScope', '$state', MenuCtrl])

	function MenuCtrl($rootScope, $state){
		let vm = this;

		//Used since AM doesn't have a 'ui-sref-active' feature
		setActive();

		function setActive(){
			vm.currentNavItem = $state.current.name;
		}

	}
})();