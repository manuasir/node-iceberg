var gulp        = require('gulp'),
watch       = require('gulp-watch'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    moment      = require('moment');

require('gulp-help')(gulp, {
    description: 'Ayuda'
});

gulp.task('compress', 'Concatena y uglyfica todos los javascripts de AngularJS en lib.min.js.', function() {
    gulp.src(['private/angularjs/core/*.js', 'private/angularjs/controllers/*.js'])
        .pipe(concat('app'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('public/dist'))
});


gulp.task('stream', 'Escucha cambios en controladores y librerias', function() {

    watch("private/angularjs/**/*/*.js", function() {
        gulp.start('compress');
    });

});

gulp.task('default', ['stream']);