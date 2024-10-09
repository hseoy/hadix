import { observableValue } from '@/hadix-core/ObservableValue';
import {
  IEditorState,
  IDocument,
  ISelectionState,
  ITransaction,
  IEditorHistory,
  IEditorConfig,
  IObservableValue,
} from '@/hadix-core/types/core';

export class HadixEditorState implements IEditorState {
  public selection?: ISelectionState;
  public history: IEditorHistory;
  private config: IObservableValue<IEditorConfig>;

  constructor({
    selection,
    history,
    config,
  }: {
    selection?: ISelectionState;
    history: IEditorHistory;
    config: IObservableValue<IEditorConfig> | IEditorConfig;
  }) {
    this.selection = selection;
    this.history = history;
    this.config = observableValue(config);
  }

  getConfig(): IEditorConfig {
    return this.config.get();
  }

  updateConfig(config: Partial<IEditorConfig>) {
    this.config.set({ ...this.config.get(), ...config });
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
