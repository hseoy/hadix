import { ISelectionState } from './types/core';

export class HadixSelectionState implements ISelectionState {
  constructor(
    public path: number[] = [],
    public anchor: number | null = null,
    public focus: number | null = null,
  ) {}

  updateSelectionPath(path: number[]): void {
    this.path = path;
  }
}
