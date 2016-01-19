'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const gutil = require('gulp-util');
const stylishJscs = require('jscs-stylish');

const sourceFiles = ['lib/*.js'];
const testSourceFiles = ['test/*.js'];
const allSourceFiles = sourceFiles.concat(testSourceFiles);

gulp.task('test', function (done) {

  gulp.src(sourceFiles)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      return gulp.src(testSourceFiles)
        .pipe(mocha())
        .on('error', gutil.log)
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 50
          }
        })) // Enforce a coverage of at least 100%
        .on('end', done);

    })
    .on('error', gutil.log);
});

gulp.task('style', function () {

  return gulp.src(allSourceFiles)
    .pipe(jscs())
    .pipe(jscs.reporter(stylishJscs.path))
    .pipe(jscs.reporter('fail'));
});

gulp.task('lint', function () {

  return gulp.src(allSourceFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['test', 'lint', 'style']);
