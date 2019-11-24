const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const express = require('express')
const app = express()
const sharp = require('sharp')
const { myLiffId } = process.env

const STATIC_DIR = 'build'

const removeFiles = (files) => {
    files.forEach((fileName) => {
        fs.unlink(`./${STATIC_DIR}/${fileName}`, (err) => {
            if(err) {
                console.error('Fail to remove image')
                throw err;
            }
            console.log(`Successfully remove ${fileName}`)
        })
    })
}

app.use(express.static(STATIC_DIR))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, 'build') })
})

app.get('/send-id', (req, res) => {
    res.json({ id: myLiffId })
})

app.post('/upload', (req, res) => {
    const { type, image } = req.body
    if(type !== 'base64') {
        res.status(500)
    }
    const buf = Buffer.from(image, type)
    const baseFileName = qs.escape(image.substring(0, 5))
    const originalFileName = `${baseFileName}.jpg`
    const thumbnailFileName = `${baseFileName}-thumbnail.jpg`
    sharp(buf)
        .toFile(`./${STATIC_DIR}/${originalFileName}`, (err, info) => {
            if(err) {
                console.error(err)
                res.status(500)
            }
            console.info(info)
        })
    sharp(buf)
        .resize(240, 240)
        .toFile(`./${STATIC_DIR}/${thumbnailFileName}`, (err, info) => {
            if(err) {
                console.error(err)
                res.status(500)
            }
            console.info(info)
        })
    setTimeout(removeFiles, 10 * 1000, [originalFileName, thumbnailFileName])
    res.json({
        imageUrl: originalFileName,
        thumbnailUrl: thumbnailFileName
    })
})

app.listen(process.env.PORT || 3001, () => {
    console.log('app listening')
})