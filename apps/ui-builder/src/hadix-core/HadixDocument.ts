import { nanoid } from 'nanoid';
import { IDocument, IBlock, IDocumentMetadata } from './types/core';

export class HadixDocument implements IDocument {
  id: string;
  blocks: IBlock[];
  metadata: IDocumentMetadata;

  constructor(blocks: IBlock[], metadata: IDocumentMetadata) {
    this.id = nanoid();
    this.blocks = blocks;
    this.metadata = metadata;
  }

  // 문서 복제
  clone() {
    const newBlocks = this.blocks.map(block => ({ ...block }));
    return new HadixDocument(newBlocks, this.metadata);
  }

  // Metadata 조회
  getMetadata() {
    return this.metadata;
  }
}
