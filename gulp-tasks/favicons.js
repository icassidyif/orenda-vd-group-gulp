const gulp = require('gulp')
const gulpFavicons = require('gulp-favicons')
const { paths } = require('../gulpfile')

function favicons() {
    return gulp
        .src(paths.favicons.src)
        .pipe(
            gulpFavicons({
                icons: {
                    android: false,
                    appleIcon: true,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    online: false,
                    windows: false,
                    yandex: false,
                },
            }),
        )
        .pipe(gulp.dest(paths.favicons.dist))
}

module.exports = favicons
