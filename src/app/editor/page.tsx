"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FileExplorer from "@/components/Editor/FileExplorer";
import { FileSystemFolder } from "@/utils/types";
import { fileSystem } from "@/app/filesystem";
import { getNested, setNested, createNewFile } from "@/utils/editor";
import { useImageStore } from "@/store/imageStore";
import { useMutateGenerateCode } from "@/hooks/reactQueryHooks";
import LoadingIndicator from "@/components/LoadingIndicator";
const CodeEditor = dynamic(() => import("@/components/Editor/CodeEditor"), {
  ssr: false,
});
const gptData =
  '// File: Header.tsx\nimport React from "react";\n\ntype HeaderProps = {\n  title?: string;\n  onGenerate?: () => void;\n};\n\nconst Header: React.FC<HeaderProps> = ({ title = "Git Repo", onGenerate }) => {\n  return (\n    <header className="w-full bg-[#1e2130] p-6 flex items-center justify-between border-b border-gray-800">\n      <h1 className="text-2xl font-semibold text-white">{title}</h1>\n      <button\n        aria-label="Generate Code"\n        onClick={onGenerate}\n        className="px-6 py-3 rounded-xl border-2 border-[#e11d48] text-white bg-[#e11d48]/90 hover:bg-[#e11d48]/95 transition-all duration-200 font-semibold"\n      >\n        Generate Code\n      </button>\n    </header>\n  );\n};\n\nexport default Header;\n\n// File: ImageSection.tsx\nimport React from "react";\n\ntype ImageSectionProps = {\n  onCompare?: () => void;\n  isSelected?: boolean;\n};\n\nconst ImageSection: React.FC<ImageSectionProps> = ({ onCompare }) => {\n  return (\n    <section aria-label="New image" className="px-6 py-6 border-t border-gray-800">\n      <h2 className="text-xl font-semibold text-white mb-4">New Image</h2>\n      <div className="flex items-center gap-6">\n        <div className="w-48 h-48 rounded-xl bg-[#2a2a2a] flex items-center justify-center shadow-inner">\n          <span className="text-gray-400">IMG</span>\n        </div>\n        <button\n          aria-label="Compare"\n          className="px-6 py-3 rounded-xl border-2 border-blue-500 text-white bg-transparent hover:bg-blue-500/20 transition-all duration-200"\n        >\n          Compare\n        </button>\n      </div>\n    </section>\n  );\n};\n\nexport default ImageSection;\n\n// File: CodeBlock.tsx\nimport React from "react";\n\ntype CodeBlockProps = {\n  label: "Current" | "New";\n  code: string;\n};\n\nconst CodeBlock: React.FC<CodeBlockProps> = ({ label, code }) => (\n  <div className="bg-[#1e1e2a] rounded-xl p-4 grow max-h-72">\n    <div className="text-sm text-gray-400 mb-2">{label}</div>\n    <pre aria-label={`${label} code`} className="bg-[#12121a] rounded-lg p-4 text-sm text-white overflow-auto">\n      <code className="whitespace-pre">{code}</code>\n    </pre>\n  </div>\n);\n\nexport default CodeBlock;\n\n// File: ChangesSection.tsx\nimport React from "react";\nimport CodeBlock from "./CodeBlock";\n\ntype ChangesSectionProps = {\n  currentCode: string;\n  newCode: string;\n};\n\nconst ChangesSection: React.FC<ChangesSectionProps> = ({\n  currentCode,\n  newCode,\n}) => {\n  return (\n    <section aria-label="Changes" className="px-6 py-6 border-t border-gray-800">\n      <h2 className="text-xl font-semibold text-white mb-4">Changes</h2>\n      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n        <CodeBlock label="Current" code={currentCode} />\n        <CodeBlock label="New" code={newCode} />\n      </div>\n    </section>\n  );\n};\n\nexport default ChangesSection;\n\n// File: ConversationPanel.tsx\nimport React, { useState } from "react";\n\ntype ConversationPanelProps = {\n  placeholder?: string;\n  onSubmit?: (text: string) => void;\n};\n\nconst ConversationPanel: React.FC<ConversationPanelProps> = ({\n  placeholder = "Ask the system...",\n  onSubmit,\n}) => {\n  const [input, setInput] = useState("");\n\n  const handleSubmit = () => {\n    if (input.trim()) {\n      onSubmit?.(input);\n      setInput("");\n    }\n  };\n\n  return (\n    <section aria-label="Interaction" className="px-6 py-6 border-t border-gray-800">\n      <div className="flex items-center gap-3">\n        <input\n          aria-label="system prompt"\n          placeholder={placeholder}\n          value={input}\n          onChange={(e) => setInput(e.target.value)}\n          className="flex-1 bg-[#171923] text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"\n        />\n        <button\n          aria-label="Interaction"\n          onClick={handleSubmit}\n          className="px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 hover:bg-gray-600 transition-all duration-200"\n        >\n          Interaction\n        </button>\n      </div>\n    </section>\n  );\n};\n\nexport default ConversationPanel;\n\n// File: GitRepoPanel.tsx\nimport React, { useState } from "react";\nimport Header from "./Header";\nimport ImageSection from "./ImageSection";\nimport ChangesSection from "./ChangesSection";\nimport ConversationPanel from "./ConversationPanel";\n\nconst GitRepoPanel: React.FC = () => {\n  const [generated, setGenerated] = useState(false);\n\n  const handleGenerate = () => setGenerated((s) => !s);\n\n  const currentCode = `import React from \'react\';\nimport \'./App.css\';\n\nfunction App() {\n  return (\n    <div className="App">\n      Hello World\n    </div>\n  );\n}\n`;\n\n  const newCode = `import React from \'react\';\nimport \'./App.css\';\n\nconst title = \'New Feature\';\nexport default function App() {\n  return (\n    <div className="App">\n      <h1>{title}</h1>\n    </div>\n  );\n}\n`;\n\n  return (\n    <div className="min-h-screen bg-[#0b0e14] text-white">\n      <div className="max-w-5xl mx-auto mt-6 rounded-2xl bg-[#1b1b25] shadow-xl overflow-hidden">\n        <Header title="Git Repo" onGenerate={handleGenerate} />\n        <div className="border-t border-gray-800" />\n        <ImageSection />\n        <ChangesSection currentCode={currentCode} newCode={newCode} />\n        <ConversationPanel />\n        <button\n          aria-label="Create Branch"\n          className="w-full bg-[#e11d48] hover:bg-[#c91a3a] text-white font-semibold py-4 rounded-b-2xl text-2xl transition-all duration-200 mx-6 mb-6"\n        >\n          Create Branch\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default GitRepoPanel;';

