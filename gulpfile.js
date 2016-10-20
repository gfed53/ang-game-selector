var gulp = require('gulp');

var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var ngAnnotate = require('gulp-ng-annotate');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var usemin = require('gulp-usemin');
var del = require('del');

var paths = {
	scripts: 'src/**/*.js',
	html: [
	'./src/**/*.html',
	'!./src/index.html'
	],
	scss: './src/scss/*.scss',
	css: './src/css',
	index: './src/index.html',
	dist: './dist/'
};

// JavaScript linting
gulp.task('jshint', function(){
	return gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

//SASS
gulp.task('sass', function(){
	return gulp.src(paths.scss)
	.pipe(sass())
	.pipe(gulp.dest('src/css'));
});

// Watch task
gulp.task('watch', function(){
	gulp.watch(paths.scripts, ['jshint']);
	gulp.watch(paths.scss, ['sass']);
});

// Build
gulp.task('clean', function(){
	del(paths.build);
});

gulp.task('copy', [ 'clean' ], function() {
	gulp.src( paths.html )
	.pipe(gulp.dest('dist/'));
});

gulp.task('usemin', [ 'copy' ], function(){
	gulp.src( paths.index )
	.pipe(usemin({
		css: [ cleanCSS() ],
		js: [ ngAnnotate(), uglify() ]
	}))
	.pipe(gulp.dest( paths.dist ))
});

gulp.task('build', ['usemin']);

//Default
gulp.task('default', ['sass', 'jshint', 'watch']);


