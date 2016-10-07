(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', 'agsSeeker', 'agsGiantBombAPI', 'agsSearchOptions', 'agsSelectRand', 'agsModifyDates', 'agsGbPlatforms', 'agsIgdbAPI', 'agsIgdbPlatforms', 'agsIgdbGenres', QuestionsCtrl])

	function QuestionsCtrl(agsGames, agsSeeker, agsGiantBombAPI, agsSearchOptions, agsSelectRand, agsModifyDates, agsGbPlatforms, agsIgdbAPI, agsIgdbPlatforms, agsIgdbGenres){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		vm.submitIgdb = submitIgdb;

		//Getting IGDB Genres
		agsIgdbGenres().getGenresJSON()
		.then(function(results){
			// console.log(results);
			vm.genres = results.data;
		});

		agsIgdbPlatforms().getPlatformsJSON()
		.then(function(results){
			// console.log(results);
			// console.log(platforms);
			vm.platforms = results.data;
		});

		function GameChoice(after, before, platforms, genre){
			this.after = after;
			this.before = before;
			this.platforms = platforms;
			this.genre = genre;
		};

		function set(_after_, _before_, platforms, genre){
			var _after_ = (_after_ || '1971-01-01T04:00:00.000Z');
			var _before_ = (_before_ || Date.now());
			var after = parseInt(moment(_after_).format('x'));
			var before = parseInt(moment(_before_).format('x'));

			vm.obj = new GameChoice(after, before, platforms, genre);
			// console.log(vm.obj);
		}

		function submitIgdb(after, before, platforms, genre){
			console.log(genre);
			vm.set(after, before, platforms, genre);
			vm.isLoading = true;
			agsIgdbAPI().get(vm.obj.after, vm.obj.before, vm.obj.platforms, vm.obj.genre)
			.then(function(results){
				console.log(results);
				vm.isLoading = false;
				vm.igdbGames = results.data;
				// vm.gbGames = agsModifyDates(vm.gbGames);
				console.log(vm.igdbGames);			
				vm.game = agsSelectRand().get(vm.igdbGames);
				console.log(vm.game);
			});
		}
	}
})();