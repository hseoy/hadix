import {
  IEditorState,
  IDocument,
  ISelectionState,
  ITransaction,
  IEditorHistory,
} from './types/core';

export class HadixEditorState implements IEditorState {
  public selection?: ISelectionState;
  public history: IEditorHistory;
  private onUpdateDocument?: (document: IDocument) => void;

  constructor({
    selection,
    history,
    onUpdateDocument,
  }: {
    selection?: ISelectionState;
    history: IEditorHistory;
    onUpdateDocument?: (document: IDocument) => void;
  }) {
    this.selection = selection;
    this.history = history;
    this.onUpdateDocument = onUpdateDocument;
    this.onUpdateDocument?.(this.getDocument());
  }

  setOnUpdateDocument(callback: (document: IDocument) => void) {
    this.onUpdateDocument = callback;
  }

  getDocument(): IDocument {
    return this.history.getDocument();
  }

  serializeDocument(): string {
    return this.getDocument().serialize();
  }

  applyTransaction(transaction: ITransaction) {
    this.history.applyTransaction(transaction);
    this.onUpdateDocument?.(this.getDocument());
    return this;
  }

  undo() {
    this.history.undo();
    this.onUpdateDocument?.(this.getDocument());
    return this;
  }

  redo() {
    this.history.redo();
    this.onUpdateDocument?.(this.getDocument());
    return this;
  }
}
