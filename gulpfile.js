const gulp = require('gulp'); 
const minify = require('gulp-minify'); 
const concat = require('gulp-concat');
const gulpRollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
const watch = require('gulp-watch');
const path = require('path');

const year = new Date().getFullYear();
const pkg = require(path.resolve(__dirname, 'package.json'));
const banner =
`/*!
  * CrumbsJS v${pkg.version}
  * ${pkg.homepage}
  * Copyright 2018 - ${year}, ${pkg.author}
  * Licensed under MIT (https://github.com/nirtz89/crumbsjs/blob/master/LICENSE)
  */`;

gulp.task('compress', function() {
  gulp.src(['src/*.js'])
    .pipe(gulpRollup({
      input: './src/crumbs.js',
      output: {
        banner,
        file: './dist/crumbs.js',
        format: 'umd',
        name: 'crumbs'
      },
      plugins: [
        babel({
          exclude: 'node_modules/**'
        })
      ]
    }))
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