import pkg from 'gulp';
const { src, dest, watch, series } = pkg;
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import connect from 'gulp-connect';

function server() {
  return connect.server({
    root: './dist',
    port: 8000,
    livereload: true,
  });
}

// minify html
function html() {
  return src('./*.html')
    .pipe(connect.reload())
    .pipe(htmlmin())
    .pipe(dest('dist'));
}

// compile, prefix, and min scss
function compilescss() {
  return src('./sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css'))
    .pipe(dest('./css'));
}

// minify js
function jsmin() {
  return src('./js/*.js')
    .pipe(connect.reload())
    .pipe(terser())
    .pipe(dest('dist/js'));
}

// optimize and move images
function optimizeimg() {
  return src('./images/*.{jpg,png,svg}')
    .pipe(connect.reload())
    .pipe(
      imagemin([
        mozjpeg({ quality: 80, progressive: true }),
        optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest('dist/images'));
}

// watchtask
function watchTask() {
  watch('./*.html', html);
  watch('./sass/**/*.scss', compilescss);
  watch('./js/*.js', jsmin);
  watch('./images/*.{jpg,png,svg}', optimizeimg);
}

// Default Gulp task
const _defualt = series(
  html,
  compilescss,
  jsmin,
  optimizeimg,
  watchTask,
  server
);
export { _defualt as default };
