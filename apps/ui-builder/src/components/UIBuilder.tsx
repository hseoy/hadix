'use client';

import { useEffect, useRef } from 'react';
import { run } from '../core/example';

export function UIBuilder() {
  const rootElementRef = useRef<HTMLDivElement | null>(null);
  const isRunRef = useRef<boolean>(false);

  useEffect(() => {
    if (!rootElementRef.current) return;
    if (isRunRef.current) return;
    run(rootElementRef.current);
    isRunRef.current = true;
  }, [rootElementRef.current]);

  return <div id="hadix-application" ref={rootElementRef}></div>;
}
