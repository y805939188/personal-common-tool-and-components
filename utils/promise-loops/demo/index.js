
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var LoopPromise = /** @class */ (function () {
        function LoopPromise(promise) {
            var _this = this;
            this._params = [];
            this._time = 1000;
            this._index = 1;
            this._interrupt = 1;
            this._callbacks = [];
            this._status = 0;
            this._prev = null;
            this._filter = function (res) { return res; };
            this._trim1 = false;
            this._trim2 = false;
            this._params2 = [];
            this.initPromise = function (promise) {
                return function () { return (new Promise(function (resolve) {
                    var params = _this._params;
                    var params1 = params[0];
                    var timeoutId = setTimeout(function () {
                        var currentParams = !params1 ? [] : ((typeof params1 === 'function') ? [params1(_this._prev)] : params);
                        promise.apply(void 0, currentParams).then(function (res) { return _this._filter(res); })
                            .then(function (res) { _this._prev = res; resolve(res); })
                            .catch(function (err) { _this._prev = null; resolve('error'); });
                    }, _this._time);
                    _this.immediatelyInterrupt = _this._immediatelyInterrupt.bind(_this, timeoutId, resolve);
                    _this.clear = _this._clear.bind(_this, timeoutId, resolve);
                })); };
            };
            this.filterRes = function (cb) {
                _this._filter = cb;
                return _this;
            };
            this.params = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                _this._params = params;
                return _this;
            };
            this.time = function (time) {
                _this._time = time;
                return _this;
            };
            this.interruptTime = function (interrupt, trim) {
                if (trim === void 0) { trim = false; }
                (typeof interrupt === 'number' || typeof interrupt === 'function') ?
                    (_this._interrupt = interrupt) : (_this._interrupt = 1);
                _this._trim1 = trim;
                return _this;
            };
            this.callback = function (callback) {
                _this._callbacks.push(callback);
                return _this;
            };
            this.immediatelyInterrupt = function (timeoutId, reject, trim) {
                var params = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    params[_i - 3] = arguments[_i];
                }
                if (!_this._status)
                    return;
                _this._status = 0;
                if (!timeoutId || !reject)
                    return;
                _this._trim2 = !!trim;
                _this._params2 = params;
                clearTimeout(timeoutId);
                reject && reject('interrupted');
            };
            this.trim = function () { return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, this_1, state_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._status)
                                return [2 /*return*/];
                            this._status = 1;
                            _loop_1 = function () {
                                var currentRes, interrupt, callbacks;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this_1._promise()];
                                        case 1:
                                            currentRes = _a.sent();
                                            interrupt = this_1._interrupt;
                                            callbacks = this_1._callbacks;
                                            if (currentRes === 'error') {
                                                this_1._index = 0;
                                                this_1._status = 0;
                                                callbacks.forEach(function (fn) { return fn('error'); });
                                                return [2 /*return*/, "break"];
                                            }
                                            else if (currentRes === 'interrupted') {
                                                if (this_1._trim2)
                                                    callbacks.forEach(function (fn) { return fn.apply(void 0, _this._params2); });
                                                else if (this_1._trim1)
                                                    callbacks.forEach(function (fn) { return fn(currentRes); });
                                                this_1._status = 0;
                                                this_1._trim2 = false;
                                                this_1._params2 = null;
                                                return [2 /*return*/, "break"];
                                            }
                                            else if ((typeof interrupt === 'number' && this_1._index++ >= interrupt) ||
                                                (typeof interrupt === 'function' && !interrupt(currentRes))) {
                                                callbacks.forEach(function (fn) { return fn(currentRes); });
                                                this_1._status = 0;
                                                return [2 /*return*/, "break"];
                                            }
                                            else {
                                                callbacks.forEach(function (fn) { return fn(currentRes); });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _a.label = 1;
                        case 1:
                            return [5 /*yield**/, _loop_1()];
                        case 2:
                            state_1 = _a.sent();
                            if (state_1 === "break")
                                return [3 /*break*/, 3];
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            this.restart = function () {
                var interrupt = _this._interrupt;
                var prev = _this._prev;
                if ((typeof interrupt === 'number' && _this._index >= interrupt) ||
                    (typeof interrupt === 'function' && !interrupt(prev))) {
                    if (_this._trim1 || _this._trim2)
                        _this._callbacks.forEach(function (fn) { return fn(prev); });
                    return;
                }
                _this.trim();
            };
            this.clear = function (timeoutId, reject) {
                clearTimeout(timeoutId);
                reject && reject('interrupted');
                _this._params = [];
                _this._time = 1000;
                _this._index = 1;
                _this._interrupt = 1;
                _this._callbacks = [];
            };
            this._promise = this.initPromise(promise);
            this._immediatelyInterrupt = this.immediatelyInterrupt;
            this.immediatelyInterrupt = this.immediatelyInterrupt.bind(this, null, null);
            this._clear = this.clear;
        }
        return LoopPromise;
    }());

    var index = 0;
    var addPromise = function (params) { return (new Promise(function (res) {
        // console.log(++index)
        res(index++);
    })); };
    var loop = new LoopPromise(addPromise);
    var oDiv = document.querySelector('#console');
    var btn1 = document.querySelector('#btn1');
    var btn2 = document.querySelector('#btn2');
    btn1.addEventListener('click', function () {
        loop.restart();
    });
    btn2.addEventListener('click', function () {
        loop.immediatelyInterrupt();
    });
    loop
        .time(1000) // 每隔1秒触发一次
        .interruptTime(function (res) { return (res !== 10); }, true) // 当返回true的时候就一直loop
        .params(function () { return ('params'); }) // 设置参数
        .filterRes(function (res) { return res; }) // 统一处理resolved值
        .callback(function (res) { oDiv.innerHTML = oDiv.innerHTML + " " + res; }); // 回调
    loop.trim(); // 开始轮询promise
    //# sourceMappingURL=demo1.js.map

    var getProcess = (function () {
        var prevProcess = 0;
        var index = 1;
        return function () {
            var getRandom = function (process) {
                if (process >= 100)
                    return 100;
                index++;
                if (index > 50)
                    return (prevProcess = process + (index = 1));
                var currentProcess = (Math.random() * 100) | 0;
                return currentProcess > process ?
                    (index = 1) && (prevProcess = currentProcess) :
                    getRandom(prevProcess);
            };
            return getRandom(prevProcess);
        };
    })();
    //# sourceMappingURL=fakeProcess.js.map

    var fetchOriginData = function () { return (new Promise(function (resolved) {
        var result = getProcess();
        resolved(result);
    })); };
    var loop$1 = new LoopPromise(fetchOriginData);
    var oProgress1 = document.querySelector('#progress1');
    var oProgress2 = document.querySelector('#progress2');
    var btn1$1 = document.querySelector('#btn3');
    var btn2$1 = document.querySelector('#btn4');
    btn1$1.addEventListener('click', function () {
        loop$1.trim();
    });
    btn2$1.addEventListener('click', function () {
        loop$1.immediatelyInterrupt();
    });
    loop$1
        .time(2000)
        .interruptTime(function (res) { return res !== 100; })
        .callback(function (res) { return (oProgress1.innerHTML = "\u8FDB\u5EA6: " + res + "%") && oProgress2.setAttribute('value', res); });
    //# sourceMappingURL=demo2.js.map

})));
//# sourceMappingURL=index.js.map
