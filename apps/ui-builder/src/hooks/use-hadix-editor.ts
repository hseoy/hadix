import { HadixCommandExecutor } from '@/hadix-core/HadixCommandExecutor';
import { HadixDocument } from '@/hadix-core/HadixDocument';
import { HadixEditorHistory } from '@/hadix-core/HadixEditorHistory';
import { HadixEditorState } from '@/hadix-core/HadixEditorState';
import { observableValue } from '@/hadix-core/ObservableValue';
import {
  ICommandExecutor,
  IDocument,
  IDocumentMetadata,
  IEditorConfig,
  IEditorState,
} from '@/hadix-core/types/core';
import { useState, useRef, useCallback, useEffect } from 'react';

const initialDocumentMetadata: IDocumentMetadata = {
  title: 'Untitled',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const initialEditorConfig: IEditorConfig = {
  zoom: 100,
};

export const useHadixEditor = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [editorDocument, setEditorDocument] = useState<IDocument | null>(null);
  const [editorConfig, setEditorConfig] =
    useState<IEditorConfig>(initialEditorConfig);
  const editorStateRef = useRef<IEditorState | null>(null);
  const commandExecutorRef = useRef<ICommandExecutor | null>(null);

  const onUpdateDocument = useCallback((document: IDocument) => {
    setEditorDocument(document);
  }, []);

  const onUpdateConfig = useCallback((config: IEditorConfig) => {
    setEditorConfig(config);
  }, []);

  const initializeEditor = useCallback((metadata?: IDocumentMetadata) => {
    // ObservableValue 사용하여 상태 관리
    const document = observableValue(
      new HadixDocument([], metadata || initialDocumentMetadata),
    );
    const config = observableValue({ zoom: 100 } satisfies IEditorConfig);

    // 상태 변경 시 콜백 함수 호출
    document.subscribe(onUpdateDocument);
    config.subscribe(onUpdateConfig);

    // EditorState & CommandExecutor 생성
    editorStateRef.current = new HadixEditorState({
      history: new HadixEditorHistory([], document),
      config,
    });
    commandExecutorRef.current = new HadixCommandExecutor(
      editorStateRef.current,
    );

    setIsInitialized(true);
  }, []);

  const editorState = editorStateRef.current;
  const commandExecutor = commandExecutorRef.current;

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
    isInitialized,
    initializeEditor,
    editorState,
    editorDocument,
    editorConfig,
    commandExecutor,
  };
};
