const browsersync = require('browser-sync')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const prettify = require('gulp-format-html')
const pug = require('gulp-pug')
const replace = require('gulp-replace')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

function views() {
    return gulp
        .src(paths.views.src)
        .pipe(pug())
        .pipe(prettify({ indent_char: ' ', indent_size: 4 }))
        .pipe(gulpIf(isProduction, replace('main.css', 'main.min.css')))
        .pipe(gulpIf(isProduction, replace('index.js', 'index.min.js')))
        .pipe(gulpIf(isProduction, replace('vendor.js', 'vendor.min.js')))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream())
}

module.exports = views
