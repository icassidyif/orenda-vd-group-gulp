const gulp = require('gulp')
const requireDir = require('require-dir')

module.exports.paths = {
    views: {
        src: './src/views/*.pug',
        dist: './dist',
        watch: ['./src/views/**/*.pug', './src/blocks/**/*.pug'],
    },
    styles: {
        src: './src/styles/main.scss',
        dist: './dist/css',
        watch: ['./src/styles/**/*.scss', './src/blocks/**/*.scss'],
    },
    scripts: {
        src: './src/js/index.js',
        dist: './dist/js',
        watch: ['./src/js/**/*.js', './src/blocks/**/*.js'],
    },
    images: {
        src: [
            './src/assets/**/*.{jpg,jpeg,png,gif,tiff,svg}',
            '!./src/assets/favicons/*.{jpg,jpeg,png,gif,tiff,svg}',
            '!./src/assets/svg/*.svg',
        ],
        dist: './dist/assets',
        watch: [
            './src/assets/**/*.{jpg,jpeg,png,gif,tiff,svg}',
            '!./src/assets/favicons/*.{jpg,jpeg,png,gif,tiff,svg}',
            '!./src/assets/svg/*.svg',
        ],
    },
    videos: {
        src: './src/assets/**/*.{mp4,mov,wmv,flv,avi,webm,avchd,mkv}',
        dist: './dist/assets',
        watch: './src/assets/**/*.{mp4,mov,wmv,flv,avi,webm,avchd,mkv}',
    },
    sprite: {
        src: './src/assets/svg/*.svg',
        dist: './dist/assets/sprite',
        watch: './src/assets/svg/*.svg',
    },
    favicons: {
        src: './src/assets/favicons/*.{jpg,jpeg,png,gif,tiff}',
        dist: './dist/assets/favicons',
    },
    fonts: {
        src: './src/fonts/*.ttf',
        dist: './dist/fonts',
    },
    helpers: {
        gzip: {
            src: './src/.htaccess',
            dist: './dist',
            onlyProduction: true,
        },
        controlApp: {
            src: './src/js/controlApp.js',
            dist: './dist/js',
            onlyProduction: false,
        },
    },
}

const {
    clean,
    server,
    helpers,
    smartgrid,
    views,
    styles,
    scripts,
    images,
    videos,
    favicons,
    fonts,
    otf2ttf,
    fontface,
    sprite,
    webp,
    bem,
} = requireDir('./gulp-tasks')

const development = gulp.series(
    clean,
    smartgrid,
    gulp.parallel(helpers, views, styles, scripts, images, webp, videos, sprite, favicons, fonts),
    gulp.parallel(server),
)

const production = gulp.series(
    clean,
    gulp.parallel(helpers, views, styles, scripts, images, webp, videos, sprite, favicons, fonts),
)

exports.default = development
exports.build = production
exports.clean = clean
exports.helpers = helpers
exports.smartgrid = smartgrid
exports.views = views
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.webp = webp
exports.videos = videos
exports.sprite = sprite
exports.favicons = favicons
exports.fonts = fonts
exports.otf2ttf = otf2ttf
exports.fontface = fontface
exports.bem = bem