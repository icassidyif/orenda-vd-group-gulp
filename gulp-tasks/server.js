const browsersync = require('browser-sync')
const gulp = require('gulp')
const { paths } = require('../gulpfile')

function server() {
    browsersync.init({
        notify: false,
        port: 3000,
        server: './dist',
    })
    gulp.watch(paths.views.watch, gulp.parallel('views'))
    gulp.watch(paths.styles.watch, gulp.parallel('styles'))
    gulp.watch(paths.scripts.watch, gulp.parallel('scripts'))
    gulp.watch(paths.images.watch, gulp.parallel('images'))
    gulp.watch(paths.videos.watch, gulp.parallel('videos'))
    gulp.watch(paths.sprite.watch, gulp.parallel('sprite'))
}

module.exports = server
