(function(){
	angular.module('myApp')
	.constant('AGS_GAMES_JSON_FILE', './games.json')
	.constant('IGDB_PLATFORMS', './platforms.json')
	.constant('IGDB_GENRES', './genres.json')
	.factory('agsGames', ['$http', '$q', 'AGS_GAMES_JSON_FILE', agsGames])
	.factory('agsSeeker', agsSeeker)
	.factory('agsGiantBombAPI', ['$http', '$q', agsGiantBombAPI])
	.factory('agsSearchOptions', agsSearchOptions)
	.factory('agsSelectRand', agsSelectRand)
	.factory('agsModifyDates', agsModifyDates)
	.factory('agsGbPlatforms', agsGbPlatforms)
	.factory('agsIgdbAPI', ['$http', '$q', agsIgdbAPI])
	.factory('agsIgdbPlatforms', ['$http', '$q', 'IGDB_PLATFORMS', agsIgdbPlatforms])
	.factory('agsIgdbGenres', ['$http', '$q', 'IGDB_GENRES', agsIgdbGenres])

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
				getPlatforms: getPlatforms
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

			function getGames(after, before, platform){
				if(platform){
					platform = 'platforms:'+platform;
				} else {
					platform = '';
				}
				var url = 'http://www.giantbomb.com/api/games';
				var params = {
					api_key: '57d4c08afd3b49f21e6d66048c07684b98d0916a',
					format: 'jsonp',
					filter: 'original_release_date:'+after+'|'+before,
					// platforms: [121,19],
					sort: 'number_of_user_reviews:desc',
					json_callback: 'JSON_CALLBACK'
				};
				// Add this for fix
				// if(after && before){
				// 	params.filter = 'original_release_date:'+after+'|'+before;
				// }
				// var headers = {
				// 	'Accept': 'application/json'
				// };

				return $http({
					method: 'JSONP',
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
			function getPlatforms(){
				var url = 'http://www.giantbomb.com/api/platforms',
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
				var date = moment(current.first_release_date, 'x').format();
				current.first_release_date = date;
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
				name: 'iPad'
			},{
				id: 19,
				name: 'Sony Playstation 2'
			},{
				id: 42,
				name: 'Sega Saturn'
			},{
				id: 86,
				name: 'XBOX 360 Games Store'
			},{
				id: 88,
				name: 'PlayStation Network (PS3)'
			},{
				id: 94,
				name: 'PC'
			}
			// {
			// 	id: 121,
			// 	name: 'iPad'
			// },{
			// 	id: 121,
			// 	name: 'iPad'
			// },{
			// 	id: 121,
			// 	name: 'iPad'
			// },{
			// 	id: 121,
			// 	name: 'iPad'
			// },{
			// 	id: 121,
			// 	name: 'iPad'
			// },
			];

			function get(){
				return platforms;
			}

			var services = {
				get: get
			}

			return services;
		}
	}

	//Same essential functionality as Giant Bomb, but using different API. Alterative to possibly be used ITF.
	function agsIgdbAPI($http, $q){
		return function(){
			var services = {
				get: get
			};

			return services;

			function get(after, before, platforms, genre, order, rating){
				var url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/';
				var params = {
					fields: '*',
					limit: 50,
					// search: 'metroid', //example for now
					// order: 'rating:desc',
					// 'filter[rating][gte]': 60,
					'filter[first_release_date][gte]': after,
					'filter[first_release_date][lte]': before
					// 'filter[release_dates.platform][eq]': platforms
				};
				if(platforms){
					params['filter[release_dates.platform][eq]'] = platforms;
				}
				if(genre){
					params['filter[genres][eq]'] = genre;
				}
				if(order){
					params['order'] = 'rating:desc';
				}
				if(rating){
					params['filter[rating][gte]'] = 75;
				}
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
					// console.log(results);
					return $q.when(results);
				});
			}
		}
	}

	function agsIgdbPlatforms($http, $q, IGDB_PLATFORMS){
		return function(){
			var services = {
				get: get,
				getAll: getAll,
				getPlatformsJSON: getPlatformsJSON
			};

			var anyObj = {
				'name': '--Any--'
			};

			return services;

			function get(offset){
				var url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/platforms/';
				var params = {
					fields: '*',
					limit: 50,
					offset: offset
				};
				var headers = {
					'X-Mashape-Key': 'lJhGgYDDGImshvjLxvrUAo6kuFInp1qmiyVjsnwj9RvWKJTeJA'
				};
				return $http({
					method: 'GET',
					url: url,
					params: params,
					headers: headers
				})
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}

			function getAll(){
				var deferred = $q.defer();
				var first,
				merged;
				get(0)
				.then(function(results){
					first = results.data;
					console.log(first);
					return first;
				})
				.then(function(first){
					get(50)
					.then(function(results){
						var second = results.data;
						merged = first.concat(second);
						return merged;
					})
					.then(function(merged){
						get(100)
						.then(function(results){
							console.log(results);
							var third = results.data;
							merged = merged.concat(third);
							merged.push(anyObj);
							deferred.resolve(merged);
						});
					});
				});
				return deferred.promise;
			}

			function getPlatformsJSON(){
				return $http.get(IGDB_PLATFORMS)
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}
		}
	}

	function agsIgdbGenres($http, $q, IGDB_GENRES){
		return function(){
			var services = {
				get: get,
				getAll: getAll,
				getGenresJSON: getGenresJSON
			};

			return services;

			function get(offset){
				var url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/genres/';
				var params = {
					fields: '*',
					limit: 50,
					offset: offset
				};
				var headers = {
					'X-Mashape-Key': 'lJhGgYDDGImshvjLxvrUAo6kuFInp1qmiyVjsnwj9RvWKJTeJA'
				};
				return $http({
					method: 'GET',
					url: url,
					params: params,
					headers: headers
				})
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}

			function getAll(){

			}

			function getGenresJSON(){
				return $http.get(IGDB_GENRES)
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}


		}
	}

})();