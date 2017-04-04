var gulp = require('gulp');

//general
var concat = require('gulp-concat');
var rename = require("gulp-rename");

//css
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');


gulp.task('default', ['css'], function() {});

gulp.task('css', function(){
	//compile sass
	gulp.src('./css/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));

	//create css bundle
	gulp.src([
		'./css/lib/reset.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./css/lib/weather-icons/weather-icons.min.css',
		'./css/styles.css' ])

		//bundle
		.pipe(concat('bundle.css'))
		//save
		.pipe(gulp.dest('./css'))
		//minify
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({ suffix: '.min'}))
		//save
		.pipe(gulp.dest('./css'));
});