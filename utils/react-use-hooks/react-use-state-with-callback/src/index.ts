import { useState, useRef, useLayoutEffect } from 'react';

type CallbackType = <S>(prevState: S, currentState: S) => void;

const noop = () => {};
const useStateWithCallback = <T>(initState: T): [T, (newState: T, b?: CallbackType) => void] => {
  console.warn(`
    Although you can use hooks with callback function,
    but I don’t recommend it unless it’s really necessary.
    If you have doubts about this, you can refer to this issue:
      https://github.com/reactjs/rfcs/issues/98#issuecomment-479188615
  `);
  const [state, setState] = useState<T>(initState);
  const cbRef = useRef<CallbackType>(noop);
  const prevStateRef = useRef<T>(state);
  const setStateWithCB = (ns: T, cb: CallbackType = noop): void =>
    ((prevStateRef.current = state) || true) && (cbRef.current = cb) && setState(ns);
  useLayoutEffect(() => cbRef.current(prevStateRef.current, state), [state]);
  return [state, setStateWithCB];
}

export default useStateWithCallback;
