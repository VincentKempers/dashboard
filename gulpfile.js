'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleancss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    browserify = require('gulp-browserify'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename');

gulp.task("minifyScript", function(ms) {
  pump([
      gulp.src("build/js/index.js"),
      browserify(),
      uglify(),
      rename("index.js"),
      gulp.dest("./site/js")
    ],
    ms
  );
});

gulp.task("css", function(ms) {
  pump([
      gulp.src("build/css/index.css"),
      cleancss(),
      rename("index.css"),
      gulp.dest("./site/css")
    ],
    ms
  );
});

gulp.task('htmltask', function(){
  return gulp.src(['./build/*.html'])
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest('./site'));
});

gulp.task('watch', ['minifyScript','css', "htmltask"], function (done) {
    browserSync.reload();
    done();
});



gulp.task("browser-sync",function(){
  browserSync.init({
    server:{
      baseDir:"./build"
    }
  })
})

gulp.task("prod", [
  "minifyScript",
  "css"
], function() {
  console.log("this is the default task!")
})

gulp.task("dev", [
  "browser-sync"
], function() {
  gulp.watch(["build/js/*.js","build/css/*.css","build/*.html"], ['watch']);
  console.log("happy coding!")
})
