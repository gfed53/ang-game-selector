var gulp = require("gulp");
var sass = require("gulp-sass");

//SASS
gulp.task("sass", function(){
	return gulp.src("src/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("src/css"));
});

// Watch task
gulp.task("watch", function(){
	gulp.watch("src/scss/*", ["sass"]);
});

//Default
gulp.task("default", ["sass", "watch"]);