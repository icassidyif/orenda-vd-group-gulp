const gulp = require('gulp')
const { paths } = require('../gulpfile')

function videos() {
    return gulp.src(paths.videos.src).pipe(gulp.dest(paths.videos.dist))
}

module.exports = videos
