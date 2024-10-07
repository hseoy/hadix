import { ICommand, IEditorState } from './types/core';

export class HadixCommandExecutor {
  constructor(private editorState: IEditorState) {}

  execute(command: ICommand) {
    const newState = command.execute(this.editorState);
    this.editorState = newState;
    return newState;
  }
}
