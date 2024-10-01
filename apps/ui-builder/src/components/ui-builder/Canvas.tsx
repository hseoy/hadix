'use client';

import { IDocument } from '@/hadix-core/types/core';

interface CanvasProps {
  editorDocument: IDocument | null;
}
export function Canvas({ editorDocument }: CanvasProps) {
  return (
    <div className="w-full h-full bg-gray-100 transition-colors duration-300 relative overflow-hidden">
      {/* 그리드 배경 */}
      <div
        className="absolute inset-0 bg-grid bg-center"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98h-98z' stroke='%23E5E7EB' fill='none' stroke-width='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: '25px 25px',
        }}
      ></div>
    </div>
  );
}
