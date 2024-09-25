import { nanoid } from 'nanoid';
import { IDocument, IBlock, IDocumentMetadata } from './types/core';

export class HadixDocument implements IDocument {
  id: string;
  blocks: IBlock[];
  metadata?: IDocumentMetadata;

  constructor(blocks: IBlock[], metadata?: IDocumentMetadata) {
    this.id = nanoid();
    this.blocks = blocks;
    this.metadata = metadata;
  }

  // 문서 복제
  clone() {
    const newBlocks = this.blocks.map(block => ({ ...block }));
    const newMetadata = this.metadata ? { ...this.metadata } : undefined;
    return new HadixDocument(newBlocks, newMetadata);
  }

  // Metadata 조회
  getMetadata() {
    return this.metadata;
  }

  // Metadata 변경
  updateMetadata(metadata: IDocumentMetadata) {
    this.metadata = metadata;
  }

  // 블록 추가
  addBlock(block: IBlock) {
    this.blocks.push(block);
  }

  // 블록 제거
  removeBlock(blockId: string) {
    this.blocks = this.blocks.filter(block => block.id !== blockId);
  }

  // 블록 업데이트
  updateBlock(blockId: string, updatedBlock: Partial<IBlock>): void {
    const index = this.getBlockIndex(blockId);
    if (index !== -1) {
      this.blocks[index] = { ...this.blocks[index], ...updatedBlock };
    }
  }

  // 블록 조회
  getBlockById(blockId: string): IBlock | null {
    return this.blocks.find(block => block.id === blockId) || null;
  }

  // 블록 인덱스 조회
  getBlockIndex(blockId: string): number {
    return this.blocks.findIndex(block => block.id === blockId);
  }

  // 블록 전체 삭제
  clearBlocks(): void {
    this.blocks = [];
  }
}
