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
  '// File: CodeBlock.tsx\nimport React from \'react\';\n\nexport type CodeBlockProps = {\n  code: string;\n};\n\nexport const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (\n  <pre className="bg-[#0e111b] rounded-lg p-4 text-sm text-green-100 overflow-auto">\n    {code}\n  </pre>\n);\n\nexport default CodeBlock;\n\n// File: HeaderCard.tsx\nimport React from \'react\';\n\ntype HeaderCardProps = {\n  onGenerate?: () => void;\n};\n\nexport const HeaderCard: React.FC<HeaderCardProps> = ({ onGenerate }) => {\n  return (\n    <section className="bg-[#1a1f2a] rounded-xl p-4 shadow-sm flex items-center justify-between">\n      <h2 className="text-2xl font-semibold text-white" aria-label="Git Repository Title">\n        Git Repo\n      </h2>\n      <button\n        onClick={onGenerate}\n        aria-label="Generate Code"\n        className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all duration-200"\n      >\n        Generate Code\n      </button>\n    </section>\n  );\n};\n\nexport default HeaderCard;\n\n// File: ImageSection.tsx\nimport React from \'react\';\n\ntype ImageSectionProps = {\n  onCompare?: () => void;\n};\n\nexport const ImageSection: React.FC<ImageSectionProps> = ({ onCompare }) => {\n  return (\n    <section className="bg-[#1a1f2a] rounded-xl p-4 mt-4 shadow-sm">\n      <div className="flex items-center justify-between mb-2">\n        <h3 className="text-xl font-semibold text-white" aria-label="New Image Section">\n          New Image\n        </h3>\n      </div>\n      <div className="flex items-center gap-4">\n        <div\n          aria-label="image placeholder"\n          role="img"\n          className="w-40 h-40 md:w-56 md:h-56 rounded-xl bg-[#2a2f3a] flex items-center justify-center"\n        >\n          <div className="w-16 h-10 bg-gray-400/60 rounded-sm" aria-label="placeholder icon" />\n        </div>\n        <button\n          onClick={onCompare}\n          aria-label="Compare images"\n          className="ml-4 px-5 py-3 border border-blue-400 text-blue-300 rounded-lg bg-transparent hover:bg-blue-50 transition-all duration-200"\n        >\n          Compare\n        </button>\n      </div>\n    </section>\n  );\n};\n\nexport default ImageSection;\n\n// File: ChangesSection.tsx\nimport React from \'react\';\nimport { CodeBlock } from \'./CodeBlock\';\n\nconst currentCode = `import React from \'react\'\nimport \'./App.css\'\n\nfunction App() {\n  return (\n    <div className="App">\n      Hello World\n    </div>\n  )\n}\n`;\n\nconst newCode = `import React from \'react\'\nimport \'./App.css\'\n\nconst title = \'New Feature\';\n\nexport default function App() {\n  return (\n    <div className="App">\n      <h1>{title}</h1>\n    </div>\n  )\n}\n`;\n\ntype ChangesSectionProps = {};\n\nexport const ChangesSection: React.FC<ChangesSectionProps> = () => {\n  return (\n    <section className="bg-[#1a1f2a] rounded-xl p-4 mt-6 shadow-sm">\n      <h3 className="text-2xl font-semibold text-white mb-3" aria-label="Changes">\n        Changes\n      </h3>\n      <div className="grid sm:grid-cols-2 gap-4">\n        <div>\n          <div className="text-sm text-gray-400 mb-2">Current</div>\n          <CodeBlock code={currentCode} />\n        </div>\n        <div>\n          <div className="text-sm text-gray-400 mb-2">New</div>\n          <CodeBlock code={newCode} />\n        </div>\n      </div>\n      <div className="mt-4 flex items-center gap-3">\n        <input\n          aria-label="Ask the system"\n          placeholder="Ask the system..."\n          className="flex-1 bg-[#0b0f1a] border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"\n        />\n        <button\n          aria-label="Interaction"\n          className="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 hover:bg-gray-600 transition-all duration-200"\n        >\n          Interaction\n        </button>\n      </div>\n    </section>\n  );\n};\n\nexport default ChangesSection;\n\n// File: BottomActions.tsx\nimport React from \'react\';\n\ntype BottomActionsProps = {\n  onCreate?: () => void;\n};\n\nexport const BottomActions: React.FC<BottomActionsProps> = ({ onCreate }) => {\n  return (\n    <button\n      onClick={onCreate}\n      aria-label="Create Branch"\n      className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold text-xl py-4 rounded-xl shadow-md transition-all duration-200"\n    >\n      Create Branch\n    </button>\n  );\n};\n\nexport default BottomActions;\n\n// File: Main.tsx\nimport React, { useCallback, useState } from \'react\';\nimport HeaderCard from \'./HeaderCard\';\nimport ImageSection from \'./ImageSection\';\nimport ChangesSection from \'./ChangesSection\';\nimport BottomActions from \'./BottomActions\';\nimport { CodeBlock } from \'./CodeBlock\';\nimport { ChangesSection as ChangesSectionNamed } from \'./ChangesSection\';\n\nconst Main: React.FC = () => {\n  const [generated, setGenerated] = useState(false);\n\n  const handleGenerate = useCallback(() => {\n    setGenerated(true);\n  }, []);\n\n  const handleCompare = useCallback(() => {\n    // no-op for UI demo\n  }, []);\n\n  const onCreateBranch = useCallback(() => {\n    // no-op for UI demo\n  }, []);\n\n  const sampleCurrent = `import React from \'react\'\nimport \'./App.css\'\n\nfunction App() {\n  return <div className="App">Hello World</div>;\n}`;\n\n  const sampleNew = `import React from \'react\'\nimport \'./App.css\'\n\nconst title = \'New Feature\';\nexport default function App() {\n  return <div className="App"><h1>{title}</h1></div>;\n}`;\n\n  return (\n    <div className="min-h-screen bg-[#0b0f1a] text-white px-4 py-6 sm:px-6 md:px-8 lg:px-12">\n      <main className="max-w-4xl mx-auto">\n        <HeaderCard onGenerate={handleGenerate} />\n        <ImageSection onCompare={handleCompare} />\n        <section className="bg-[#1a1f2a] rounded-xl p-4 mt-6 shadow-sm">\n          <h3 className="text-2xl font-semibold mb-3" aria-label="Changed blocks">\n            Feature Preview\n          </h3>\n          <div className="grid sm:grid-cols-2 gap-4">\n            <div>\n              <div className="text-sm text-gray-400 mb-2">Current</div>\n              <pre className="bg-[#0e111b] rounded-lg p-4 text-sm">{sampleCurrent}</pre>\n            </div>\n            <div>\n              <div className="text-sm text-gray-400 mb-2">New</div>\n              <pre className="bg-[#0e111b] rounded-lg p-4 text-sm">{sampleNew}</pre>\n            </div>\n          </div>\n        </section>\n        <ChangesSection />\n        <BottomActions onCreate={onCreateBranch} />\n      </main>\n    </div>\n  );\n};\n\nexport default Main;';

