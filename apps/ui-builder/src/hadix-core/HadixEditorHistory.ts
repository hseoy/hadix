import {
  IDocument,
  IEditorHistory,
  IObservableValue,
  ITransaction,
} from '@/hadix-core/types/core';
import { observableValue } from '@/hadix-core/ObservableValue';

export class HadixEditorHistory implements IEditorHistory {
  private history: ITransaction[];
  private historyIndex: number;
  private currentDocument: IObservableValue<IDocument>;

  constructor(
    history: ITransaction[],
    currentDocument: IObservableValue<IDocument> | IDocument,
  ) {
    this.history = history;
    this.historyIndex = history.length - 1;
    this.currentDocument = observableValue(currentDocument);
  }

  getInitialDocument() {
    return this.history[0].beforeState;
  }

  getDocument() {
    return this.currentDocument.get();
  }

  applyTransaction(transaction: ITransaction) {
    // History index가 최신 트랜잭션 이전이라면 현재 트랜잭션 이후의 트랜잭션들을 삭제
    if (this.historyIndex < this.getMaxHistoryIndex()) {
      this.sliceHistoryToCurrentIndex();
    }
    this.history.push(transaction);
    this.increaseHistoryIndex();
    return this;
  }

  undo() {
    this.decreaseHistoryIndex();
    return this;
  }

  redo() {
    this.increaseHistoryIndex();
    return this;
  }

  private sliceHistoryToCurrentIndex() {
    this.history = this.history.slice(0, this.historyIndex + 1);
  }

  private increaseHistoryIndex() {
    if (this.historyIndex < this.getMaxHistoryIndex()) {
      this.historyIndex += 1;
      this.currentDocument.set(this.history[this.historyIndex].afterState);
    }
    return this;
  }

  private decreaseHistoryIndex() {
    if (this.historyIndex >= this.getMinHistoryIndex()) {
      this.currentDocument.set(this.history[this.historyIndex].beforeState);
      this.historyIndex -= 1;
    }
    return this;
  }

  private getMinHistoryIndex() {
    return 0;
  }

  private getMaxHistoryIndex() {
    return this.history.length - 1;
  }
}
