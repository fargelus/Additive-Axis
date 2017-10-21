const gulp = require('gulp');
const connect = require('gulp-connect');

// ************ Browserify setup *****************
const browserify = require('browserify');
const watchify = require('watchify');
const assign = require('lodash.assign');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');

const browserifyOptions = {
  entries: ['./src/js/app.js'],
  debug: true,
};

const opts = assign({}, watchify.args, browserifyOptions);
const b = watchify(browserify(opts));
const buildPath = './build';

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
}

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);
// ***************** End of browserify setup *****************

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

gulp.task('imgs', () => {
  gulp.src('./src/imgs/*')
    .pipe(gulp.dest(buildPath));
});

gulp.task('copy', () => {
  gulp.start('html');
  gulp.start('css');

  // bundle js files
  gulp.start('js');

  gulp.start('imgs');
});

gulp.task('watch', () => {
  gulp.watch(['./src/index.html'], ['html']);
  gulp.watch(['./src/styles/*.css'], ['css']);
  gulp.watch(['./src/imgs/*'], ['imgs']);

  gulp.watch(['./build/*'], ['reload']);
});

gulp.task('default', ['connect', 'copy', 'watch']);
