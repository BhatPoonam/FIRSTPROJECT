const { src, dest, watch, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

function minhtml() {
    return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(dest('dist'));a
}

function compilescss () {
    return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/css'))
}

function jsmin() {
    return src('src/js/*.js')
      .pipe(terser())
      .pipe(dest('dist/js'));
  }

  function optimizeimg() {
    return src('src/images/*.svg')
    .pipe(imagemin())
    .pipe(dest('dist/images'))
}

function webpImage() {
    return src('dist/images/*.svg')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}
function copyFonts(){
    return src('src/fonts/*').pipe(gulp.dest('dist/fonts'));
}
function watchtask() {
    watch('src/scss/*.scss', compilescss);
    watch('src/js/*.js', jsmin);
    watch('src/images/*.svg', optimizeimg);
    watch('dist/images/*.svg', webpImage);
}

exports.default = series(
    minhtml,
    compilescss,
    jsmin,
    optimizeimg,
    webpImage,
    copyFonts,
    watchtask
);
gulp.task('default', async  function(){
    console.log("This is default task!");
  });

