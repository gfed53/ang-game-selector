(function(){
	angular.module('myApp')
	.constant('AGS_GAMES_JSON_FILE', './games.json')
	.factory('agsGames', ['$http', '$q', 'AGS_GAMES_JSON_FILE', agsGames])
	.factory('agsSeeker', agsSeeker)
	.factory('agsGiantBombAPI', ['$http', '$q', agsGiantBombAPI])
	.factory('agsSearchOptions', agsSearchOptions)
	.factory('agsSelectRand', agsSelectRand)
	.factory('agsModifyDates', agsModifyDates)
	.factory('agsIgdbAPI', ['$http', '$q', agsIgdbAPI])

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
				getGenres: getGenres
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

			function getGames(after, before, platforms){
				console.log(platforms);
				if(platforms){
					platforms = 'platforms:'+platforms;
				} else {
					platforms = '';
				}
				var url = 'http://www.giantbomb.com/api/games';
				var params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json',
					filter: 'original_release_date:'+after+'|'+before,
					platforms: [121,19],
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

			//To get back a list of all the genre values. Maybe will make my own stored array, or I'll invoke this on page load.
			function getGenres(){
				var url = 'http://www.giantbomb.com/api/genres',
				params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'json'
				}
				return get2(url, params);
			}
		};
	}

	//This is just for the mock JSON list of games I added. Probably won't be implemented, but holding on JIC.
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

	//Are random selector.
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

	//Service to modify the date string format so dates of the selected game can be formatted in the view via Angular's filters.
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

	// Platforms used in the Giant Bomb API request param 
	function agsGbPlatforms(){
		return function(){
			var platforms = [
			{
				id: 121,
				label : 'iPad'
			},{
				id: 19,
				label : 'Sony Playstation 2'
			},{
				id: 42,
				label : 'Sega Saturn'
			},{
				id: 86,
				label : 'XBOX 360 Games Store'
			},{
				id: 88,
				label : 'PlayStation Network (PS3)'
			},{
				id: 94,
				label : 'PC'
			},{
				id: 121,
				label : 'iPad'
			},{
				id: 121,
				label : 'iPad'
			},{
				id: 121,
				label : 'iPad'
			},{
				id: 121,
				label : 'iPad'
			},{
				id: 121,
				label : 'iPad'
			},
			];
		}

		function get(){
			return platforms;
		}

		var services = {
			get: get
		}

		return services;
	}

	//Same essential functionality as Giant Bomb, but using different API. Alterative to possibly be used ITF.
	function agsIgdbAPI($http, $q){
		return function(){
			var services = {
				get: get
			};

			return services;

			function get(){
				var url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/';
				var params = {
					fields: '*',
					// search: 'metroid', //example for now
					'filter[rating][gte]': 80
				};
				var headers = {
					'X-Mashape-Key': 'lJhGgYDDGImshvjLxvrUAo6kuFInp1qmiyVjsnwj9RvWKJTeJA',
					'Accept': 'application/json'
				};
				return $http({
					method: 'GET',
					url: url,
					params: params,
					headers: headers
				})
				.then(function(results){
					console.log(results);
					return $q.when(results);
				});
			}
		}
	}

	// function agsIgdbCodes(){
	// 	var genres = [];

	// 	var 
	// }

})();