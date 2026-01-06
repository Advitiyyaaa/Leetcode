const express = require('express')
const chatRouter = express.Router()
const chatBot = require('../controller/chatBot')
const userMiddleware = require('../middleware/userMiddleware')

chatRouter.post('/ai',userMiddleware,chatBot)

module.exports = chatRouter