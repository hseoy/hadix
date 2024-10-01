import {
  IEditorState,
  IDocument,
  ISelectionState,
  ITransaction,
} from './types/core';

export class HadixEditorState implements IEditorState {
  public document: IDocument;
  public selection: ISelectionState;
  public history: ITransaction[];
  private onUpdateDocument?: (document: IDocument) => void;

  constructor({
    document,
    selection,
    history,
    onUpdateDocument,
  }: {
    document: IDocument;
    selection: ISelectionState;
    history: ITransaction[];
    onUpdateDocument?: (document: IDocument) => void;
  }) {
    this.document = document;
    this.selection = selection;
    this.history = history;
    this.onUpdateDocument = onUpdateDocument;

    this.onUpdateDocument?.(document);
  }

  setOnUpdateDocument(callback: (document: IDocument) => void) {
    this.onUpdateDocument = callback;
  }

  applyTransaction(transaction: ITransaction) {
    this.history.push(transaction);
    this.document = transaction.afterState;
    this.onUpdateDocument?.(this.document);

    return this;
  }
}
