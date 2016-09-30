(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', 'agsSeeker', 'agsGiantBombAPI', 'agsSearchOptions', 'agsSelectRand', 'agsModifyDates', QuestionsCtrl])

	function QuestionsCtrl(agsGames, agsSeeker, agsGiantBombAPI, agsSearchOptions, agsSelectRand, agsModifyDates){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		vm.genres = agsSearchOptions().getGenres();
		vm.decades = agsSearchOptions().getDecades();
		// console.log(vm.decades);

		vm.genre = vm.genres[0];
		vm.yearRange = vm.decades[0];

		var examp = moment('2016-09-11T04:00:00.000Z');
		examp = examp.format('YYYY-MM-DD HH:mm:ss');

		// console.log(examp);

		// agsGiantBombAPI().getGames()
		// .then(function(results){
		// 	vm.gbGames = results;
		// });

		function GameChoice(after, before, platforms){
			// this.genre = genre;
			this.after = after;
			this.before = before;
			this.platforms = platforms;
		};

		var current = new GameChoice('RPG', [1981,1990]);

		function set(_after_, _before_, platforms){
			var after = moment(_after_).format('YYYY-MM-DD HH:mm:ss');
			var before = moment(_before_).format('YYYY-MM-DD HH:mm:ss');

			vm.obj = new GameChoice(after, before, platforms);
			// console.log(vm.obj);
		}

		//Date format: YYYY-MM-DD HH:mm:ss
		//Examp: 2016-04-14 00:00:00

		// function submit(genre, _yearRange_){
		// 	vm.set(genre, _yearRange_);
		// 	vm.seeker = new agsSeeker();
		// 	vm.selection = vm.seeker.seek(vm.obj, vm.list);
		// 	console.log(vm.selection);
		// 	vm.game = agsSelectRand().get(vm.selection);
		// 	console.log(vm.game);
		// }

		function submit(after, before, platforms){
			vm.set(after, before, platforms);
			vm.isLoading = true;
			agsGiantBombAPI().getGames(vm.obj.after, vm.obj.before, vm.obj.platforms)
			.then(function(results){
				vm.isLoading = false;
				vm.gbGames = results.data.results;
				vm.gbGames = agsModifyDates(vm.gbGames);
				console.log(vm.gbGames);			
				vm.game = agsSelectRand().get(vm.gbGames);
				console.log(vm.game);
			});
		}
	}
})();