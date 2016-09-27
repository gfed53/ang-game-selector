(function(){
	angular.module('myApp')
	.constant('AGS_GAMES_JSON_FILE', './games.json')
	.factory('agsGames', ['$http', '$q', 'AGS_GAMES_JSON_FILE', agsGames])
	.factory('agsSeeker', agsSeeker)
	.factory('agsGiantBombAPI', ['$http', '$q', agsGiantBombAPI])
	.factory('agsSearchOptions', agsSearchOptions)
	.factory('agsSelectRand', agsSelectRand)
	.factory('agsModifyDates', agsModifyDates)

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
					if((list[i].genre === choice.genre || !choice.genre) && choice.yearRange[0] <= list[i].releaseYear && list[i].releaseYear <= choice.yearRange[1]){
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
				get: get,
				getGames: getGames,
				getGame: getGame
			};

			return services;

			function get(){
				var url = 'http://www.giantbomb.com/api/search';
				var params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json',
					query: 'metroid', //example for now
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

			function getGames(after, before){
				var url = 'http://www.giantbomb.com/api/games';
				var params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json',
					filter: 'original_release_date:'+after+'|'+before,
					sort: 'number_of_user_reviews:desc'
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

			function get2(url, params){
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

			function getGame(){
				var url = 'http://www.giantbomb.com/api/game',
				params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json',
					name: 'Street Fighter'
				}
				return get2(url, params);
			}
		};
	}

	function agsSearchOptions(){
		return function(){
			var genres = [
			{
				value: 'aRpg',
				label: 'Action RPG' 
			},
			{
				value: 'fighting',
				label: 'Fighting'
			},
			{
				value: 'fps',
				label: 'First Person Shooter'
			},
			{
				value: 'platformer',
				label: 'Platformer'
			},
			{
				value: 'rpg',
				label: 'Role Playing Game'
			}
			],
			decades = [
			{
				value: [1951,2019],
				label: 'Any'
			},
			{
				value: [1971,1980],
				label: '1970\'s'
			},
			{
				value: [1981,1990],
				label: '1980\'s'
			},
			{
				value: [1991,2000],
				label: '1990\'s'
			},
			{
				value: [2001,2010],
				label: '2000\'s'
			},
			{
				value: [2010,2019],
				label: '2010\'s'
			}
			];

			function getGenres(){
				return genres;
			}

			function getDecades(){
				return decades;
			}

			var services = {
				getGenres: getGenres,
				getDecades: getDecades
			};

			return services;
		}
	}

	function agsSelectRand(){
		return function(){
			var services = {
				get: get
			}

			function get(array){
				if(!array || array.length === 0){
					var error = {
						error: true
					};

					return error;
				} else {
					return array[Math.floor(Math.random()*array.length)];
				}	
				// alert(game+"!");
				// console.log(game);
			}

			return services;

		}
	}

	function agsModifyDates(){
		return function(list){
			var updated = [];
			list.forEach(function(current,index,array){
				var date = moment(current.original_release_date, 'YYYY-MM-DD HH:mm:ss').format();
				current.original_release_date = date;
				// console.log(current);
				updated.push(current);
			})

			return updated;
		}
	}


})();