import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import EditorSection from "../components/EditorSection";
import ProblemSection from "../components/ProblemSection";

export default function ProblemPage() {

  const {problemId} = useParams()

  const [problem, SetProblem] = useState()
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState()
  const [code, setCode] = useState("");


  useEffect(()=>{
    // Validate problemId before making API calls
    if (!problemId) {
      setLoading(false)
      return
    }

    async function fetchProblem(){
      try{
        const response = await axiosClient.get(`/problem/problemById/${problemId}`)
        SetProblem(response?.data)
      }
      catch(err){
        console.error("Error fetching problem:", err)
      }  
    }

    async function fetchSubmission(){
      try{
        const response = await axiosClient.get(`/problem/problemSubmissions/${problemId}`)
        setSubmissions(response?.data || [])
      }
      catch(err){
        console.error("Error fetching submissions:", err)
        setSubmissions([])
      }
      finally {
        setLoading(false)
      }  
    }

    const loadData = async () => {
      await fetchProblem()
      await fetchSubmission()
    }

    loadData()
  },[problemId])

  return (
    <div className="min-h-screen text-white w-[95%] container mx-auto">
      <div className="flex flex-col lg:flex-row gap-3 pb-10">
        {/* Problem Section */}
        <ProblemSection 
          problem={problem} 
          submissions={submissions} 
          loading={loading} 
          code={code}
        />

        {/* Editor Section */}
        <EditorSection 
          problem={problem}
          problemId={problemId}
          setSubmissions={setSubmissions}  
          code={code}
          setCode={setCode}
        />
      </div>
    </div>
  );
}
