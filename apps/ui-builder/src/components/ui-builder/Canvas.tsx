'use client';

import { IDocument } from '@/hadix-core/types/core';
import { CanvasBackground } from '@/components/ui-builder/CanvasBackground';

interface CanvasProps {
  editorDocument: IDocument | null;
}
export function Canvas({ editorDocument }: CanvasProps) {
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
    </div>
  );
}
