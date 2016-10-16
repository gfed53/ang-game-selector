(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['$scope', '$location', '$timeout', 'agsSelectRand', 'agsIgdbAPI', 'agsIgdbPlatforms', 'agsIgdbGenres', 'agsScrollTo', QuestionsCtrl])

	function QuestionsCtrl($scope, $location, $timeout, agsSelectRand, agsIgdbAPI, agsIgdbPlatforms, agsIgdbGenres, agsScrollTo){
		var vm = this;
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		vm.submitIgdb = submitIgdb;
		$location.url('/questions');

		//Getting IGDB Genres
		agsIgdbGenres().getGenresJSON()
		.then(function(results){
			vm.genres = results.data;
		});

		agsIgdbPlatforms().getPlatformsJSON()
		.then(function(results){
			vm.platforms = results.data;
		});

		function RangeChoice(after, before){
			this.after = after;
			this.before = before;
		};

		//Adjust the date syntax through an object constructor
		function set(_after_, _before_){
			var _after_ = (_after_ || '1971-01-01T04:00:00.000Z');
			var _before_ = (_before_ || Date.now());
			var after = parseInt(moment(_after_).format('x'));
			var before = parseInt(moment(_before_).format('x'));

			vm.rangeObj = new RangeChoice(after, before);
		}

		function submitIgdb(after, before, platform, genre, order, rating){
			vm.set(after, before);
			vm.isLoading = true;
			agsScrollTo().scrollToElement('answer-container');
			agsIgdbAPI().get(vm.rangeObj.after, vm.rangeObj.before, platform, genre, order, rating)
			.then(function(results){
				console.log(results);
				vm.isLoading = false;
				vm.igdbGames = results.data;
				console.log(vm.igdbGames);			
				vm.game = agsSelectRand().get(vm.igdbGames);
				console.log(vm.game);
				agsScrollTo().scrollToElement('answer-scroll-point');
			});
		}
	}
})();