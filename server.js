const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const FormData = require('form-data')
const app = express()
const sharp = require('sharp')

const STATIC_DIR = 'build'
const IMGUR_UPLOAD_IMAGE_API_ENDPOINT = 'https://api.imgur.com/3/upload'
const { MY_LIFF_ID, IMGUR_CLIENT_ID } = process.env


const createFormData = async (buffer) => {
    const formData = new FormData()
    formData.append('type', 'file')
    formData.append('image', buffer)
    return formData
}

const uploadToImgur = async (formData) => {
    const imageData = await fetch(IMGUR_UPLOAD_IMAGE_API_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        body: formData
    }).then(res => res.json())
    return imageData
}

app.use(express.static(STATIC_DIR))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, 'build') })
})

app.get('/send-id', (req, res) => {
    res.json({ id: MY_LIFF_ID })
})

app.post('/upload', async (req, res) => {
    const { type, image } = req.body
    if(type !== 'base64') {
        res.status(500)
    }
    try {
        const buf = Buffer.from(image, type)
        const thumbnailBuf = await sharp(buf)
            .resize(240, 240)
            .toBuffer()

        const original =  await createFormData(buf)
            .then((data) => uploadToImgur(data))
        const thumbnail =  await createFormData(thumbnailBuf)
            .then((data) => uploadToImgur(data))

        if(!original.success) {
            console.error(original)
            res.status(original.status)
        }

        if(!thumbnail.success) {
            console.error(thumbnail)
            res.status(thumbnail.status)
        }

        res.json({
            imageUrl: original.data.link,
            thumbnailUrl: thumbnail.data.link
        })
    } catch (error) {
        console.error(error)
        res.status(500)
    }
})

app.listen(process.env.PORT || 3001, () => {
    console.log('app listening')
})