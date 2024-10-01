'use client';

import { IBlock } from '@/hadix-core/types/core';

interface UIBuilderBlockProps {
  block: IBlock;
}

export function UIBuilderBlock({ block }: UIBuilderBlockProps) {
  return <div>{block.type}</div>;
}
