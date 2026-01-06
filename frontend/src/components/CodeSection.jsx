import Editor from "@monaco-editor/react";

export default function CodeSection({language, getLanguageForMonaco, handleEditorChange, handleEditorDidMount, code}){
    return(
        <Editor
            height="calc(100vh - 80px)"
            language={getLanguageForMonaco(language)}
            theme="hc-black"
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              renderLineHighlight: 'line',
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: 'line',
              mouseWheelZoom: true,
            }}
          />
    )
}