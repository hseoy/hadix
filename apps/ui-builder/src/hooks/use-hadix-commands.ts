import { ExportDocumentCommand } from '@/hadix-commands/ExportDocumentCommand';
import { UpdateMetadataCommand } from '@/hadix-commands/UpdateMetadataCommand';
import { ICommandExecutor, IDocumentMetadata } from '@/hadix-core/types/core';
import { useCallback } from 'react';

export const useHadixCommands = (commandExecutor: ICommandExecutor | null) => {
  const updateDocumentMetadata = useCallback(
    (metadata: Partial<IDocumentMetadata>) =>
      commandExecutor?.execute(new UpdateMetadataCommand(metadata)),
    [commandExecutor],
  );

  const exportDocument = useCallback(
    (fileName?: string) =>
      commandExecutor?.execute(new ExportDocumentCommand(fileName)),
    [commandExecutor],
  );

  return {
    updateDocumentMetadata,
    exportDocument,
  };
};
