type PromiseType = (...params: any[]) => Promise<any>;
class LoopPromise {
  private _promise: PromiseType;
  private _params: any[] = [];
  private _time: number = 1000;
  private _index: number = 1;
  private _interrupt: number | Function = 1;
  private _callbacks: Function[] = [];
  private _status: 0 | 1 = 0;
  private _prev: any = null;
  private _filter: (res: any) => any = res => res;
  private _trim1: boolean = false;
  private _trim2: boolean = false;
  private _params2: any = [];
  private _immediatelyInterrupt: any;
  private _clear: any;
  constructor(promise: PromiseType) {
    this._promise = this.initPromise(promise);
    this._immediatelyInterrupt = this.immediatelyInterrupt;
    this.immediatelyInterrupt = this.immediatelyInterrupt.bind(this, null, null);
    this._clear = this.clear;
  }

  private initPromise = (promise: PromiseType) => {
    return () => (new Promise((resolve) => {
      const params = this._params;
      const params1 = params[0];
      const timeoutId = setTimeout(() => {
        const currentParams = !params1 ? [] : (
          (typeof params1 === 'function') ? [params1(this._prev)] : params
        );
        promise(...currentParams)
          .then(res => this._filter(res))
          .then((res) => { this._prev = res; resolve(res); })
          .catch((err) => { this._prev = null; resolve('error'); });
      }, this._time);
      this.immediatelyInterrupt = this._immediatelyInterrupt.bind(this, timeoutId, resolve);
      this.clear = this._clear.bind(this, timeoutId, resolve);
    }));
  }

  public filterRes = (cb: (res: any) => any) => {
    this._filter = cb;
    return this;
  }

  public params = (...params: any[]) => {
    this._params = params;
    return this;
  }

  public time = (time: number) => {
    this._time = time;
    return this;
  }

  public interruptTime = (interrupt: ((p: any) => boolean) | number, trim: boolean = false) => {
    (typeof interrupt === 'number' || typeof interrupt === 'function') ?
    (this._interrupt = interrupt) : (this._interrupt = 1);
    this._trim1 = trim;
    return this;
  }

  public callback = (callback: (res: any) => void) => {
    this._callbacks.push(callback);
    return this;
  }

  public immediatelyInterrupt: any = (
    timeoutId?: any,
    reject?: (reason?: any) => void,
    trim?: boolean,
    ...params: any
  ) => {
    if (!this._status) return;
    this._status = 0;
    if (!timeoutId || !reject) return;
    this._trim2 = !!trim;
    this._params2 = params;
    clearTimeout(timeoutId);
    reject && reject('interrupted');
  }

  public trim = async () => {
    if (this._status) return;
    this._status = 1;
    while (true) {
      const currentRes = await this._promise();
      const interrupt = this._interrupt;
      const callbacks = this._callbacks;
      if (currentRes === 'error') {
        this._index = 0;
        this._status = 0;
        callbacks.forEach(fn => fn('error'));
        break;
      } else if (currentRes === 'interrupted') {
        if (this._trim2) callbacks.forEach(fn => fn(...this._params2));
        else if (this._trim1) callbacks.forEach(fn => fn(currentRes));
        this._status = 0;
        this._trim2 = false;
        this._params2 = null;
        break;
      } else if (
        (typeof interrupt === 'number' && this._index++ >= interrupt) ||
        (typeof interrupt === 'function' && !interrupt(currentRes))
      ) {
        callbacks.forEach(fn => fn(currentRes));
        this._status = 0;
        break;
      } else {
        callbacks.forEach(fn => fn(currentRes));
      }
    }
  }

  public restart = () => {
    const interrupt = this._interrupt;
    const prev = this._prev;
    if (
      (typeof interrupt === 'number' && this._index >= interrupt) ||
      (typeof interrupt === 'function' && !interrupt(prev))
    ) {
      if (this._trim1 || this._trim2) this._callbacks.forEach(fn => fn(prev));
      return;
    }
    this.trim();
  }

  public clear = (timeoutId?: any, reject?: (reason?: any) => void) => {
    clearTimeout(timeoutId);
    reject && reject('interrupted');
    this._params = [];
    this._time = 1000;
    this._index = 1;
    this._interrupt = 1;
    this._callbacks = [];
  }
}

export default LoopPromise;
