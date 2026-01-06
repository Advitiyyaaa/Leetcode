import { useEffect, useState, useRef } from "react";
import { Play, Send, FileCode2, CodeSquare, Section } from "lucide-react";
import axiosClient from "../utils/axiosClient";
import CodeSection from "./CodeSection";
import TestcaseSection from "./TestcaseSection";
import ResultSection from "./ResultSection";

export default function EditorSection({ problem, problemId, setSubmissions, code, setCode}) {
  const [language, setLanguage] = useState("javascript");
  const [section, SetSection] = useState("code");
  const [runResult, setRunResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const editorRef = useRef(null);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      const initialCode = problem?.starterCode?.find(
        (sc) => sc.language.toLowerCase() === language.toLowerCase()
      )?.initialCode;
      setCode(initialCode);
    }
  }, [language, problem]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    SetSection("code")
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: language,
      });

      setRunResult(response.data);
      setLoading(false);
      SetSection("testcase");
    } catch (error) {
      console.error("Error running code:", error);
      setRunResult({
        success: false,
        error: "Internal server error",
      });
      setLoading(false);
      SetSection("testcase");
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: language,
      });

      setSubmitResult(response.data);
      setSubmissions(prev => [response.data, ...(prev || [])]);
      setLoading(false);
      SetSection("result");
    } catch (error) {
      console.error("Error submitting code:", error);
      setSubmitResult(null);
      setLoading(false);
      SetSection("result");
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      default:
        return "javascript";
    }
  };

  return (
    <div className="lg:w-1/2 flex flex-col bg-black/50 backdrop-blur-xl rounded-2xl">
      {/* Toolbar */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 px-3 py-3 bg-[rgba(40,0,65,0.45)] rounded-t-2xl">
        {/* Language Picker */}
        <div className="flex items-center gap-2 text-purple-300 flex-1 min-w-[120px]">
          <FileCode2 className="w-5 h-5" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="select bg-black w-28 border-none h-8"
          >
            <option value="javascript" className="bg-black hover:bg-[rgba(40,0,65)] m-1">
              Javascript
            </option>
            <option value="cpp" className="bg-black hover:bg-[rgba(40,0,65)] m-1">
              Cpp
            </option>
            <option value="java" className="bg-black hover:bg-[rgba(40,0,65)] m-1">
              Java
            </option>
          </select>
        </div>

        {/* Run and Submit */}
        <div className="flex justify-center items-center gap-0.5 flex-1 min-w-[180px] relative">
          {/* Only show Run & Submit buttons in Code section */}
          {section === "code" && (
            <>
              <button
                onClick={() => {
                  setLoading(true);
                  setActiveButton("run");
                  handleRun();
                }}
                disabled={loading}
                className={`py-1.5 px-3 rounded bg-black hover:bg-gray-900 flex items-center justify-center gap-1 text-sm sm:text-base transition 
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {activeButton === "run" && loading ? (
                  <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">Run</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setLoading(true);
                  setActiveButton("submit");
                  handleSubmitCode();
                }}
                disabled={loading}
                className={`py-1.5 px-3 rounded bg-black hover:bg-gray-900 text-green-400 flex items-center justify-center gap-1 font-semibold text-sm sm:text-base transition 
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {activeButton === "submit" && loading ? (
                  <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Submit</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>  

        {/* Tabs (Code / Testcase / Result) */}
        <div className="flex justify-center gap-1 flex-1 min-w-[180px] bg-black rounded-lg py-1.75">
          <button
            className={`py-1 px-2 rounded text-xs sm:text-sm ${
              section === "code"
                ? "bg-[rgba(108,25,160,0.45)]"
                : "hover:bg-[rgba(40,0,65,0.45)]"
            }`}
            onClick={() => SetSection("code")}
          >
            Code
          </button>
          <button
            className={`py-1 px-2 rounded text-xs sm:text-sm ${
              section === "testcase"
                ? "bg-[rgba(108,25,160,0.45)]"
                : "hover:bg-[rgba(40,0,65,0.45)]"
            }`}
            onClick={() => SetSection("testcase")}
          >
            Testcase
          </button>
          <button
            className={`py-1 px-2 rounded text-xs sm:text-sm ${
              section === "result"
                ? "bg-[rgba(108,25,160,0.45)]"
                : "hover:bg-[rgba(40,0,65,0.45)]"
            }`}
            onClick={() => SetSection("result")}
          >
            Result
          </button>
        </div>
        {/* Monaco Editor */}
      </div>

      {section === "code" ? (
        <CodeSection
          language={language}
          getLanguageForMonaco={getLanguageForMonaco}
          handleEditorChange={handleEditorChange}
          handleEditorDidMount={handleEditorDidMount}
          code={code}
        />
      ) : null}
      {section === "testcase" && <TestcaseSection runResult={runResult} />}

      {section === "result" && (
        <ResultSection runResult={runResult} submitResult={submitResult} />
      )}
    </div>
  );
}
