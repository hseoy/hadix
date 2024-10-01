import { nanoid } from 'nanoid';
import { HadixDocument } from '../HadixDocument';
import {
  ICommand,
  IDocumentMetadata,
  IEditorState,
  ITransaction,
} from '../types/core';

export class UpdateMetadataCommand implements ICommand {
  name = 'updateMetadata';

  private metadata: Partial<IDocumentMetadata>;

  constructor(metadata: Partial<IDocumentMetadata>) {
    this.metadata = metadata;
  }

  execute(state: IEditorState): IEditorState {
    const newMetaData = { ...state.document.metadata, ...this.metadata };
    const transaction: ITransaction = {
      id: nanoid(),
      action: this.name,
      timestamp: new Date(),
      beforeState: state.document,
      afterState: new HadixDocument(state.document.blocks, newMetaData),
    };
    return state.applyTransaction(transaction);
  }
}
