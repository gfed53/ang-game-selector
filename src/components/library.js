// jshint esversion: 6

(function(){
	angular.module('myApp')
	.constant('IGDB_PLATFORMS', '../lib/platforms.json')
	.constant('IGDB_GENRES', '../lib/genres.json')
	.factory('agsSelectRand', agsSelectRand)
	.factory('agsIgdbAPI', ['$http', '$q', 'agsInitLogin', agsIgdbAPI])
	.factory('agsIgdbPlatforms', ['$http', '$q', 'agsInitLogin', 'IGDB_PLATFORMS', agsIgdbPlatforms])
	.factory('agsIgdbGenres', ['$http', '$q', 'agsInitLogin', 'IGDB_GENRES', agsIgdbGenres])
	.factory('agsScrollTo', ['$location', '$anchorScroll', agsScrollTo])
	.service('agsInitLogin', ['$http', '$q', '$state', agsInitLogin])
	.service('agsResult', [agsResult]);

	//Our random selector.
	function agsSelectRand(){
		return function(){
			const SERVICES = {
				get: get
			};

			function get(array){
				if(!array || array.length === 0){
					const ERROR = {
						ERROR: true
					};

					return ERROR;
				} else {
					return array[Math.floor(Math.random()*array.length)];
				}
			}

			return SERVICES;

		};
	}

	//Factory used to retrieve our list of games based on filters, before randomly selecting one - our end result
	function agsIgdbAPI($http, $q, agsInitLogin){
		return function(){
			const SERVICES = {
				get: get
			};

			return SERVICES;

			function get(after, before, platforms, genre, order, rating){
				const URL = 'https://api-2445582011268.apicast.io/games/';
				const PARAMS = {
					fields: '*',
					limit: 50,
					// 'filter[rating][gte]': 60, //bug within API
					'filter[first_release_date][gte]': after,
					'filter[first_release_date][lte]': before
				};
				if(platforms){
					PARAMS['filter[release_dates.platform][eq]'] = platforms;
				}
				if(genre){
					PARAMS['filter[genres][eq]'] = genre;
				}
				if(order){
					// PARAMS['order'] = 'rating:desc';
					PARAMS['order'] = 'popularity:desc';
				}
				if(rating){
					PARAMS['filter[rating][gte]'] = 75;
				}
				// const HEADERS = {
				// 	'user-key': agsInitLogin.apisObj.igdbKey,
				// 	'Accept': 'application/json'
				// };

				// const MOCK_PARAMS = {
				// 	fields: '*',
				// 	limit: 50
				// };

				// console.log('Headers',HEADERS);
				return $http.post('/igdb-api/find-games', PARAMS)
						.then((results) => $q.when(results), (err) => { console.log(err); });
			}
		};
	}

	//Retrieve our list of platforms from the IGDB API
	//Currently I'm retrieving data from a personalized JSON file so that I can limit unnecessary requests (platforms aren't likely to change that often) and also manipulate the array for the sake of the app (adding an 'Any' option with a null value)   
	function agsIgdbPlatforms($http, $q, agsInitLogin, IGDB_PLATFORMS){
		return function(){
			const SERVICES = {
				get: get,
				getAll: getAll,
				getPlatformsJSON: getPlatformsJSON
			};

			const ANY_OBJ = {
				'name': '--Any--'
			};

			return SERVICES;

			function get(offset){
				const URL = 'https://api-2445582011268.apicast.io/platforms/';
				const PARAMS = {
					fields: '*',
					limit: 50,
					offset: offset
				};
				const HEADERS = {
					'user-key': agsInitLogin.apisObj.igdbKey,
					'Accept': 'application/json'
				};
				return $http({
					method: 'GET',
					url: URL,
					params: PARAMS,
					headers: HEADERS
				})
				.then((results) => $q.when(results));
			}

			function getAll(){
				const deferred = $q.defer();
				let first,
				merged;
				get(0)
				.then((results) => {
					first = results.data;
					// console.log(first);
					return first;
				})
				.then((first) => {
					get(50)
					.then((results) => {
						const second = results.data;
						merged = first.concat(second);
						return merged;
					})
					.then((merged) => {
						get(100)
						.then((results) => {
							// console.log(results);
							const THIRD = results.data;
							merged = merged.concat(THIRD);
							merged.push(ANY_OBJ);
							deferred.resolve(merged);
						});
					});
				});
				return deferred.promise;
			}

			//This is currently what's being used
			function getPlatformsJSON(){
				return $http.get(IGDB_PLATFORMS)
				.then((results) => $q.when(results));
			}
		};
	}

	//Retrieve our list of genres from the IGDB API
	//Currently I'm retrieving data from a personalized JSON file so that I can limit unnecessary requests (genres aren't likely to change that often) and also manipulate the array for the sake of the app (adding an 'Any' option with a null value)
	function agsIgdbGenres($http, $q, agsInitLogin, IGDB_GENRES){
		return function(){
			const SERVICES = {
				get: get,
				getGenresJSON: getGenresJSON
			};

			const ANY_OBJ = {
				'name': '--Any--'
			};

			return SERVICES;

			function get(offset){
				const URL = 'https://api-2445582011268.apicast.io/genres/';
				const PARAMS = {
					fields: '*',
					limit: 50,
					offset: offset
				};
				const HEADERS = {
					'user-key': agsInitLogin.apisObj.igdbKey,
					'Accept': 'application/json'
				};
				return $http({
					method: 'GET',
					url: URL,
					params: PARAMS,
					headers: HEADERS
				})
				.then((results) => $q.when(results));
			}

			//This is currently what's being used
			function getGenresJSON(){
				return $http.get(IGDB_GENRES)
				.then((results) => {
					// console.log(results);
					results.data.push(ANY_OBJ);
					return $q.when(results);
				});
			}


		};
	}

	//Auto scroll to answer section on submission
	function agsScrollTo($location, $anchorScroll){
		return function(scrollLocation){
			const SERVICES = {
				scrollToElement: scrollToElement,
				checkScrollBtnStatus: checkScrollBtnStatus
			};

			return SERVICES;

			function scrollToElement(scrollLocation){
				const ELEMENT = document.getElementById(scrollLocation);
				if(ELEMENT){
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
		};
	}

	// Remove this...
	function agsInitLogin($http, $q, $state){
		this.init = init;

		function init(){
			let deferred = $q.defer();
			initKeys()
			.then((data)=> {
				this.apisObj = data;
				deferred.resolve();
			});

			return deferred.promise;
		}

		function initKeys(){
			return $http.get('/access')
					.then((res) => {
						return res.data;
					});
		}
	}

	function agsResult(){
		var result = null;
		this.get = get;
		this.set = set;

		function get(){
			return result;
		}

		function set(_result){
			result = _result;
		}
	}

})();