const gulp = require('gulp'); 
const minify = require('gulp-minify'); 
const concat = require('gulp-concat'); 
const watch = require('gulp-watch');

gulp.task('compress', function() {
  gulp.src(['src/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('test', function() {
  return gulp.src(['./src/crumbs.js', 'crumbs.tests.js'])
    .pipe(concat('crumbs.test.js'))
    .pipe(gulp.dest('./test/'));
});

gulp.task('stream', function() {
  return gulp.watch(['crumbs.tests.js','src/crumbs.js'], function() {
      gulp.start('test');
      gulp.start('compress');
  });
});