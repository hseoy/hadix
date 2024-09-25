import { nanoid } from 'nanoid';
import { ITransaction, IDocument } from './types/core';

export class HadixTransaction implements ITransaction {
  public id: string;

  constructor(
    public action: string,
    public timestamp: Date,
    public beforeState: IDocument,
    public afterState: IDocument,
  ) {
    this.id = nanoid();
  }
}
