var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var connect = require('gulp-connect');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var build = function (dest) {
  gulp.task('clean-' + dest, function () {
    del.sync('dist/**/*');
  })

  gulp.task('sass-' + dest, function () {
    gulp.src(['src/scss/froala_blocks.scss'])
      .pipe(sass())
      .pipe(gulp.dest(dest + '/css'))
    gulp.src(['src/scss/custom.scss'])
      .pipe(sass())
      .pipe(gulp.dest(dest + '/css'))
  });

  gulp.task('html-' + dest, function () {
    gulp.src(['src/html/**/index.html'])
      .pipe(gulp.dest(dest))
  })

  gulp.task('imgs-' + dest, function () {
    gulp.src(['src/imgs/**/*'])
      .pipe(gulp.dest(dest + '/imgs'))
  })

  gulp.task('proteam-' + dest, function () {
    gulp.src(['src/proteam/**/*'])
      .pipe(gulp.dest(dest + '/proteam'))
  })
}

build('demo');
build('dist');

gulp.task('connect', function () {
  connect.server({
    root: ['demo', 'node_modules', 'screenshots'],
    port: 8001,
    livereload: true
  });
});


gulp.task('watch', [], function () {
  watch('dist').pipe(connect.reload());
  watch('src/html', function () {
    gulp.start(['html-demo']);
  })
  watch('src/imgs', function () {
    gulp.start(['imgs-demo']);
  })
  watch('src/scss', function () {
    gulp.start(['sass-demo']);
  });
})

gulp.task('dist', ['clean-dist', 'html-dist', 'imgs-dist', 'sass-dist', 'proteam-dist']);

gulp.task('default', ['clean-demo', 'html-demo', 'imgs-demo', 'sass-demo', 'connect', 'watch']);
