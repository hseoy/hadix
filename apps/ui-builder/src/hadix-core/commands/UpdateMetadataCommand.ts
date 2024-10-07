import {
  ICommand,
  IDocumentMetadata,
  IEditorState,
} from '@/hadix-core/types/core';
import { HadixTransaction } from '@/hadix-core/HadixTransaction';

export class UpdateMetadataCommand implements ICommand {
  name = 'updateMetadata';

  private metadata: Partial<IDocumentMetadata>;

  constructor(metadata: Partial<Omit<IDocumentMetadata, 'updatedAt'>>) {
    this.metadata = {
      ...metadata,
      updatedAt: new Date(),
    };
  }

  execute(state: IEditorState): IEditorState {
    const document = state.getDocument();
    const transaction = new HadixTransaction(
      this.name,
      document,
      document.clone({ metadata: this.metadata }),
    );
    return state.applyTransaction(transaction);
  }
}
