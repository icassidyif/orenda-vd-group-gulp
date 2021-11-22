const browsersync = require('browser-sync')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

const webpackConfig = require('../webpack.config')

webpackConfig.mode = isProduction ? 'production' : 'development'
webpackConfig.devtool = isProduction ? false : 'source-map'

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(
            gulpIf(
                isProduction,
                rename({
                    suffix: '.min',
                }),
            ),
        )
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.scripts.dist))
        .pipe(browsersync.stream())
}

module.exports = scripts
