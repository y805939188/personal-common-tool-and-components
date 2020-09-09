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
  private _cache1: { [propName: string]: any } = {};
  private _cache2: any = null;
  private _noCacheData: any = null;
  constructor(fetch: PromiseFn, filter?: FilterFn) {
    this._fetch = fetch;
    this._filter = filter || (p => p);
  }
  read = (cacheable: ((key: any) => boolean) | boolean = true, key?: any) => {
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
      if (this._noCacheData) {
        const tempData = this._noCacheData;
        this._noCacheData = null;
        return this._filter(tempData);
      }

      const promise = () => this._fetch(key);
      throw promise().then((res) => {
        this._noCacheData = res;
      }).catch((err) => {
        this._noCacheData = { res: err, err: true };
      });
    }
  }
}

const fetchData = (fetchFn: PromiseFn, filter?: FilterFn) => {
  return new FetchData(fetchFn, filter);
};

export default fetchData;
