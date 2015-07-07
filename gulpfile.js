var
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  serve = require('gulp-serve')

gulp.task('serve', serve({
  root: ['./'],
  port: 3000
}));

gulp.task('js', function() {
  gulp.src('./src/js/duang.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
})

gulp.task('html', function() {
  gulp.src('./src/jade/index.jade')
    .pipe(jade({
      locals: {
        buildTime: new Date().getTime()
      }
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('css', function() {
  gulp.src('./src/scss/duang.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', function() {
  gulp.watch('./src/jade/index.jade', ['html'])
  gulp.watch('./src/scss/*.scss', ['css'])
  gulp.watch('./src/js/duang.js', ['js'])
})

gulp.task('build', ['js', 'css', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])