export default function EditorPage() {
  const [files, setFiles] = useState<FileSystemFolder>(fileSystem);
  const [currentFile, setCurrentFile] = useState("home/index.js");
  const [code, setCode] = useState(getNested(files, currentFile));
  const imageUrl = useImageStore((s) => s.imageUrl);

  const { mutate: generateCode, isPending: isGeneratingCode } =
    useMutateGenerateCode({
      onSuccess: (data) => {
        const splitData = gptData.split("// File: ");
        splitData.forEach((data) => {
          if (data.length > 0) {
            const match = data.match(
              /^([\w.-]+\.(tsx|ts|js|jsx))\s*\n([\s\S]*)$/
            );

            if (match) {
              const fileName = match[1];
              const fileContent = match[3];
              createFile(fileName, fileContent);
            }
          }
        });
      },
      onError: (error) => console.error("Code generation failed:", error),
    });
  useEffect(() => {
    generateCode(imageUrl);
  }, [generateCode]);

  const handleFileSelect = (path: string) => {
    const newCode = getNested(files, path);
    setCurrentFile(path);
    setCode(newCode);
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    setFiles((prev) => {
      const newFiles = { ...prev };
      setNested(newFiles, currentFile, value);
      return newFiles;
    });
  };
  const createFile = (fileName: string, fileContent: string) => {
    console.log(fileContent);
    setFiles((prev) => {
      const newFiles = { ...prev };
      createNewFile(newFiles, fileName, fileContent);
      return newFiles;
    });
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <FileExplorer files={files} onFileSelect={handleFileSelect} />
      <div style={{ flex: 1 }}>
        <CodeEditor
          path={currentFile}
          code={code as string}
          onChange={handleCodeChange}
        />
      </div>
      {isGeneratingCode && <LoadingIndicator />}
    </div>
  );
}
