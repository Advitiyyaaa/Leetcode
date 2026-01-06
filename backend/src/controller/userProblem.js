const Problem = require('../models/problem')
const User = require('../models/user')
const Submission = require('../models/submission')
const VideoSolution = require('../models/videoSolutions')

const {getLanguageId,submitbatch,submitToken} = require('../utils/problemUtility')

const createProblem = async(req,res)=>{
    const{title,description,difficulty,tags,visibleCases,hiddenCases,starterCode,referenceSolution,problemCreator} = req.body;

    try{
        for(const solution of referenceSolution){
            const language_id = getLanguageId(solution.language);
            const submissions = visibleCases.map((testcase)=>({
                source_code:solution.completedCode,
                language_id:language_id,
                stdin:testcase.input,
                expectedOutput:testcase.output   
            }))
            const submitResult = await submitbatch(submissions)
            
            const resultTokens = submitResult.map((result)=>result.token);

            const testResults = await submitToken(resultTokens);
            
            for(test of testResults){
                if(test.status.id!==3){
                    return res.status(400).send(`Reference solution failed for language ${solution.language}`)
                }
            }
        
        }
        const userProblem = await Problem.create({
            ...req.body,
            problemCreator:req.result._id
        });
        res.status(201).send("Problem Saved Successfully")
    }
    catch(err){
        res.status(400).send("Error: " + err);
    }
}

const updateProblem = async(req,res)=>{
    const {id} = req.params;
    const{title,description,difficulty,tags,visibleCases,hiddenCases,starterCode,referenceSolution,problemCreator} = req.body;
    try{
        if(!id){
            throw new Error("No id found")
        }
        const DSAproblem = await Problem.findById(id);
        if(!DSAproblem){
            throw new Error("No id found in database")
        }
        for(const solution of referenceSolution){
            const language_id = getLanguageId(solution.language);
            const submissions = visibleCases.map((testcase)=>({
                source_code:solution.completedCode,
                language_id:language_id,
                stdin:testcase.input,
                expectedOutput:testcase.output   
            }))
            const submitResult = await submitbatch(submissions)
            
            const resultTokens = submitResult.map((result)=>result.token);

            const testResults = await submitToken(resultTokens);
            
            for(test of testResults){
                if(test.status.id!==3){
                    return res.status(400).send(`Reference solution failed for language ${solution.language}`)
                }
            }
        
        }
        const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true, new:true});
        res.status(200).send(newProblem)
    }
    catch(err){
        res.status(404).send("Error: "+err)
    }
}

const deleteProblem = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            throw new Error("Wrong Id")
        }
        if(!await Problem.findById(id)){
            throw new Error("No problem found")
        }
        const deletedProblem = await Problem.findByIdAndDelete(id);
        
        if(!deletedProblem){
            throw new Error("Problem missing")
        }
        return res.status(200).send("Problem Deleted")
    }
    catch(err){
        res.send("Error: "+err)
    }
}

const getProblemById = async(req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            throw new Error("Id not found")
        }
        const problem = await Problem.findById(id).select('_id title description difficulty tags visibleCases starterCode referenceSolution')
        if(!problem){
            throw new Error("No problem found")
        }
        const video = await VideoSolution.findOne({problemId:id});
        if(video){
        const responseData = {
        ...problem.toObject(),
        secureUrl:video.secureUrl,
        thumbnailUrl : video.thumbnailUrl,
        duration : video.duration,
    } 
    
    return res.status(200).send(responseData);
    }
        
    res.status(200).send(problem);

    }
    catch(err){
        res.status(500).send("Error: "+err);
    }
}

const getProblemForUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id).select(
            "title description difficulty tags visibleCases hiddenCases starterCode referenceSolution"
        );
    if (!problem) return res.status(404).send("Problem not found");
    res.status(200).json(problem);
    } catch (err) {
    res.status(500).send("Server error");
    }
};


const getAllProblems = async(req,res)=>{
    try{
        const allProblems = await Problem.find({}).select('_id title difficulty tags')
        if(allProblems.length==0){
            throw new Error("No problems found")
        }
        return res.status(200).send(allProblems)
    }
    catch(err){
        return res.send("Error: "+err)
    }
}

const allSolvedProblemByUser = async(req,res)=>{
    try{
        const user = await User.findById(req.result._id).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });
        if(!user){
            return res.status(404).send("User not found")
        }
        return res.status(200).send(user.problemSolved)
    }
    catch(err){
        return res.status(500).send(err)
    }
}

const problemSubmissions = async(req,res)=>{
    try{
        const problemId = req.params.pid
        const userId = req.result._id
        if(!problemId||!userId){
            return res.status(400).send("IDs not found")
        }
        const ans = await Submission.find({userId,problemId})
        if(ans.length==0){
            return res.status(200).json([])
        }
        return res.status(200).send(ans)
    }
    catch(err){
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {createProblem, updateProblem, deleteProblem, getProblemById, getAllProblems, allSolvedProblemByUser, problemSubmissions, getProblemForUpdate};