const gulp = require('gulp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const { paths } = require('../gulpfile')

function fonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(ttf2woff())
        .pipe(gulp.dest(paths.fonts.dist))
        .pipe(gulp.src(paths.fonts.src))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(paths.fonts.dist))
}

module.exports = fonts
