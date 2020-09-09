export declare type Cacheable = boolean | ((key: any) => boolean);
export interface Resource<Params, Params2> {
    read(cacheable?: Params2, key?: Params): any;
}
export declare type ErrorType = {
    res: any;
    err: true;
};
declare type PromiseFn = (params?: any) => Promise<any>;
declare type FilterFn = (params: any) => any;
declare class FetchData {
    private _fetch;
    private _filter;
    private _cache;
    private _cache1;
    private _cache2;
    private _tempCacheData;
    private _prevParams;
    private _isFirst;
    private _status;
    static _experimentApi: boolean;
    constructor(fetch: PromiseFn, filter?: FilterFn);
    _throwPromiseWithTempData: (args: any[]) => never;
    _throwPromiseWithCacheData: (args: any[]) => never;
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
    read: (cacheable?: boolean, ...args: any[]) => any;
    /**
     * TODO: 缓存机制可能会重新设计
     */
    _read: (cacheable?: boolean | ((key: any) => boolean), key?: any) => any;
}
declare const fetchData: (fetchFn: PromiseFn, filter?: FilterFn) => FetchData;
export default fetchData;
