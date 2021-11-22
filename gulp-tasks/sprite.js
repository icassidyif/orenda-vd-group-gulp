const browsersync = require('browser-sync')
const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const { paths } = require('../gulpfile')

function sprite() {
    return gulp
        .src(paths.sprite.src)
        .pipe(svgSprite({ mode: { stack: { sprite: '../sprite.svg' } } }))
        .pipe(gulp.dest(paths.sprite.dist))
        .pipe(browsersync.stream())
}

module.exports = sprite
