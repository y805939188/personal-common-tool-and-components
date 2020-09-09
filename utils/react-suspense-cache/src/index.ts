import isEqual from 'lodash.isequal';

export type Cacheable = boolean | ((key: any) => boolean);

export interface Resource<Params, Params2> {
  read(cacheable?: Params2, key?: Params): any;
}

export type ErrorType = {
  res: any;
  err: true;
};

type PromiseFn = (params?: any) => Promise<any>;
type FilterFn = (params: any) => any;
class FetchData {
  private _fetch: PromiseFn;
  private _filter: FilterFn;
  private _cache: any;
  private _cache1: any;
  private _cache2: any = null;
  private _tempCacheData: any = null;
  private _prevParams: any[] = [];
  private _isFirst: boolean = true;
  private _status: number = 0;
  static _experimentApi: boolean = false;
  constructor(fetch: PromiseFn, filter?: FilterFn) {
    this._fetch = fetch;
    this._filter = filter || (p => p);
  }
  _throwPromiseWithTempData = (args: any[]) => {
    const promise = () => this._fetch(...args); // 需要吧参数都传给外部的自定义promise函数
    // 这里要通过额外的 _tempCacheData 变量保存上一次的结果
    // 因为 suspense 接收到 throw 的 promise 状态
    // 变为 resolve 或者 reject 之后 会重新执行调用了该方法的组件
    // 此时就需要将刚刚请求到的 result 返回 不能再走下面 throw 的步骤
    // 否则会死循环
    this._prevParams = [...args];
    throw promise().then((res) => {
      this._tempCacheData = res;
    }).catch((err) => {
      this._tempCacheData = { res: err, err: true };
    });
  }

  _throwPromiseWithCacheData = (args: any[]) => {
    const promise = args ? () => this._fetch(...args) : () => this._fetch();
    this._prevParams = [...args];
    throw promise().then((res) => {
      this._cache = res;
    }).catch((err) => {
      this._cache = { res: err, err: true };
    });
  }

  /**
   * TODO: 当同一个组件被重复引入的时候可能会造成冲突
   */

  /**
   * 缓存机制当前状态机设计:
   *    1. 若read方法只传了第一个参数, 若为false则不缓存, 若为true则直接缓存
   *    2. 若第一个参数为false, 且有后续参数, 不缓存, 后续参数作为 this._fetch 的参数
   *    3. 若第一个参数为true, 且有后续参数, 对后续每一个参数都做记录, 并作为 this._fetch 的参数
   *       当下一次触发时, 需判断本次传进来的后续参数是否和上一次的都一毛一样, 若都一样就走缓存, 不一样则重新执行 this._fetch
   */
  read = (cacheable: boolean = false, ...args: any[]) => {
    while(true) {
      switch (this._status) {
        // 状态 0 要判断是否需要缓存
        case 0: !!cacheable ? (this._status = 1) : (this._status = 2); break;
        // 状态 1 表示需要缓存 缓存的话需要判断前后两次的参数长度是否一样
        case 1: (this._prevParams.length !== args.length) ? (this._status = 3) : (this._status = 4); break;
        // 状态 2 表示不需要缓存 不需要缓存的话就要重新发送请求
        case 2: (this._status = 5) && this._throwPromiseWithTempData(args);
        // case 3 表示希望走缓存 但是前后两次参数的长度不一致, 所以需要重新发送请求
        case 3: (this._status = 7); break;
        // case 4 表示希望走缓存 并且前后参数长度一致 则需要判断两次参数的是否完全一样
        case 4:
          this._isFirst ? ((this._status = 7) && (this._isFirst = false)) :
            isEqual(this._prevParams, args) ? (this._status = 6) : (this._status = 7);
          break;
        // case 5 表示刚刚已经发送了一次请求并且拿到了结果 可以直接返回了
        case 5:
          const tempData = this._tempCacheData;
          this._tempCacheData = null;
          this._status = 0;
          return this._filter(tempData);
        // case 6 表示希望走缓存 并且前后两次的参数完全一致 这个时候可以直接把缓存值返回了
        case 6: (this._status = 0); return this._filter(this._cache);
        // case 7 表示希望走缓存 但是前后两次的参数有不一样的 此时需要重新返送请求
        case 7: (this._status = 8) && this._throwPromiseWithCacheData(args);
        case 8: (this._status = 0); return this._filter(this._cache);
        case 9: throw Error('unknow error');
      }
    }
  }

  /**
   * TODO: 缓存机制可能会重新设计
   */
  _read = (cacheable: ((key: any) => boolean) | boolean = true, key?: any) => {
    if (FetchData._experimentApi) {
      if (typeof cacheable === 'function' ? cacheable(key) : cacheable) {
        const prevData = key ? this._cache1[key] : this._cache2;
        if (prevData) return this._filter(prevData);
        const promise = key ? () => this._fetch(key) : () => this._fetch();
        throw promise().then((res) => {
          key ? (this._cache1[key] = res) : (this._cache2 = res);
        }).catch((err) => {
          const errObj = { res: err, err: true };
          key ? (this._cache1[key] = errObj) : (this._cache2 = errObj);
        });
      } else {
        if (this._tempCacheData) {
          const tempData = this._tempCacheData;
          this._tempCacheData = null;
          return this._filter(tempData);
        }
  
        const promise = () => this._fetch(key);
        throw promise().then((res) => {
          this._tempCacheData = res;
        }).catch((err) => {
          this._tempCacheData = { res: err, err: true };
        });
      }
    }
  }

}

const fetchData = (fetchFn: PromiseFn, filter?: FilterFn) => {
  return new FetchData(fetchFn, filter);
};

export default fetchData;
