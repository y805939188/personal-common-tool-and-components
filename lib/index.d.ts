declare type PromiseType = (...params: any[]) => Promise<any>;
declare class LoopPromise {
    private _promise;
    private _params;
    private _time;
    private _index;
    private _interrupt;
    private _callbacks;
    private _status;
    private _prev;
    private _filter;
    private _trim1;
    private _trim2;
    private _params2;
    private _immediatelyInterrupt;
    private _clear;
    constructor(promise: PromiseType);
    private initPromise;
    filterRes: (cb: (res: any) => any) => this;
    params: (...params: any[]) => this;
    time: (time: number) => this;
    interruptTime: (interrupt: number | ((p: any) => boolean), trim?: boolean) => this;
    callback: (callback: (res: any) => void) => this;
    immediatelyInterrupt: any;
    trim: () => Promise<void>;
    restart: () => void;
    clear: (timeoutId?: any, reject?: ((reason?: any) => void) | undefined) => void;
}
export default LoopPromise;