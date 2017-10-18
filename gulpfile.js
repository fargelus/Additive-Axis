const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('main.js')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['index.html'], ['html']);
  gulp.watch(['main.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);
