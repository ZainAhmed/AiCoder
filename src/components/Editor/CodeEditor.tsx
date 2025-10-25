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

    // Monaco Web Worker setup (needed for Next.js Turbopack)
    window.MonacoEnvironment = {
      getWorker: function (_moduleId: string, label: string) {
        if (label === "typescript" || label === "javascript") {
          return new Worker(
            new URL(
              "monaco-editor/esm/vs/language/typescript/ts.worker",
              import.meta.url
            )
          );
        }
        return new Worker(
          new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
        );
      },
    };

    editorInstance.current = monaco.editor.create(editorRef.current, {
      value: code,
      language,
      theme: "vs-dark",
      automaticLayout: true,
    });

    return () => editorInstance.current?.dispose();
  }, []);

  // Handle model creation and switching
  useEffect(() => {
    if (!editorInstance.current) return;

    let model = modelCache.current[path];
    if (!model) {
      model = monaco.editor.createModel(
        code,
        language,
        monaco.Uri.parse(`file:///${path}`)
      );
      modelCache.current[path] = model;
    }

    // Update model if switching files
    editorInstance.current.setModel(model);

    // Update code if model changed externally
    const sub = model.onDidChangeContent(() => {
      onChange?.(model.getValue());
    });

    return () => sub.dispose();
  }, [path]);

  // If the content changes externally (e.g., file modified elsewhere)
  useEffect(() => {
    const model = modelCache.current[path];
    if (model && model.getValue() !== code) {
      model.setValue(code);
    }
  }, [code, path]);

  return <div ref={editorRef} style={{ height: "100%", width: "100%" }} />;
}
