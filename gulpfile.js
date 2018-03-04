'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleancss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    browserify = require('gulp-browserify'),
    del = require('del'),
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

gulp.task("clean", function(){
  del("dist");
});


gulp.task("prod", [
  "minifyScript",
  "css",
  "htmltask",
  "clean"
], function() {
  return gulp.src(["site/css/index.css","site/js/index.js", "site/index.html","site/imgs/**","site/fonts/**"], {base:"./"})
  .pipe(gulp.dest('dist'));
  console.log("ready to go live baby!")
});

gulp.task("dev", [
  "browser-sync"
], function() {
  gulp.watch(["build/js/*.js","build/css/*.css","build/*.html"], ['watch']);
  console.log("happy coding!")
});
