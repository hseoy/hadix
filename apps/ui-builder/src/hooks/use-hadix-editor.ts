import { HadixDocument } from '@/hadix-core/HadixDocument';
import { HadixEditorState } from '@/hadix-core/HadixEditorState';
import { HadixSelectionState } from '@/hadix-core/HadixSelectionState';
import {
  IDocument,
  IDocumentMetadata,
  IEditorState,
} from '@/hadix-core/types/core';
import { useState, useRef, useCallback } from 'react';

const initialDocumentMetadata: IDocumentMetadata = {
  title: 'Untitled',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useHadixEditor = () => {
  const [editorDocument, setEditorDocument] = useState<IDocument | null>(null);
  const editorStateRef = useRef<IEditorState | null>(null);

  const initializeEditor = useCallback((metadata?: IDocumentMetadata) => {
    editorStateRef.current = new HadixEditorState({
      document: new HadixDocument([], metadata || initialDocumentMetadata),
      selection: new HadixSelectionState(),
      history: [],
      onUpdateDocument: newDocument => setEditorDocument(newDocument),
    });
  }, []);

  const editorState = editorStateRef.current;

  return { initializeEditor, editorState, editorDocument };
};
