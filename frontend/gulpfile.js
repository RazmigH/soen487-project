var gulp = require('gulp')

//general
var concat = require('gulp-concat')
var rename = require("gulp-rename")

//css
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')

var surge = require('gulp-surge')
var clean = require('gulp-clean');
var replace = require('gulp-replace')


gulp.task('default', ['css', 'js'], function() {})


gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('css', function () {
	//compile sass
	gulp.src('./css/scss/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'))

	//create css bundle
	return gulp.src([
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
		.pipe(gulp.dest('./css'))
})

gulp.task('js', function () {
    // copy bootstrap & jquery js
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/tether/dist/js/tether.min.js',
        './node_modules/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('./js/lib'))
})

gulp.task('build', ['clean', 'css', 'js'], function () {
    return gulp.src([
        'index.html',
        '*css/**/*.css',
        '*js/**/*',
        '*font/**/*'
    ])
        .pipe(gulp.dest('./dist'))
})

gulp.task('rewrite-backend-url', ['build'], function() {
    return gulp.src(['dist/js/app.js'])
        .pipe(replace(/http:\/\/localhost:\d+/g, 'http://soen487-project.herokuapp.com'))
        .pipe(gulp.dest('dist/js/'))
})

gulp.task('deploy', ['rewrite-backend-url'], function () {
	return surge({
		project: './dist',
		domain: 'soen487-project.surge.sh'
	})
})
