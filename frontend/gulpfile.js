var gulp = require('gulp');

//general
var concat = require('gulp-concat');
var rename = require("gulp-rename");

//css
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');


gulp.task('default', ['css', 'js'], function() {});

gulp.task('css', function(){
	//compile sass
	gulp.src('./css/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));

	//create css bundle
	gulp.src([
		'./node_modules/reset-css/reset.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/tether/dist/css/tether.min.css',
		'./node_modules/weather-icons/css/weather-icons.min.css',
		'./css/styles.css'
    ])
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


gulp.task('js', function(){
    // copy bootstrap & jquery js
    gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/tether/dist/js/tether.min.js',
        './node_modules/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('./js/lib'));
});