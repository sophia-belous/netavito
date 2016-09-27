'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const webserver = require('gulp-webserver');

gulp.task('clean', function(){
	return del('app');
});

gulp.task('vendorcss', function(){
	return gulp.src('src/css/vendor/**/*.*')
		.pipe(gulp.dest('app/css/vendor/'))
		.pipe(debug({title: 'vendor'})                                                                                                                                                                                                                                                                                                                                                                                                                        )
});

gulp.task('styles', function(){
	return gulp.src('src/css/main.styl')
		.pipe(sourcemaps.init())
		.pipe(debug({title: 'src'}))
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css/'));

});

gulp.task('img', function (){
	return gulp.src('src/img/**/*.*', {since: gulp.lastRun('img')})
		.pipe(newer('app/img/**/*.*'))
		.pipe(debug({title: 'img'}))
		.pipe(gulp.dest('app/img/'));
});
gulp.task('html', function (){
	return gulp.src('src/**/*.html', {since: gulp.lastRun('html')})
		.pipe(newer('app/'))
		.pipe(gulp.dest('app/'));
});

gulp.task('js', function (){
	return gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(gulp.dest('app/js/'));
});
gulp.task('json', function (){
	return gulp.src('src/json/**/*.json')
		.pipe(jshint())
		.pipe(gulp.dest('app/json/'));
});
gulp.task('webserver', function() {
  gulp.src('app')
  .pipe(webserver({
	port: process.env.PORT || 2020,
    livereload: true,
    open: true
  }));
});

gulp.task('build', gulp.series(
	'clean',
	 gulp.parallel('styles', 'js', 'img', 'json', 'html','vendorcss')
));

gulp.task('watch', function(){
	gulp.watch('src/css/**/*.styl', gulp.series('styles'));
	gulp.watch('src/img/**/*.*', gulp.series('img'));
	gulp.watch('src/**/*.html', gulp.series('html'));
	gulp.watch('src/js/**/*.*', gulp.series('js'));
	gulp.watch('src/json/**/*.json', gulp.series('json'));
});

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch','webserver'))
);