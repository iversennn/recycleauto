const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

function css() {
    return src('sass/**/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
}

function img(){
  return src('media/*')
  .pipe(imagemin())
  .pipe(dest('dist/media'))
  .pipe(browserSync.stream())
}

function html(){
  return src('html/**/*.html')
  .pipe(htmlmin())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

function watch(){
  browserSync.init({
    server: {
      baseDir: 'dist/',
    }
  });
  gulp.watch('./html/**/*.html', html);
  gulp.watch('./media/**/*.jpg', img);
  gulp.watch('./sass/**/*.scss', css);
  gulp.watch('html/**/*.html').on('change', browserSync.reload);
}

exports.watch = watch;