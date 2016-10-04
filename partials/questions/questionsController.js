(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', 'agsSeeker', 'agsGiantBombAPI', 'agsSearchOptions', 'agsSelectRand', 'agsModifyDates', 'agsGbPlatforms', 'agsIgdbAPI', 'agsIgdbPlatforms', QuestionsCtrl])

	function QuestionsCtrl(agsGames, agsSeeker, agsGiantBombAPI, agsSearchOptions, agsSelectRand, agsModifyDates, agsGbPlatforms, agsIgdbAPI, agsIgdbPlatforms){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		vm.submitIgdb = submitIgdb;
		vm.genres = agsSearchOptions().getGenres();
		vm.decades = agsSearchOptions().getDecades();
		// console.log(vm.decades);

		//Defaults
		// vm.after = '1971-01-01T04:00:00.000Z';
		// vm.before = Date.now();

		vm.genre = vm.genres[0];

		// console.log(examp);

		// agsGiantBombAPI().getGames()
		// .then(function(results){
		// 	vm.gbGames = results;
		// });

		// agsIgdbAPI().get()
		// .then(function(results){
		// 	console.log(results);
		// });

		// agsGiantBombAPI().getPlatforms()
		// .then(function(results){
		// 	vm.platforms = results.data.results;
		// });


		agsIgdbPlatforms().getAll()
		.then(function(results){
			console.log(results);
			vm.platforms = results;
		});


		// vm.platforms = agsGbPlatforms().get();

		function GameChoice(after, before, platforms){
			// this.genre = genre;
			this.after = after;
			this.before = before;
			this.platforms = platforms;
		};

		//788936400000
		//1475439456000
		// var examp = moment(788936400000);
		// console.log(examp);

		var current = new GameChoice('RPG', [1981,1990]);

		//TODO: Create fallback if no date is present
		function set(_after_, _before_, platforms){
			var _after_ = (_after_ || '1971-01-01T04:00:00.000Z');
			var _before_ = (_before_ || Date.now());
			var after = parseInt(moment(_after_).format('x'));
			var before = parseInt(moment(_before_).format('x'));
			console.log(after);

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

		// function submit(after, before, platforms){
		// 	vm.set(after, before, platforms);
		// 	vm.isLoading = true;
		// 	agsGiantBombAPI().getGames(vm.obj.after, vm.obj.before, vm.obj.platforms)
		// 	.then(function(results){
		// 		console.log(results);
		// 		vm.isLoading = false;
		// 		vm.gbGames = results.data.results;
		// 		vm.gbGames = agsModifyDates(vm.gbGames);
		// 		console.log(vm.gbGames);			
		// 		vm.game = agsSelectRand().get(vm.gbGames);
		// 		console.log(vm.game);
		// 	});
		// }

		function submitIgdb(after, before, platforms){
			vm.set(after, before, platforms);
			vm.isLoading = true;
			agsIgdbAPI().get(vm.obj.after, vm.obj.before, vm.obj.platforms)
			.then(function(results){
				console.log(results);
				vm.isLoading = false;
				vm.gbGames = results.data;
				// vm.gbGames = agsModifyDates(vm.gbGames);
				console.log(vm.gbGames);			
				vm.game = agsSelectRand().get(vm.gbGames);
				console.log(vm.game);
			});
		}
	}
})();