import { debounce as _debounce } from 'es-toolkit';

export const debounce: typeof _debounce = (func, wait) => {
  return _debounce(func, wait);
};
