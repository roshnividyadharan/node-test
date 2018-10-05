const express = require('express');//loading express module
const routerHome = express.Router()

// middleware that is specific to this router
routerHome.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

routerHome.get('/', function (req, res) {
  res.send('Welcome to Home')
})

module.exports=routerHome