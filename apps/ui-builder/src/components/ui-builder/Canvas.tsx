'use client';

import { IDocument, IDocumentMetadata } from '@/hadix-core/types/core';
import { CanvasBackground } from '@/components/ui-builder/CanvasBackground';
import EditableContent from '@/components/EditableContent';

interface CanvasProps {
  editorDocument: IDocument | null;
  onUpdateDocumentMetadata?: (metadata: Partial<IDocumentMetadata>) => void;
}
export function Canvas({
  editorDocument,
  onUpdateDocumentMetadata,
}: CanvasProps) {
  if (!editorDocument) {
    // Empty Canvas
    return (
      <div className="w-full h-full bg-gray-100 transition-colors duration-300 relative overflow-hidden">
        <CanvasBackground />
      </div>
    );
  }

  const documentName = editorDocument.metadata.title;
  const updatedAt = editorDocument.metadata.updatedAt;

  return (
    <div className="w-full h-full bg-gray-100 transition-colors duration-300 relative overflow-hidden">
      <CanvasBackground />

      {/* LEFT TOP Section */}
      <div className="absolute top-0 left-0">
        <div className="ml-4 mt-4">
          <div className="flex flex-row gap-2">
            <span className="text-xs text-gray-500">
              {updatedAt.toLocaleString()}
            </span>
          </div>

          <EditableContent
            content={documentName}
            onUpdateContent={content =>
              onUpdateDocumentMetadata?.({ title: content })
            }
          />
        </div>
      </div>

      {/* RIGHT TOP Section */}
      <div className="absolute top-0 right-0"></div>
    </div>
  );
}
