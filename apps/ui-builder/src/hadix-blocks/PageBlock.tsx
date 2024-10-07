import {
  IBlock,
  IBlockEditorProperties,
  IBlockProperties,
} from '@/hadix-core/types/core';
import { nanoid } from 'nanoid';

export interface IPageBlockProperties extends IBlockProperties {
  backgroundColor: string;
}

export interface IPageBlock extends IBlock {
  id: string;
  type: 'page';
  content: null;
  children: IBlock[];
  properties: IPageBlockProperties;
  editorProperties: IBlockEditorProperties;
}

export class PageBlock implements IPageBlock {
  readonly type = 'page';
  readonly content = null;
  readonly id: string;
  readonly editorProperties: IBlockEditorProperties;
  children: IBlock[];
  properties: IPageBlockProperties;

  constructor(
    children: IBlock[],
    properties: IPageBlockProperties,
    editorProperties: IBlockEditorProperties,
  ) {
    this.id = nanoid();
    this.children = children;
    this.properties = properties;
    this.editorProperties = editorProperties;
  }

  serialize(isEditor?: boolean) {
    return JSON.stringify({
      type: this.type,
      id: this.id,
      content: this.content,
      children: this.children,
      properties: this.properties,
      ...(isEditor ? { editorProperties: this.editorProperties } : {}),
    });
  }
}
