(function(){
	angular.module('myApp')
	.constant('AGS_GAMES_JSON_FILE', './games.json')
	.factory('agsGames', ['$http', '$q', 'AGS_GAMES_JSON_FILE', agsGames])
	.factory('agsSeeker', agsSeeker)
	.factory('agsGiantBombAPI', ['$http', '$q', agsGiantBombAPI])

	function agsGames($http, $q, AGS_GAMES_JSON_FILE){
		return function(){
			var services = {
				get: get
			};

			return services;

			function get(){
				return $http.get(AGS_GAMES_JSON_FILE)
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}
		}
	}

	function agsSeeker(){
		var Seeker = function(){
			this.seek = seek;

			function seek(choice, list){
				// console.log(choice);
				// console.log(list);
				var selection = [];
				for(var i=0; i<list.length; i++){
					if((list[i].genre === choice.genre || !choice.genre) && choice.yearRange[0] <= list[i].releaseYear && list[i].releaseYear < choice.yearRange[1]){
						selection.push(list[i]);
					}
				}
				return selection;
			}
		}

		return Seeker;
	}

	function agsGiantBombAPI($http, $q){
		return function(){
			var services = {
				get: get
			};

			return services;

			function get(){
				var url = 'http://www.giantbomb.com/api/search';
				var params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json',
					query: 'metroid',
					resources: 'game'
				};
				return $http({
					method: 'GET',
					url: url,
					params: params
				})
				.then(function(results){
					console.log(results);
					return $q.when(results);
				});
			}
		}
	}



})();