(function(){
	angular
	.module('myApp')
	.controller('HeaderCtrl', [HeaderCtrl])

	function HeaderCtrl(){
		console.log('Header');
	}
})();