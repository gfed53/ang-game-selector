(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', [QuestionsCtrl])

	function QuestionsCtrl(){
		console.log('Questions');
		var vm = this;
		// vm.genre
		//vm.yearRange
		vm.obj = 
		vm.add = add;
		vm.submit = submit;

		var GameChoice = function(genre, yearRange){
			this.genre = genre;
			this.yearRange = yearRange;
		};

		var current = new GameChoice("RPG", [1981,1990]);

		console.log(current);

		function add(key, value){

		}

		function submit(){
			vm.yearRange = JSON.parse(vm.yearRange);
			console.log(vm.yearRange);
		}
	}
})();