var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    mainBowerFiles = require('main-bower-files'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function () {
    return gulp.src(['app/sass/**/*.sass'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
});

gulp.task('concat', ['template'], function () {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('watchSass', function () {
    gulp.watch(['app/sass/**/*.sass'], ['sass']);
});

gulp.task('bowerJs',function(){
    return gulp.src(mainBowerFiles({
        filter:'**/*.js', //css
        paths: {
            bowerDirectory: 'app/bower_components',
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/lib'));
});

gulp.task('template', function () {
    return gulp.src('app/view1/view1.html')
        .pipe(templateCache({module: "myApp"}))
        .pipe(gulp.dest('app/js/template'))
});

gulp.task('default', ['watchSass', 'concat', 'bowerJs']);