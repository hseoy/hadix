import { ComponentDefinition } from '@/_deprecated/core/component-system/types';

interface ComponentTreeProps {
  componentTree: ComponentDefinition | null;
  depth?: number;
}

export function ComponentTree({
  componentTree,
  depth = 0,
}: ComponentTreeProps) {
  return (
    // 재귀적으로 트리 구조 UI 구현
    // depth가 깊어지면 들여쓰기 추가
    <div className="flex flex-col gap-2 pl-2">
      <span className="text-sm text-gray-500">{componentTree?.type}</span>
      {componentTree?.children?.map(child => (
        <ComponentTree key={child.id} componentTree={child} depth={depth + 1} />
      ))}
    </div>
  );
}
