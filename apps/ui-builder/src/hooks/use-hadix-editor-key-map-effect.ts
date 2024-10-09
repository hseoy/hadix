import { IEditorState } from '@/hadix-core/types/core';
import { useEffect } from 'react';

export const useHadixEditorKeyMapEffect = (
  editorState: IEditorState | null,
) => {
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
};
