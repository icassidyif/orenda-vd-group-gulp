const fs = require('fs')
const { paths } = require('../gulpfile')

function fontface(cb) {
    const fontFile = './src/styles/base/_fonts.scss'
    const fileContent = fs.readFileSync(fontFile)
    if (!fileContent) return cb()

    fs.readdir(paths.fonts.dist, (err, items) => {
        if (err) throw err
        if (!items || !items.length) return cb()

        const uniqueItems = []
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i].match(/^[a-zA-Z0-9-_]+/)[0]
            if (!item || uniqueItems.includes(item)) continue
            uniqueItems.push(item)
            fs.appendFile(fontFile, `@include font('${item}', '${item}', '400', 'normal')\n`, cb)
        }

        return null
    })
    return cb()
}

module.exports = fontface
