const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function watch() {
  style();
  browserSync.init({
    server: {
      baseDir: "./",
      index: "./intro.html",
    },
    startPath: "./intro.html",
  });
  gulp.watch("src/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
