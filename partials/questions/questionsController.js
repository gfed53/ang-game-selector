(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', 'agsSeeker', 'agsGiantBombAPI', 'agsSearchOptions', 'agsSelectRand', QuestionsCtrl])

	function QuestionsCtrl(agsGames, agsSeeker, agsGiantBombAPI, agsSearchOptions, agsSelectRand){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		vm.genres = agsSearchOptions().getGenres();
		vm.decades = agsSearchOptions().getDecades();
		// console.log(vm.decades);

		vm.genre = vm.genres[0];
		vm.yearRange = vm.decades[0];

		agsGames().get()
		.then(function(results){
			vm.list = results.data;
			// console.log(vm.list);
		});

		// agsGiantBombAPI().get()
		// .then(function(results){
		// 	vm.game = results;
		// })

		function GameChoice(genre, yearRange){
			this.genre = genre;
			this.yearRange = yearRange;
		};

		var current = new GameChoice('RPG', [1981,1990]);

		function set(genre, _yearRange_){
			console.log(_yearRange_);
			// yearRange = JSON.parse(_yearRange_);
			vm.obj = new GameChoice(genre, _yearRange_);
			// console.log(vm.obj);
		}

		function submit(genre, _yearRange_){
			vm.set(genre, _yearRange_);
			vm.seeker = new agsSeeker();
			vm.selection = vm.seeker.seek(vm.obj, vm.list);
			console.log(vm.selection);
			vm.game = agsSelectRand().get(vm.selection);
			console.log(vm.game);
		}
	}
})();