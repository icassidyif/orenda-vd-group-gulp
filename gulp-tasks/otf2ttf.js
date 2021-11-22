const gulp = require('gulp')
const fonter = require('gulp-fonter')

function otf2ttf() {
    return gulp
        .src('./src/fonts/*.otf')
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(gulp.dest('./src/fonts'))
}

module.exports = otf2ttf
