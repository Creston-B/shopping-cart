const { src, dest, series, parallel } = require("gulp");
const cssnano = require("cssnano");
const postcss = require ("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const terser = require("gulp-terser");
const concat = require("gulp-concat");

function htmlTask () {
  return (src(`src/*.html`))
  .pipe(dest(`./dist`));
}

function stylesTask () {
  return (src(`src/css/*.css`))
  .pipe(sourcemaps.init())
  .pipe(postcss([cssnano()]))
  .pipe(sourcemaps.write())
  .pipe(concat(`all.css`))
  .pipe(dest(`dist/css`));
}

function fontsTask () {
  return (src(`src/fonts/*`))
  .pipe(dest(`dist/fonts`));
}

function scriptsTask () {
  return (src(`src/js/*.js`))
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write())
  .pipe(concat(`all.js`))
  .pipe(dest(`dist/js`));
}

function imagesTask () {
  return (src(`src/images/*`))
  .pipe(imagemin())
  .pipe(dest(`dist/images`));
}

exports.html=htmlTask;
exports.images=imagesTask;
exports.fonts=fontsTask;
exports.styles=stylesTask;
exports.scripts=scriptsTask;

exports.default=series(htmlTask, parallel(scriptsTask, imagesTask, stylesTask, fontsTask));