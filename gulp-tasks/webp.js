const browsersync = require('browser-sync')
const gulp = require('gulp')
const gulpWebp = require('gulp-webp')
const gulpIf = require('gulp-if')
const imageminWebp = require('imagemin-webp')
const newer = require('gulp-newer')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

function webp() {
    return gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(
            gulpWebp(
                gulpIf(
                    isProduction,
                    imageminWebp({
                        lossless: true,
                        quality: 100,
                        alphaQuality: 100,
                    }),
                ),
            ),
        )
        .pipe(gulp.dest(paths.images.dist))
        .pipe(browsersync.stream())
}

module.exports = webp
