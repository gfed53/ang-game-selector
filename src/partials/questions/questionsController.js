// jshint esversion: 6

(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['$scope', '$location', '$timeout', 'agsSelectRand', 'agsIgdbAPI', 'agsIgdbPlatforms', 'agsIgdbGenres', 'agsScrollTo', 'agsInitLogin', 'agsResult', QuestionsCtrl]);

	function QuestionsCtrl($scope, $location, $timeout, agsSelectRand, agsIgdbAPI, agsIgdbPlatforms, agsIgdbGenres, agsScrollTo, agsInitLogin, agsResult){
		const VM = this;
		VM.set = set;
		VM.submitIgdb = submitIgdb;
		//Limit by popularity checked on by default
		VM.order = true;
		$location.url('/questions');

		//Grabbing potentially-stored game
		VM.game = agsResult.get();

		//Getting IGDB Genres
		agsIgdbGenres().getGenresJSON()
		.then((results) => {
			VM.genres = results.data;
		});

		agsIgdbPlatforms().getPlatformsJSON()
		.then((results) => {
			VM.platforms = results.data;
		});

		function RangeChoice(after, before){
			this.after = after;
			this.before = before;
		}

		//Adjust the date syntax through an object constructor
		function set(_after_, _before_){
			_after_ = (_after_ || '1971-01-01T04:00:00.000Z');
			_before_ = (_before_ || Date.now());
			const AFTER = parseInt(moment(_after_).format('x'));
			const BEFORE = parseInt(moment(_before_).format('x'));

			VM.rangeObj = new RangeChoice(AFTER, BEFORE);
		}

		function submitIgdb(after, before, platform, genre, order, rating){
			VM.set(after, before);
			VM.isLoading = true;
			agsScrollTo().scrollToElement('answer-container');
			agsIgdbAPI().get(VM.rangeObj.after, VM.rangeObj.before, platform, genre, order, rating)
			.then((results) => {
				VM.isLoading = false;
				VM.igdbGames = results.data.body;		
				VM.game = agsSelectRand().get(VM.igdbGames);
				agsResult.set(VM.game);
				agsScrollTo().scrollToElement('answer-scroll-point');
			});
		}

		function resetLogInfo(){
			VM.needLogin = true;
		}
	}
})();