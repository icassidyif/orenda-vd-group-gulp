const grid = require('smart-grid')

function smartgrid(cb) {
    grid('./src/styles/vendor/import', {
        outputStyle: 'scss',
        filename: 'smartgrid',
        columns: 12,
        offset: '3rem',
        mobileFirst: true,
        mixinNames: {
            container: 'container',
        },
        container: {
            fields: '1.5rem',
        },
        breakPoints: {
            xs: {
                width: '32rem',
            },
            sm: {
                width: '57.6rem',
            },
            md: {
                width: '76.8rem',
            },
            lg: {
                width: '99.2rem',
            },
            xl: {
                width: '120rem',
            },
        },
    })
    cb()
}

module.exports = smartgrid
