const Problem = require('../models/problem')
const Submission = require('../models/submission')
const {getLanguageId,submitbatch,submitToken} = require('../utils/problemUtility')

const submitProblem = async(req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.id;
        const {code,language} = req.body
        if(!userId||!problemId||!code||!language){
            return res.status(400).send("Fields Missing")
        }
        //fetching the problem
        const problem = await Problem.findById(problemId)
        if(!problem){
            return res.status(400).send("No problem found")
        }
        //storing code before sending to Judge0
        const language_id = getLanguageId(language);
        const submittedCode = await Submission.create({
            problemId,
            userId,
            language,
            code,
            testCasesTotal: problem.hiddenCases.length
        })
        //sending code to judge0
        const submissions = problem.hiddenCases.map((testcase)=>({
            source_code:code,
            language_id:language_id,
            stdin:testcase.input,
            expectedOutput:testcase.output   
        }))
        const submitResult = await submitbatch(submissions)
            
        const resultTokens = submitResult.map((result)=>result.token);

        const testResults = await submitToken(resultTokens);

        // 
        let testCasesPassed = 0
        let runtime = 0
        let memory = 0
        let status = 'accepted'
        let errorMsg = null

        for(let i = 0; i < testResults.length; i++){
            const test = testResults[i];
            const expectedOutput = problem.hiddenCases[i].output.trim();
            const actualOutput = (test.stdout || '').trim();
            
            if(test.status_id == 3 && actualOutput === expectedOutput){
                testCasesPassed++
                runtime = runtime + parseFloat(test.time || 0)
                memory = Math.max(memory, test.memory || 0)
            }
            else{
                if(test.status_id == 3){
                    // Runtime successful but wrong answer
                    status = 'wrong'
                    errorMsg = `Expected: ${expectedOutput}, Got: ${actualOutput}`
                }
                else if(test.status_id >= 4){
                    // Compilation or runtime error
                    status = 'error'
                    errorMsg = test.stderr || test.compile_output || 'Unknown error'
                }
                break; // Stop on first failure
            }
        }
        // 

        //store the result in database
        submittedCode.status = status
        submittedCode.testCasesPassed = testCasesPassed
        submittedCode.runTime = runtime
        submittedCode.memory = memory
        submittedCode.errorMessage = errorMsg

        await submittedCode.save();

        //problemid insertion in user schema
        if (status === 'accepted') {
            if (!req.result.problemSolved.includes(problemId)) {
                req.result.problemSolved.push(problemId);
                await req.result.save();
            }
        }

        return res.status(201).send(submittedCode)
    }
    catch(err){
        res.status(500).send("Internal server Error: "+err)
    }
}

const runProblem = async(req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.id;
        const {code,language} = req.body
        if(!userId||!problemId||!code||!language){
            return res.status(400).send("Fields Missing")
        }
        //fetching the problem
        const problem = await Problem.findById(problemId)
        if(!problem){
            return res.status(400).send("No problem found")
        }
        //sending code to judge0
        const language_id = getLanguageId(language);
        const submissions = problem.visibleCases.map((testcase)=>({
            source_code:code,
            language_id:language_id,
            stdin:testcase.input,
            expected_output:testcase.output   
        }))
        const submitResult = await submitbatch(submissions)
            
        const resultTokens = submitResult.map((result)=>result.token);

        const testResults = await submitToken(resultTokens);

        return res.status(201).send(testResults)
    }
    catch(err){
        res.status(500).send("Internal server Error: "+err)
    }
}

module.exports = {submitProblem, runProblem}