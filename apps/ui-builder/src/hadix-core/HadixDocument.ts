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
  clone({
    blocks,
    metadata,
  }: {
    blocks?: IBlock[];
    metadata?: Partial<IDocumentMetadata>;
  }) {
    const newBlocks = blocks ?? this.blocks.map(block => ({ ...block }));
    return new HadixDocument(newBlocks, {
      ...this.metadata,
      ...(metadata ? metadata : {}),
    });
  }

  // Metadata 조회
  getMetadata() {
    return this.metadata;
  }

  serialize(isEditor?: boolean) {
    const serializedBlocks = this.blocks.map(block =>
      block.serialize(isEditor),
    );

    return JSON.stringify({
      id: this.id,
      metadata: this.metadata,
      blocks: serializedBlocks,
    });
  }
}
