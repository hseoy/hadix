import { nanoid } from 'nanoid';
import { ITransaction, IDocument } from './types/core';

export class HadixTransaction implements ITransaction {
  public action: string;
  public beforeState: IDocument;
  public afterState: IDocument;
  public id: string;
  public timestamp: Date;

  constructor(action: string, beforeState: IDocument, afterState: IDocument) {
    this.action = action;
    this.beforeState = beforeState;
    this.afterState = afterState;
    this.timestamp = new Date();
    this.id = nanoid();
  }
}
