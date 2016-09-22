var gulp = require("gulp");
var sass = require("gulp-sass");

//SASS
gulp.task("sass", function(){
	return gulp.src("scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("css"));
});

// Watch task
gulp.task("watch", function(){
	gulp.watch("scss/*", ["sass"]);
});

//Default
gulp.task("default", ["sass", "watch"]);