import {
  IEditorState,
  IDocument,
  ISelectionState,
  ITransaction,
  IBlock,
} from './types/core';

export class HadixEditorState implements IEditorState {
  constructor(
    public document: IDocument,
    public selection: ISelectionState,
    public history: ITransaction[],
  ) {}

  clone(transaction: ITransaction) {
    return new HadixEditorState(transaction.afterState, this.selection, [
      ...this.history,
      transaction,
    ]);
  }
}
