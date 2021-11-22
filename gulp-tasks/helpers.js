const gulp = require('gulp')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { paths } = require('../gulpfile')

const parameters = yargs(hideBin(process.argv)).argv
const isProduction = !!parameters.production

function helpers(cb) {
    const helpersPaths = paths.helpers

    Object.keys(helpersPaths).forEach((element) => {
        if (helpersPaths[element].onlyProduction && !isProduction) return

        gulp.src(helpersPaths[element].src).pipe(gulp.dest(helpersPaths[element].dist))
    })

    cb()
}

module.exports = helpers
