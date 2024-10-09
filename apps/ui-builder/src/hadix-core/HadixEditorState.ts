import {
  IEditorState,
  IDocument,
  ISelectionState,
  ITransaction,
  IEditorHistory,
  IEditorConfig,
} from './types/core';

export class HadixEditorState implements IEditorState {
  public selection?: ISelectionState;
  public history: IEditorHistory;
  private config: IEditorConfig;

  constructor({
    selection,
    history,
    config,
  }: {
    selection?: ISelectionState;
    history: IEditorHistory;
    config: IEditorConfig;
  }) {
    this.selection = selection;
    this.history = history;
    this.config = config;
  }

  getConfig(): IEditorConfig {
    return this.config;
  }

  updateConfig(config: Partial<IEditorConfig>) {
    this.config = { ...this.config, ...config };
  }

  getDocument(): IDocument {
    return this.history.getDocument();
  }

  serializeDocument(isEditor?: boolean): string {
    return this.getDocument().serialize(isEditor);
  }

  applyTransaction(transaction: ITransaction) {
    this.history.applyTransaction(transaction);
    return this;
  }

  undo() {
    this.history.undo();
    return this;
  }

  redo() {
    this.history.redo();
    return this;
  }
}
