(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', 'agsSeeker', QuestionsCtrl])

	function QuestionsCtrl(agsGames, agsSeeker){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;

		agsGames().get()
		.then(function(results){
			vm.list = results.data;
			// console.log(vm.list);
		});

		function GameChoice(genre, yearRange){
			this.genre = genre;
			this.yearRange = yearRange;
		};

		var current = new GameChoice('RPG', [1981,1990]);

		function set(genre, _yearRange_){
			yearRange = JSON.parse(_yearRange_);
			vm.obj = new GameChoice(genre, yearRange);
			// console.log(vm.obj);
		}

		function submit(genre, _yearRange_){
			vm.set(genre, _yearRange_);
			vm.seeker = new agsSeeker();
			vm.selection = vm.seeker.seek(vm.obj, vm.list);
			console.log(vm.selection);
		}
	}
})();