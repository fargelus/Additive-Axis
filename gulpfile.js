const gulp = require('gulp');
const connect = require('gulp-connect');

const buildPath = './build';

gulp.task('connect', () => {
  connect.server({
    root: buildPath,
    livereload: true,
  });
});

gulp.task('reload', () => {
  gulp.src(buildPath)
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest(buildPath));
});

gulp.task('css', () => {
  gulp.src('./src/styles/*.css')
    .pipe(gulp.dest(buildPath));
});

gulp.task('js', () => {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest(buildPath));
});

gulp.task('imgs', () => {
  gulp.src('./src/imgs/*')
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy', () => {
  gulp.start('html');
  gulp.start('css');
  gulp.start('js');

  gulp.start('imgs');
});

gulp.task('watch', () => {
  gulp.watch(['./src/index.html'], ['html']);
  gulp.watch(['./src/styles/*.css'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/imgs/*'], ['imgs']);

  gulp.watch(['./build/*'], ['reload']);
});

gulp.task('default', ['connect', 'copy', 'watch']);
