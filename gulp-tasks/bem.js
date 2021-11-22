const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const parameters = yargs(hideBin(process.argv)).argv
const config = require('../.bemrc.json')

function getType() {
    if (parameters.m && !parameters.c) {
        return 'modules'
    }
    if (parameters.c && !parameters.m) {
        return 'components'
    }
    if (!parameters.m && !parameters.c) {
        throw new Error('use -m or -c to specify a type')
    } else {
        throw new Error('both -m and -c are specified')
    }
}

function createDir(dir) {
    fs.access(dir, (fsError) => {
        if (fsError) {
            fs.mkdir(dir, (mkdirError) => {
                if (mkdirError) throw new Error(mkdirError)
            })
        }
    })
}

async function createFiles(dir, ext) {
    const name = path.basename(dir)
    ext.forEach((fileExt) => {
        const file = path.resolve(dir, `${name}.${fileExt}`)
        let exists = false
        fs.access(file, (accessError) => {
            if (!accessError) exists = true

            if (exists) {
                return
            }

            fs.writeFile(file, '', (writeError) => {
                if (writeError) throw new Error(writeError)
            })
        })
    })
}

async function bem() {
    if (!parameters.name) throw new Error('name is not specified')
    const cfgDir = config.paths[getType()]
    const dir = path.resolve(path.dirname(__dirname), cfgDir, parameters.name)

    await createDir(dir)
    await createFiles(dir, config.technologies)
}

module.exports = bem
