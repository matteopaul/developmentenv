var gulp          = require('gulp'),
    sass          = require('gulp-sass')
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    inject        = require('gulp-inject'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    plumber       = require('gulp-plumber'),
    babel         = require('gulp-babel'),
    browserify    = require('gulp-browserify'),
    clean         = require('gulp-clean'),
    sourcemaps    = require('gulp-sourcemaps'),
    htmlmin       = require('gulp-html-minifier'),
    browserSync   = require('browser-sync'),
    util          = require('gulp-util');

const src   =   "./src/",
      dist  =   "./dist/";

gulp.task('html', function() {
  gulp.src(dist + '*.html', {force: true})
      .pipe(clean());
  gulp.src(src + '*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(dist));
})

gulp.task('js', function(){
  gulp.src(src + 'assets/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat('global.js'))
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(browserify())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dist + 'assets/js'))
});


gulp.task('sass', function() {
  gulp.src(src + 'assets/sass/*.sass')
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(rename({basename: 'style'}))
      .pipe(cleanCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dist + 'assets/css'));
})


gulp.task('default', function() {
  gulp.watch(src + '*.html', gulp.series('html'));
  gulp.watch(src + 'assets/sass/*.sass', gulp.series('sass'));
  gulp.watch(src + 'assets/js/*.js', gulp.series('js'));
})
