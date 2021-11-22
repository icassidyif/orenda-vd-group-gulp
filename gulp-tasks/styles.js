const autoprefixer = require('gulp-autoprefixer')
const browsersync = require('browser-sync')
const groupMedia = require('gulp-group-css-media-queries')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const minify = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const webpcss = require('gulp-webpcss')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulpIf(isProduction, webpcss()))
        .pipe(gulpIf(isProduction, groupMedia()))
        .pipe(
            gulpIf(
                isProduction,
                autoprefixer({
                    cascade: false,
                }),
            ),
        )
        .pipe(
            gulpIf(
                isProduction,
                minify({
                    compatibility: 'ie8',
                    level: {
                        1: {
                            specialComments: 0,
                            removeEmpty: true,
                            removeWhitespace: true,
                        },
                        2: {
                            mergeMedia: true,
                            removeEmpty: true,
                            removeDuplicateFontRules: true,
                            removeDuplicateMediaBlocks: true,
                            removeDuplicateRules: true,
                            removeUnusedAtRules: false,
                        },
                    },
                }),
            ),
        )
        .pipe(
            gulpIf(
                isProduction,
                rename({
                    suffix: '.min',
                }),
            ),
        )
        .pipe(plumber.stop())
        .pipe(gulpIf(!isProduction, sourcemaps.write('./maps')))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(browsersync.stream())
}

module.exports = styles
