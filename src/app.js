const express = require('express')
const app = express();
const config = require('./config')
const mongoose = require('mongoose')
const cors = require('cors')
require('./api/routes')(app)
const bodyParser = require('body-parser')
const server = require('http').Server(app);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) console.log(err)
  console.log('connected!')
})
server.listen(config.port || 4000, function() {
  // socket(server);
  console.log('port ', config.port);

})
