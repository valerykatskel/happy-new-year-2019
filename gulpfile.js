let gulp = require('gulp'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	javascriptObfuscator = require('gulp-javascript-obfuscator'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

sass.compiler = require('node-sass');

//SCRIPTS
let jsFiles = [
		'./assets/scripts/jquery.js',
		'./assets/scripts/share.js',
		'./assets/scripts/jquery.spritely.js',
		'./assets/scripts/jquery.backgroundPosition.js',
		'./assets/scripts/howler.core.js',
		'./assets/scripts/slot.js'
	],
    jsDest = './dist/scripts';

let config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: false,
    host: 'localhost',
    open: false,
    port: 9000,
    logPrefix: "ny2019"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(javascriptObfuscator({
	        compact:true,
	        sourceMap: true
	    }))
        .pipe(gulp.dest(jsDest))
		.pipe(reload({stream: true}))
});

gulp.task('sass', function () {
  return gulp.src('./assets/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}))
});

gulp.task('images', function() {
	return gulp.src('./assets/images/**/*.{gif,ico,jpg,png,svg}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			pngquant: true
		}))
		.pipe(gulp.dest('./dist/images'))
		//.pipe(reload({stream: true}))
		//.on('end', function(){log.warn('Images task complete'); });
});

gulp.task('fonts', function() {
	return gulp.src('./assets/fonts/*')
		.pipe(gulp.dest('./dist/fonts'))
});

gulp.task('sounds', function() {
	return gulp.src('./assets/audio/*')
		.pipe(gulp.dest('./dist/audio'))
});

//  Clean up!
gulp.task('clean', function() {
	return del([
		'./dist/audio',
		'./dist/css',
		'./dist/fonts',
		'./dist/images',
		'./dist/scripts'
	]);
});


gulp.task('watch', function(){
    watch(['./dist/**/*.html'], function(event, cb) {
        gulp.start('html');
    });
    watch(['./assets/styles/**/*.scss'], function(event, cb) {
        gulp.start('sass');
    });
    watch(['./assets/scripts/**/*.js'], function(event, cb) {
        gulp.start('scripts');
    });
});

gulp.task('html', function () {
    gulp.src('./dist/**/*.html')
        .pipe(reload({stream: true}));
});

//gulp.task('default', gulp.parallel('clean', 'sounds', 'fonts', 'images', 'sass', 'scripts'));

gulp.task('build', ['clean', 'sounds', 'fonts', 'images', 'sass', 'scripts']);
gulp.task('default', ['clean', 'sounds', 'fonts', 'images', 'sass', 'scripts', 'webserver', 'watch']);
