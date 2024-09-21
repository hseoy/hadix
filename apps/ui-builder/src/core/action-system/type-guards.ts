import { DynamicParam, ParamDefinition } from './types';

export const isDynamicParam = (
  value: ParamDefinition,
): value is DynamicParam => {
  const isDynamic =
    value &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'dynamic';
  return !!isDynamic;
};