export default function EditorPage() {
  // helper: find first file path in fileSystem to avoid invalid default path
  const findFirstFile = (fs: FileSystemFolder, parent = ""): string | null => {
    for (const [key, val] of Object.entries(fs)) {
      const path = parent ? `${parent}/${key}` : key;
      if (typeof val === "string") return path;
      const nested = findFirstFile(val as FileSystemFolder, path);
      if (nested) return nested;
    }
    return null;
  };
  const initialFile =
    findFirstFile(fileSystem) || Object.keys(fileSystem)[0] || "vite.config.ts";

  const [files, setFiles] = useState<FileSystemFolder>(fileSystem);
  const [currentFile, setCurrentFile] = useState(initialFile);
  const [code, setCode] = useState(
    () => (getNested(files, initialFile) as string) || ""
  );
  const imageUrl = useImageStore((s) => s.imageUrl);

  const { mutate: generateCode, isPending: isGeneratingCode } =
    useMutateGenerateCode({
      onSuccess: (data) => {
        console.log("api response", data);
        // parse gptData (or real response) into multiple files and batch-update files once
        const splitData = gptData.split("// File: ");
        const additions: Record<string, string> = {};

        splitData.forEach((chunk) => {
          if (!chunk) return;
          const match = chunk.match(
            /^([\w.-]+\.(tsx|ts|js|jsx))\s*\n([\s\S]*)$/
          );
          if (match) {
            const fileName = match[1];
            const fileContent = match[3];
            additions[fileName] = fileContent;
          }
        });

        if (Object.keys(additions).length > 0) {
          setFiles((prev) => {
            const newFiles = { ...prev };
            // create all new files in a single update to avoid multiple re-renders
            for (const [name, content] of Object.entries(additions)) {
              createNewFile(newFiles, name, content);
            }
            return newFiles;
          });
        }
      },
      onError: (error) => console.error("Code generation failed:", error),
    });
  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      generateCode(imageUrl);
    }
  }, [imageUrl, generateCode]);

  const handleFileSelect = (path: string) => {
    const newCode = getNested(files, path);
    setCurrentFile(path);
    setCode((newCode as string) || "");
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    setFiles((prev) => {
      const newFiles = { ...prev };
      setNested(newFiles, currentFile, value);
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
