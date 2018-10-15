const gulp = require("gulp"),
  gulpUtil = require("gulp-util"),
  source = require("vinyl-source-stream"),
  browserify = require("browserify"),
  browserSync = require("browser-sync").create(),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  buffer = require('vinyl-buffer');

const currentPrj = "exer01";
console.log("currentPrj ", currentPrj);
if (!currentPrj) {
  console.log("must be specified one project");
  return;
}
function js() {
  var b = browserify({
    entries: `./${currentPrj}/app/js/translatey.js`,
    debug: true
  })
  .transform("babelify", {presets: ["@babel/preset-env"]});

  return (
    b
      .bundle()
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      // .on("error", log.error)
      .pipe(sourcemaps.write(`map`))
      .pipe(gulp.dest(`${currentPrj}/app/js/dist`))
  );
}

function sassFn() {
  return gulp
    .src(`${currentPrj}/app/scss/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest(`./${currentPrj}/app/css`));
}

// Static server
function serve() {
  browserSync.init({
    server: {
      baseDir: `./${currentPrj}`
    }
  });

  gulp.watch(`./${currentPrj}/app/scss/*.scss`, sassFn).on("change", browserSync.reload);
  gulp.watch(`./${currentPrj}/app/*.html`).on("change", browserSync.reload);
  gulp.watch(`./${currentPrj}/app/js/*.js`, js).on("change", browserSync.reload);
}

gulp.task("default", serve);
