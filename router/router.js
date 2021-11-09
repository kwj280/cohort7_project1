const express = require('express')
const router = express.Router();

const { getCommands, getCommandMan } = require('../model/command.js')
const { getCards } = require('../model/card.js')

router.get('/cards', (req, res)=>{
  res.send(getCards())
})

router.get('/commands', (req, res)=>{
  res.send(getCommands())
})

router.get('/man', (req, res)=>{
  res.send(getCommandMan(req.query.command))
})

router.get('/', (req, res) => {
     res.sendFile(__dirname, '/index.html');

})

module.exports = {
	router
}