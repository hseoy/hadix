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
  private historyIndex: number;
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
    this.historyIndex = history.length - 1;
    this.onUpdateDocument = onUpdateDocument;

    this.onUpdateDocument?.(document);
  }

  setOnUpdateDocument(callback: (document: IDocument) => void) {
    this.onUpdateDocument = callback;
  }

  applyTransaction(transaction: ITransaction) {
    // History index가 최신 트랜잭션 이전이라면 현재 트랜잭션 이후의 트랜잭션들을 삭제
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(transaction);
    this.historyIndex += 1;
    this.document = transaction.afterState;
    this.onUpdateDocument?.(this.document);

    return this;
  }

  undo() {
    if (this.historyIndex >= 0) {
      this.document = this.history[this.historyIndex].beforeState;
      this.onUpdateDocument?.(this.document);
      this.historyIndex -= 1;
    }

    return this;
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex += 1;
      this.document = this.history[this.historyIndex].afterState;
      this.onUpdateDocument?.(this.document);
    }

    return this;
  }
}
