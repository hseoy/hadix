'use client';

import { IDocument, IEditorConfig } from '@/hadix-core/types/core';
import { CanvasBackground } from '@/components/ui-builder/CanvasBackground';

interface CanvasProps {
  editorDocument: IDocument | null;
  editorConfig: IEditorConfig;
}
export function Canvas({ editorDocument, editorConfig }: CanvasProps) {
  if (!editorDocument) {
    // Empty Canvas
    return (
      <div className="w-full h-full bg-gray-100 transition-colors duration-300 relative overflow-hidden">
        <CanvasBackground />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-100 transition-colors duration-300 relative overflow-hidden">
      <CanvasBackground />

      <div
        className="w-full h-full"
        style={{
          transform: `scale(${editorConfig?.zoom || 100}%)`,
        }}
      >
        <h1>Hadix Editor</h1>
      </div>
    </div>
  );
}
