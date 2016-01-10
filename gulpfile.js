'use strict';

var gulp = require('gulp');
var browserslist = require('browserslist');

var autoprefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var livereload = require('gulp-livereload')
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');  
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');  

var browsers = 'last 1 Chrome versions, last 1 Firefox versions, IE >= 9, iOS 9, last 1 ChromeAndroid versions';

gulp.task('server', function () {  
    gulp.src('dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true,
            port:'8080'
        }));
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('images', function() {
    return gulp.src(['src/images/**'])
        .pipe(gulp.dest('dist/images'))
        .pipe(livereload());
});

gulp.task('fonts', function() {
    return gulp.src(['src/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(eslint.format())
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('sass', function () {  
    return gulp.src(['src/scss/*.scss'])
        .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: require('node-neat').includePaths,
                outputStyle: 'compressed', errLogToConsole: true})
                .on('error', sass.logError))
            .pipe(autoprefix({browsers: browsers}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
});

gulp.task('default', [  
    'server', 
    'html',
    'images',
    'fonts',
    'js', 
    'sass',
    'watch' 
]);