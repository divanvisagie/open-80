'use strict'

const express = require('express')
const basicAuth = require('express-basic-auth')

const app = express()


app.use(basicAuth({
    users: { 'admin': 'notthatpassword' },
    challenge: true
}))


app.get('/', (req, res) => res.send('Hello World! I am a closed server, you cant see me'))

app.listen(80)