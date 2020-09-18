declare type CallbackType = <S>(prevState: S, currentState: S) => void;
declare const useStateWithCallback: <T>(initState: T) => [T, (newState: T, b?: CallbackType) => void];
export default useStateWithCallback;
