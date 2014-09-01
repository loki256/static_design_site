var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var swig = require('gulp-swig');
var cache = require('gulp-cache');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var uglify = require('gulp-uglify');
//var gutil = require('gulp-util');

var releaseMode = false;

var getDestPath = function(path) {
    var dest = 'build';
    if (releaseMode) {
        dest = 'release';
    }
    if (!path) {
        return dest;
    }
    return dest + '/' + path;
};

gulp.task('clean', function() {
    gulp.src(getDestPath('*.html'), {read:false})
    .pipe(clean({force:true}))
});

gulp.task('sass', function() {
    gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest(getDestPath('styles')))
    .pipe(livereload({auto: false}));
});

var projectName = function(arg) {
    return arg + " aaa " + __dirname;
};

var swig_opts = {
    load_json:true,
    ext:".html",
    defaults: {cache:false, locals: { "projectName": projectName }}
};

gulp.task('templates', function() {
    gulp.src('src/templates/**/*.html')
    .pipe(swig(swig_opts))
    .pipe(gulp.dest(getDestPath('public')))
    .pipe(livereload({auto: false}));
});

gulp.task('imagemin', function () {
    gulp.src('src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest(getDestPath('images')));
});


gulp.task('copy_html', function() {
    gulp.src(['src/*.html'])
    .pipe(gulp.dest(getDestPath()))
    .pipe(livereload({auto: false}));
});

gulp.task('copy_fonts', function() {
    gulp.src(['src/fonts/*'])
    .pipe(gulp.dest(getDestPath('fonts')))
});

gulp.task('copy_js', function() {
    gulp.src(['src/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(getDestPath('scripts')))
});

gulp.task('copy', ['copy_html', 'copy_fonts', 'copy_js']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/*.html', ['copy_html']);
    gulp.watch('src/fonts/*', ['copy_fonts']);
    gulp.watch('src/scripts/*', ['copy_js']);
    gulp.watch('src/styles/*.scss', ['sass']);
    gulp.watch('src/images/*', ['imagemin']);
    gulp.watch('src/templates/**/*', ['templates']);
});


gulp.task('bower', function() {
    bower().pipe(gulp.dest(getDestPath('bower_components')))
});

//gulp.task('bower', function() {
//  var jsFilter = gulpFilter('**/*.js')
//  var cssFilter = gulpFilter('**/*.css')
//  return bower()
//    .pipe(jsFilter)
//    .pipe(concat('vendor.js'))
//    .pipe(gulp.dest(dist.js))
//    .pipe(jsFilter.restore())
//    .pipe(cssFilter)
//    .pipe(concat('vendor.css'))
//    .pipe(gulp.dest(dist.css))
//    .pipe(cssFilter.restore())
//    .pipe(rename(function(path) {
//      if (~path.dirname.indexOf('fonts')) {
//        path.dirname = '/fonts'
//      }
//    }))
//    .pipe(gulp.dest(dist.vendor))
//});

gulp.task('enableRelease', function() {
    releaseMode = true;
});

gulp.task('heroku', function() {
    gulp.src(['heroku/*'])
        .pipe(gulp.dest(getDestPath()));
});


gulp.task('default', ['sass', 'templates', 'copy']);
gulp.task('build', ['clean', 'default', 'imagemin', 'bower', 'heroku']);
gulp.task('release', ['enableRelease', 'build']);

