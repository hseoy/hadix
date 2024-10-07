'use client';

import { useEffect } from 'react';
import { Canvas } from './Canvas';
import { useHadixEditor } from '@/hooks/use-hadix-editor';
import { useHadixCommands } from '@/hooks/use-hadix-commands';

export function UIBuilder() {
  const { initializeEditor, editorState, editorDocument, commandExecutor } =
    useHadixEditor();
  const { updateDocumentMetadata, exportDocument } =
    useHadixCommands(commandExecutor);

  useEffect(() => {
    initializeEditor();
  }, []);

  useEffect(() => {
    console.log('CHANGED EDITOR STATE:', editorState);
  }, [editorState]);

  useEffect(() => {
    console.log('CHANGED EDITOR DOCUMENT:', editorDocument);
  }, [editorDocument]);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
        <div className="flex flex-row gap-2 items-center">
          <hgroup className="flex flex-row gap-1 items-baseline">
            <h1 className="text-xl font-bold">Hadix</h1>
            <h2 className="text-sm text-gray-500">UI Builder</h2>
          </hgroup>
          <div className="text-xs text-gray-500 bg-black text-white px-2 py-1 rounded-md">
            Developing
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Github Link */}
          <a
            href="https://github.com/hseoy/hadix"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500"
          >
            Github
          </a>
          {/* Export */}
          <button
            className="text-sm text-gray-500"
            onClick={() => exportDocument()}
          >
            Export
          </button>
        </div>
      </header>

      <div className="w-full h-full flex flex-row">
        {/* SideBar */}
        <div className="w-64 h-full bg-white shadow-md">
          <div className="flex flex-col gap-2 p-4">
            {/* Component Tree */}
            <h3 className="font-bold text-gray-500">Components</h3>
          </div>
        </div>

        {/* Canvas */}
        <Canvas
          editorDocument={editorDocument}
          onUpdateDocumentMetadata={updateDocumentMetadata}
        />
      </div>
    </div>
  );
}
