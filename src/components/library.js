(function(){
	angular.module('myApp')
	.constant('IGDB_PLATFORMS', '../lib/platforms.json')
	.constant('IGDB_GENRES', '../lib/genres.json')
	.factory('agsSelectRand', agsSelectRand)
	.factory('agsIgdbAPI', ['$http', '$q', agsIgdbAPI])
	.factory('agsIgdbPlatforms', ['$http', '$q', 'IGDB_PLATFORMS', agsIgdbPlatforms])
	.factory('agsIgdbGenres', ['$http', '$q', 'IGDB_GENRES', agsIgdbGenres])
	.factory('agsScrollTo', ['$location', '$anchorScroll', agsScrollTo])

	//Our random selector.
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
			}

			return services;

		}
	}

	//Factory used to retrieve our list of games based on filters, before randomly selecting one - our end result
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
					// 'filter[rating][gte]': 60, bug within API
					'filter[first_release_date][gte]': after,
					'filter[first_release_date][lte]': before
				};
				if(platforms){
					params['filter[release_dates.platform][eq]'] = platforms;
				}
				if(genre){
					params['filter[genres][eq]'] = genre;
				}
				if(order){
					// params['order'] = 'rating:desc';
					params['order'] = 'popularity:desc';
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

	//Retrieve our list of platforms from the IGDB API
	//Currently I'm retrieving data from a personalized JSON file so that I can limit unnecessary requests (platforms aren't likely to change that often) and also manipulate the array for the sake of the app (adding an "Any" option with a null value)   
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
					// console.log(first);
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
							// console.log(results);
							var third = results.data;
							merged = merged.concat(third);
							merged.push(anyObj);
							deferred.resolve(merged);
						});
					});
				});
				return deferred.promise;
			}

			//This is currently what's being used
			function getPlatformsJSON(){
				return $http.get(IGDB_PLATFORMS)
				.then(function(results){
					// console.log(results);
					return $q.when(results);
				});
			}
		}
	}

	//Retrieve our list of genres from the IGDB API
	//Currently I'm retrieving data from a personalized JSON file so that I can limit unnecessary requests (genres aren't likely to change that often) and also manipulate the array for the sake of the app (adding an "Any" option with a null value)
	function agsIgdbGenres($http, $q, IGDB_GENRES){
		return function(){
			var services = {
				get: get,
				getGenresJSON: getGenresJSON
			};

			var anyObj = {
				'name': '--Any--'
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

			//This is currently what's being used
			function getGenresJSON(){
				return $http.get(IGDB_GENRES)
				.then(function(results){
					// console.log(results);
					results.data.push(anyObj);
					return $q.when(results);
				});
			}


		}
	}

	//Auto scroll to answer section on submission
	function agsScrollTo($location, $anchorScroll){
		return function(scrollLocation){
			var services = {
				scrollToElement: scrollToElement,
				checkScrollBtnStatus: checkScrollBtnStatus
			}

			return services;

			function scrollToElement(scrollLocation){
				var element = document.getElementById(scrollLocation);
				if(element){
					$location.hash(scrollLocation);
					$anchorScroll();
				} else {
					window.scroll(0, 0);
				}
			}

			function checkScrollBtnStatus(){
				if(window.scrollY > 100){
					return true;
				} else {
					return false;
				}
			}	
		}
	}

})();