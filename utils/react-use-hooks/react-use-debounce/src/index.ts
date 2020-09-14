import { useMemo } from 'react';
import debounce from 'lodash.debounce';

const useDebouncedCallback = (fn: (...a: any) => any, timeout: number) => (useMemo(() => {
  return [debounce(fn, timeout)];
}, []));

export default useDebouncedCallback;
