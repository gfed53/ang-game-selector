(function(){
	angular.
	module('myApp')
	.controller('QuestionsCtrl', ['agsGames', QuestionsCtrl])

	function QuestionsCtrl(agsGames){
		var vm = this;
		// vm.genre
		//vm.yearRange
		vm.obj;
		vm.set = set;
		vm.submit = submit;
		agsGames().get()
		.then(function(results){
			vm.results = results.data;
			console.log(vm.results);
		});

		function GameChoice(genre, yearRange){
			this.genre = genre;
			this.yearRange = yearRange;
		};

		function Seeker(){
			this.seek = seek;

			function seek(choice, list){
				console.log(choice);
				console.log(list);
				var selection = [];
				for(var i=0; i<list.length; i++){
					console.log(list[i]);
					if(list[i].genre === choice.genre && choice.yearRange[0] <= list[i].releaseYear < choice.yearRange[1]){
						selection.push(list[i]);
					}
				}
				return selection;
			}
		}

		var current = new GameChoice('RPG', [1981,1990]);

		function set(genre, _yearRange_){
			yearRange = JSON.parse(_yearRange_);
			vm.obj = new GameChoice(genre, yearRange);
			console.log(vm.obj);
		}

		function submit(genre, _yearRange_){
			vm.set(genre, _yearRange_);
			vm.seeker = new Seeker();
			vm.selection = vm.seeker.seek(vm.obj, vm.results);
			console.log(vm.selection);
		}
	}
})();