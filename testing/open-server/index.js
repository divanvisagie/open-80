'use strict'

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World! I am an open Server'))
app.listen(80)
