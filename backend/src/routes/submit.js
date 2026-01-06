const express = require('express')
const userMiddleware = require('../middleware/userMiddleware')
const submitRouter = express.Router()
const {submitProblem, runProblem} = require('../controller/userSubmission')

submitRouter.post("/submit/:id",userMiddleware,submitProblem)
submitRouter.post("/run/:id",userMiddleware,runProblem)

module.exports = submitRouter;