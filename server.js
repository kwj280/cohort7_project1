const express = require('express')
const app = express();
const path = require('path');
const {router} = require('./router/router.js')
const port = 3000

app.use(express.static(__dirname + '/public'));


app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})