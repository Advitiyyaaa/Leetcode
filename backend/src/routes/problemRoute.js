const express = require('express')
const problemRouter = express.Router()
const {createProblem, updateProblem, deleteProblem, getProblemById, getAllProblems, allSolvedProblemByUser, problemSubmissions, getProblemForUpdate} = require('../controller/userProblem')
const userMiddleware = require('../middleware/userMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

problemRouter.post('/create',adminMiddleware,createProblem)
problemRouter.put('/update/:id',adminMiddleware,updateProblem)
problemRouter.delete('/delete/:id',adminMiddleware,deleteProblem)

problemRouter.get('/problemById/:id',userMiddleware,getProblemById)
problemRouter.get('/problemForUpdate/:id',adminMiddleware,getProblemForUpdate)
problemRouter.get('/getAllProblem',userMiddleware,getAllProblems)
problemRouter.get('/problemSolvedByUser',userMiddleware,allSolvedProblemByUser)

problemRouter.get('/problemSubmissions/:pid',userMiddleware,problemSubmissions)

module.exports = problemRouter