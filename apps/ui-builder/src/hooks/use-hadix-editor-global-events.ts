import { IEditorState } from '@/hadix-core/types/core';
import { useEffect } from 'react';
import { debounce } from '@/utils/toolkit';

export const useHadixEditorGlobalEvents = (
  editorState: IEditorState | null,
) => {
  useEffect(() => {
    if (!editorState) return;
    const keyDownHandler = (event: KeyboardEvent) => {
      const isMetaKey = event.metaKey || event.ctrlKey;

      // Cmd + Shift + Z
      if (event.key === 'z' && isMetaKey && event.shiftKey) {
        return editorState?.redo();
      }

      // Cmd + Z
      if (event.key === 'z' && isMetaKey) {
        return editorState?.undo();
      }

      // Zoom +
      if (
        (event.key === '=' && isMetaKey) ||
        (event.key === '+' && isMetaKey)
      ) {
        event.preventDefault();
        const currentZoom = editorState?.getConfig()?.zoom || 100;
        const nextZoom =
          currentZoom % 25 === 0
            ? currentZoom + 25
            : Math.ceil(currentZoom / 25) * 25;
        return editorState?.updateConfig({ zoom: nextZoom });
      }

      // Zoom -
      if (event.key === '-' && isMetaKey) {
        event.preventDefault();
        const currentZoom = editorState?.getConfig()?.zoom || 100;
        const nextZoom =
          currentZoom % 25 === 0
            ? currentZoom - 25
            : Math.floor(currentZoom / 25) * 25;
        return editorState?.updateConfig({ zoom: nextZoom });
      }

      // Zoom Reset
      if (event.key === '0' && isMetaKey) {
        event.preventDefault();
        return editorState?.updateConfig({ zoom: 100 });
      }
    };

    const wheelHandler = (event: WheelEvent) => {
      if (event.metaKey || event.ctrlKey) {
        const zoomDelta = -Math.floor(event.deltaY / 10);
        return editorState?.zoomIn(zoomDelta);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('wheel', wheelHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [editorState]);
};
