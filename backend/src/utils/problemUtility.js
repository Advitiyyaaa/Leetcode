const axios = require('axios');
require('dotenv').config()

const waiting = async (timer)=>{
    setTimeout(()=>{
        return;
    },timer);
}
const getLanguageId = (lang)=>{
    const language = {
        "cpp":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()]
}
const submitbatch = async(submissions)=>{
    const options = {
    method: 'POST',
    url:process.env.JUDGE0_URL,
    params: {
        base64_encoded: 'false',
    },
    headers: {
        'x-rapidapi-key':process.env.JUDGE0_API_KEY,
        'x-rapidapi-host':process.env.JUDGE0_HOST,
        'Content-Type': 'application/json'
    },
    data: {
        submissions
    }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return await fetchData();
}
const submitToken = async(resultTokens)=>{
    const options = {
    method: 'GET',
    url:process.env.JUDGE0_URL,
    params: {
        tokens: resultTokens.join(','),
        base64_encoded: 'false',
        fields: '*'
    },
    headers: {
        'x-rapidapi-key':process.env.JUDGE0_API_KEY,
        'x-rapidapi-host':process.env.JUDGE0_HOST
    }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    while(true){
        const result = await fetchData();
        isResultObtained = result.submissions.every((res)=>res.status.id>2);
        if(isResultObtained)
            return result.submissions;
        
        await waiting(1000);
    }
    
}

module.exports = { getLanguageId, submitbatch, submitToken };