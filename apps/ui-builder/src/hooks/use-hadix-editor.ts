import { UpdateMetadataCommand } from '@/hadix-core/commands/UpdateMetadataCommand';
import { HadixDocument } from '@/hadix-core/HadixDocument';
import { HadixEditorHistory } from '@/hadix-core/HadixEditorHistory';
import { HadixEditorState } from '@/hadix-core/HadixEditorState';
import {
  IDocument,
  IDocumentMetadata,
  IEditorState,
} from '@/hadix-core/types/core';
import { useState, useRef, useCallback, useEffect } from 'react';

const initialDocumentMetadata: IDocumentMetadata = {
  title: 'Untitled',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useHadixEditor = () => {
  const [editorDocument, setEditorDocument] = useState<IDocument | null>(null);
  const editorStateRef = useRef<IEditorState | null>(null);

  const initializeEditor = useCallback((metadata?: IDocumentMetadata) => {
    const document = new HadixDocument([], metadata || initialDocumentMetadata);

    editorStateRef.current = new HadixEditorState({
      history: new HadixEditorHistory([], document),
      onUpdateDocument: newDocument => setEditorDocument(newDocument),
    });
  }, []);

  const editorState = editorStateRef.current;

  const updateDocumentMetadata = useCallback(
    (metadata: Partial<IDocumentMetadata>) => {
      if (!editorState) return;
      const command = new UpdateMetadataCommand(metadata);
      command.execute(editorState);
    },
    [editorState],
  );

  useEffect(() => {
    if (!editorState) return;
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'z' && event.metaKey && event.shiftKey) {
        // Cmd + Shift + Z
        editorState?.redo();
        return;
      }

      if (event.key === 'z' && event.metaKey) {
        // Cmd + Z
        editorState?.undo();
        return;
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [editorState]);

  return {
    initializeEditor,
    editorState,
    editorDocument,
    updateDocumentMetadata,
  };
};
