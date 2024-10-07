import { ICommand, IEditorState } from '@/hadix-core/types/core';
import { downloadBlob } from '@/utils/blob';

export class ExportDocumentCommand implements ICommand {
  name = 'exportDocument';

  constructor(private fileName: string = 'document.json') {
    // empty
  }

  execute(state: IEditorState): IEditorState {
    const serializedDocument = state.serializeDocument();
    const blob = new Blob([serializedDocument], { type: 'application/json' });
    downloadBlob(blob, this.fileName);

    return state;
  }
}
