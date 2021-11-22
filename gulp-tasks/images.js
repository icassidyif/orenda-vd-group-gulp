const browsersync = require('browser-sync')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const imagemin = require('gulp-imagemin')
const imageminGifLossy = require('imagemin-giflossy')
const imageminMozJpeg = require('imagemin-mozjpeg')
const imageminPngQuant = require('imagemin-pngquant')
const imageminZopfli = require('imagemin-zopfli')
const newer = require('gulp-newer')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

function images() {
    return gulp
        .src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(
            gulpIf(
                isProduction,
                imagemin([
                    imageminGifLossy({
                        optimizationLevel: 3,
                        optimize: 3,
                        lossy: 2,
                    }),
                    imageminPngQuant({
                        speed: 5,
                        quality: [0.6, 0.8],
                    }),
                    imageminZopfli({
                        more: true,
                    }),
                    imageminMozJpeg({
                        progressive: true,
                        quality: 90,
                    }),
                    imagemin.svgo({
                        plugins: [
                            { removeViewBox: false },
                            { removeUnusedNS: false },
                            { removeUselessStrokeAndFill: false },
                            { cleanupIDs: false },
                            { removeComments: true },
                            { removeEmptyAttrs: true },
                            { removeEmptyText: true },
                            { collapseGroups: true },
                        ],
                    }),
                ]),
            ),
        )
        .pipe(gulp.dest(paths.images.dist))
        .pipe(browsersync.stream())
}

module.exports = images
