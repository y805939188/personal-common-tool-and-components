(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.promiseLoop = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class LoopPromise {
        constructor(promise) {
            this._params = [];
            this._time = 1000;
            this._index = 1;
            this._interrupt = 1;
            this._callbacks = [];
            this._status = 0;
            this._prev = null;
            this._filter = res => res;
            this._trim1 = false;
            this._trim2 = false;
            this._params2 = [];
            this.initPromise = (promise) => {
                return () => (new Promise((resolve) => {
                    const params = this._params;
                    const params1 = params[0];
                    const timeoutId = setTimeout(() => {
                        const currentParams = !params1 ? [] : ((typeof params1 === 'function') ? [params1(this._prev)] : params);
                        promise(...currentParams)
                            .then(res => this._filter(res))
                            .then((res) => { this._prev = res; resolve(res); })
                            .catch((err) => { this._prev = null; resolve('error'); });
                    }, this._time);
                    this.immediatelyInterrupt = this._immediatelyInterrupt.bind(this, timeoutId, resolve);
                    this.clear = this._clear.bind(this, timeoutId, resolve);
                }));
            };
            this.filterRes = (cb) => {
                this._filter = cb;
                return this;
            };
            this.params = (...params) => {
                this._params = params;
                return this;
            };
            this.time = (time) => {
                this._time = time;
                return this;
            };
            this.interruptTime = (interrupt, trim = false) => {
                (typeof interrupt === 'number' || typeof interrupt === 'function') ?
                    (this._interrupt = interrupt) : (this._interrupt = 1);
                this._trim1 = trim;
                return this;
            };
            this.callback = (callback) => {
                this._callbacks.push(callback);
                return this;
            };
            this.immediatelyInterrupt = (timeoutId, reject, trim, ...params) => {
                if (!this._status)
                    return;
                this._status = 0;
                if (!timeoutId || !reject)
                    return;
                this._trim2 = !!trim;
                this._params2 = params;
                clearTimeout(timeoutId);
                reject && reject('interrupted');
            };
            this.trim = () => __awaiter(this, void 0, void 0, function* () {
                if (this._status)
                    return;
                this._status = 1;
                while (true) {
                    const currentRes = yield this._promise();
                    const interrupt = this._interrupt;
                    const callbacks = this._callbacks;
                    if (currentRes === 'error') {
                        this._index = 0;
                        this._status = 0;
                        callbacks.forEach(fn => fn('error'));
                        break;
                    }
                    else if (currentRes === 'interrupted') {
                        if (this._trim2)
                            callbacks.forEach(fn => fn(...this._params2));
                        else if (this._trim1)
                            callbacks.forEach(fn => fn(currentRes));
                        this._status = 0;
                        this._trim2 = false;
                        this._params2 = null;
                        break;
                    }
                    else if ((typeof interrupt === 'number' && this._index++ >= interrupt) ||
                        (typeof interrupt === 'function' && !interrupt(currentRes))) {
                        callbacks.forEach(fn => fn(currentRes));
                        this._status = 0;
                        break;
                    }
                    else {
                        callbacks.forEach(fn => fn(currentRes));
                    }
                }
            });
            this.restart = () => {
                const interrupt = this._interrupt;
                const prev = this._prev;
                if ((typeof interrupt === 'number' && this._index >= interrupt) ||
                    (typeof interrupt === 'function' && !interrupt(prev))) {
                    if (this._trim1 || this._trim2)
                        this._callbacks.forEach(fn => fn(prev));
                    return;
                }
                this.trim();
            };
            this.clear = (timeoutId, reject) => {
                clearTimeout(timeoutId);
                reject && reject('interrupted');
                this._params = [];
                this._time = 1000;
                this._index = 1;
                this._interrupt = 1;
                this._callbacks = [];
            };
            this._promise = this.initPromise(promise);
            this._immediatelyInterrupt = this.immediatelyInterrupt;
            this.immediatelyInterrupt = this.immediatelyInterrupt.bind(this, null, null);
            this._clear = this.clear;
        }
    }

    return LoopPromise;

})));
//# sourceMappingURL=index.js.map
