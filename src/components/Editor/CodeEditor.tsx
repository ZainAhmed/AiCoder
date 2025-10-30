"use client";

import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

interface CodeEditorProps {
  path: string;
  code: string;
  language?: string;
  onChange?: (value: string) => void;
}

export default function CodeEditor({
  path,
  code,
  language = "javascript",
  onChange,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const modelCache = useRef<Record<string, monaco.editor.ITextModel>>({});

  useEffect(() => {
    if (!editorRef.current) return;

    // 🧠 Ensure workers are defined before creating the editor
    self.MonacoEnvironment = {
      getWorker(_id: string, label: string) {
        if (label === "typescript" || label === "javascript") {
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/typescript/ts.worker?worker",
              import.meta.url
            ),
            { type: "module" }
          );
        }
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/editor/editor.worker?worker",
            import.meta.url
          ),
          { type: "module" }
        );
      },
    };

    // 🧩 Create initial model safely
    const uri = monaco.Uri.parse(`file:///${path}`);
    const model =
      monaco.editor.getModel(uri) ||
      monaco.editor.createModel(code || "", language, uri);
    modelCache.current[path] = model;

    // 🎨 Create the editor instance
    editorInstance.current = monaco.editor.create(editorRef.current, {
      model,
      theme: "vs-dark",
      automaticLayout: true,
    });

    // 💬 Listen for edits
    const sub = model.onDidChangeContent(() => {
      onChange?.(model.getValue());
    });

    return () => {
      sub.dispose();
      editorInstance.current?.dispose();
    };
  }, []);

  // 🔄 Sync external code updates
  useEffect(() => {
    const model = modelCache.current[path];
    if (model && typeof code === "string" && model.getValue() !== code) {
      model.setValue(code);
    }
  }, [code, path]);

  return <div ref={editorRef} style={{ height: "100%", width: "100%" }} />;
}
