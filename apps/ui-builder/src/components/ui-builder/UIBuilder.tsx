'use client';

import { useEffect } from 'react';
import { Canvas } from './Canvas';
import { useHadixEditor } from '@/hooks/use-hadix-editor';
import { useHadixCommands } from '@/hooks/use-hadix-commands';
import EditableContent from '@/components/EditableContent';

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

  const documentName = editorDocument?.metadata.title || '';

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full h-12 border-b border-gray-200 px-4 z-10 bg-zinc-800 flex items-center">
        {/* Left */}
        <div className="flex flex-row gap-2 items-center">
          <button className="text-sm text-gray-500"></button>
        </div>

        {/* Center */}
        <div className="flex flex-row gap-2 items-center flex-1 justify-center text-white font-semibold text-lg">
          {editorDocument && (
            <EditableContent
              content={documentName}
              prefixContent={
                <span className="text-sm text-gray-500 font-bold mr-2 inline-flex items-center gap-2">
                  <span className="text-gray-300">Hadix</span>
                  <span className="text-gray-500">/</span>
                </span>
              }
              onUpdateContent={content =>
                updateDocumentMetadata({ title: content || 'Untitled' })
              }
            />
          )}
        </div>

        {/* Right */}
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
        <Canvas editorDocument={editorDocument} />
      </div>
    </div>
  );
}
