!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("react")):"function"==typeof define&&define.amd?define(["react"],r):"object"==typeof exports?exports["react-use-state-with-callback"]=r(require("react")):t["react-use-state-with-callback"]=r(t.react)}(window,(function(t){return function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="",n(n.s=39)}([function(t,r,n){(function(r){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof r&&r)||Function("return this")()}).call(this,n(45))},function(t,r){var n={}.hasOwnProperty;t.exports=function(t,r){return n.call(t,r)}},function(t,r,n){var e=n(6),o=n(16),i=n(12);t.exports=e?function(t,r,n){return o.f(t,r,i(1,n))}:function(t,r,n){return t[r]=n,t}},function(t,r,n){var e=n(0),o=n(29),i=n(1),u=n(30),c=n(34),a=n(64),f=o("wks"),s=e.Symbol,p=a?s:s&&s.withoutSetter||u;t.exports=function(t){return i(f,t)||(c&&i(s,t)?f[t]=s[t]:f[t]=p("Symbol."+t)),f[t]}},function(t,r){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,r){t.exports={}},function(t,r,n){var e=n(4);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,r){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,r,n){var e=n(7);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},function(r,n){r.exports=t},function(t,r,n){var e=n(48),o=n(14);t.exports=function(t){return e(o(t))}},function(t,r,n){var e=n(21),o=n(13),i=n(3)("toStringTag"),u="Arguments"==o(function(){return arguments}());t.exports=e?o:function(t){var r,n,e;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,r){try{return t[r]}catch(t){}}(r=Object(t),i))?n:u?o(r):"Object"==(e=o(r))&&"function"==typeof r.callee?"Arguments":e}},function(t,r){t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},function(t,r){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,r){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,r){t.exports={}},function(t,r,n){var e=n(6),o=n(24),i=n(8),u=n(23),c=Object.defineProperty;r.f=e?c:function(t,r,n){if(i(t),r=u(r,!0),i(n),o)try{return c(t,r,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[r]=n.value),t}},function(t,r,n){var e=n(29),o=n(30),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,r){t.exports=!0},function(t,r){t.exports={}},function(t,r){var n=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:n)(t)}},function(t,r,n){var e={};e[n(3)("toStringTag")]="z",t.exports="[object z]"===String(e)},function(t,r,n){"use strict";var e=n(0),o=n(46).f,i=n(49),u=n(15),c=n(50),a=n(2),f=n(1),s=function(t){var r=function(r,n,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(r);case 2:return new t(r,n)}return new t(r,n,e)}return t.apply(this,arguments)};return r.prototype=t.prototype,r};t.exports=function(t,r){var n,p,l,v,y,h,d,x,g=t.target,b=t.global,S=t.stat,m=t.proto,O=b?e:S?e[g]:(e[g]||{}).prototype,j=b?u:u[g]||(u[g]={}),w=j.prototype;for(l in r)n=!i(b?l:g+(S?".":"#")+l,t.forced)&&O&&f(O,l),y=j[l],n&&(h=t.noTargetGet?(x=o(O,l))&&x.value:O[l]),v=n&&h?h:r[l],n&&typeof y==typeof v||(d=t.bind&&n?c(v,e):t.wrap&&n?s(v):m&&"function"==typeof v?c(Function.call,v):v,(t.sham||v&&v.sham||y&&y.sham)&&a(d,"sham",!0),j[l]=d,m&&(f(u,p=g+"Prototype")||a(u,p,{}),u[p][l]=v,t.real&&w&&!w[l]&&a(w,l,v)))}},function(t,r,n){var e=n(7);t.exports=function(t,r){if(!e(t))return t;var n,o;if(r&&"function"==typeof(n=t.toString)&&!e(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!e(o=n.call(t)))return o;if(!r&&"function"==typeof(n=t.toString)&&!e(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,r,n){var e=n(6),o=n(4),i=n(25);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,r,n){var e=n(0),o=n(7),i=e.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,r,n){n(56);var e=n(78),o=n(0),i=n(11),u=n(2),c=n(5),a=n(3)("toStringTag");for(var f in e){var s=o[f],p=s&&s.prototype;p&&i(p)!==a&&u(p,a,f),c[f]=c.Array}},function(t,r,n){var e,o,i,u=n(58),c=n(0),a=n(7),f=n(2),s=n(1),p=n(17),l=n(19),v=c.WeakMap;if(u){var y=new v,h=y.get,d=y.has,x=y.set;e=function(t,r){return x.call(y,t,r),r},o=function(t){return h.call(y,t)||{}},i=function(t){return d.call(y,t)}}else{var g=p("state");l[g]=!0,e=function(t,r){return f(t,g,r),r},o=function(t){return s(t,g)?t[g]:{}},i=function(t){return s(t,g)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(r){var n;if(!a(r)||(n=o(r)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,r,n){var e=n(0),o=n(60),i=e["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,r,n){var e=n(18),o=n(28);(t.exports=function(t,r){return o[t]||(o[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.6.4",mode:e?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,r){var n=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+e).toString(36)}},function(t,r,n){"use strict";var e=n(22),o=n(61),i=n(33),u=n(75),c=n(36),a=n(2),f=n(77),s=n(3),p=n(18),l=n(5),v=n(32),y=v.IteratorPrototype,h=v.BUGGY_SAFARI_ITERATORS,d=s("iterator"),x=function(){return this};t.exports=function(t,r,n,s,v,g,b){o(n,r,s);var S,m,O,j=function(t){if(t===v&&P)return P;if(!h&&t in T)return T[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},w=r+" Iterator",A=!1,T=t.prototype,_=T[d]||T["@@iterator"]||v&&T[v],P=!h&&_||j(v),L="Array"==r&&T.entries||_;if(L&&(S=i(L.call(new t)),y!==Object.prototype&&S.next&&(p||i(S)===y||(u?u(S,y):"function"!=typeof S[d]&&a(S,d,x)),c(S,w,!0,!0),p&&(l[w]=x))),"values"==v&&_&&"values"!==_.name&&(A=!0,P=function(){return _.call(this)}),p&&!b||T[d]===P||a(T,d,P),l[r]=P,v)if(m={values:j("values"),keys:g?P:j("keys"),entries:j("entries")},b)for(O in m)!h&&!A&&O in T||f(T,O,m[O]);else e({target:r,proto:!0,forced:h||A},m);return m}},function(t,r,n){"use strict";var e,o,i,u=n(33),c=n(2),a=n(1),f=n(3),s=n(18),p=f("iterator"),l=!1;[].keys&&("next"in(i=[].keys())?(o=u(u(i)))!==Object.prototype&&(e=o):l=!0),null==e&&(e={}),s||a(e,p)||c(e,p,(function(){return this})),t.exports={IteratorPrototype:e,BUGGY_SAFARI_ITERATORS:l}},function(t,r,n){var e=n(1),o=n(62),i=n(17),u=n(63),c=i("IE_PROTO"),a=Object.prototype;t.exports=u?Object.getPrototypeOf:function(t){return t=o(t),e(t,c)?t[c]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,r,n){var e=n(4);t.exports=!!Object.getOwnPropertySymbols&&!e((function(){return!String(Symbol())}))},function(t,r){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,r,n){var e=n(21),o=n(16).f,i=n(2),u=n(1),c=n(74),a=n(3)("toStringTag");t.exports=function(t,r,n,f){if(t){var s=n?t:t.prototype;u(s,a)||o(s,a,{configurable:!0,value:r}),f&&!e&&i(s,"toString",c)}}},function(t,r,n){"use strict";var e=n(79).charAt,o=n(27),i=n(31),u=o.set,c=o.getterFor("String Iterator");i(String,"String",(function(t){u(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,r=c(this),n=r.string,o=r.index;return o>=n.length?{value:void 0,done:!0}:(t=e(n,o),r.index+=t.length,{value:t,done:!1})}))},function(t,r,n){var e=n(40),o=n(53),i=n(85);t.exports=function(t,r){return e(t)||o(t,r)||i()}},function(t,r,n){"use strict";n.r(r);var e=n(38),o=n.n(e),i=n(9),u=function(){};r.default=function(t){console.warn("\n    Although you can use hooks with callback function,\n    but I don’t recommend it unless it’s really necessary.\n    If you have doubts about this, you can refer to this issue:\n      https://github.com/reactjs/rfcs/issues/98#issuecomment-479188615\n  ");var r=Object(i.useState)(t),n=o()(r,2),e=n[0],c=n[1],a=Object(i.useRef)(u),f=Object(i.useRef)(e);return Object(i.useLayoutEffect)((function(){return a.current(f.current,e)}),[e]),[e,function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;return f.current=e,(a.current=r)&&c(t)}]}},function(t,r,n){var e=n(41);t.exports=function(t){if(e(t))return t}},function(t,r,n){t.exports=n(42)},function(t,r,n){var e=n(43);t.exports=e},function(t,r,n){n(44);var e=n(15);t.exports=e.Array.isArray},function(t,r,n){n(22)({target:"Array",stat:!0},{isArray:n(52)})},function(t,r){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,r,n){var e=n(6),o=n(47),i=n(12),u=n(10),c=n(23),a=n(1),f=n(24),s=Object.getOwnPropertyDescriptor;r.f=e?s:function(t,r){if(t=u(t),r=c(r,!0),f)try{return s(t,r)}catch(t){}if(a(t,r))return i(!o.f.call(t,r),t[r])}},function(t,r,n){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);r.f=i?function(t){var r=o(this,t);return!!r&&r.enumerable}:e},function(t,r,n){var e=n(4),o=n(13),i="".split;t.exports=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,r,n){var e=n(4),o=/#|\.prototype\./,i=function(t,r){var n=c[u(t)];return n==f||n!=a&&("function"==typeof r?e(r):!!r)},u=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=i.data={},a=i.NATIVE="N",f=i.POLYFILL="P";t.exports=i},function(t,r,n){var e=n(51);t.exports=function(t,r,n){if(e(t),void 0===r)return t;switch(n){case 0:return function(){return t.call(r)};case 1:return function(n){return t.call(r,n)};case 2:return function(n,e){return t.call(r,n,e)};case 3:return function(n,e,o){return t.call(r,n,e,o)}}return function(){return t.apply(r,arguments)}}},function(t,r){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,r,n){var e=n(13);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,r,n){var e=n(54),o=n(82);t.exports=function(t,r){if(o(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t)){var n=[],i=!0,u=!1,c=void 0;try{for(var a,f=e(t);!(i=(a=f.next()).done)&&(n.push(a.value),!r||n.length!==r);i=!0);}catch(t){u=!0,c=t}finally{try{i||null==f.return||f.return()}finally{if(u)throw c}}return n}}},function(t,r,n){t.exports=n(55)},function(t,r,n){n(26),n(37);var e=n(80);t.exports=e},function(t,r,n){"use strict";var e=n(10),o=n(57),i=n(5),u=n(27),c=n(31),a=u.set,f=u.getterFor("Array Iterator");t.exports=c(Array,"Array",(function(t,r){a(this,{type:"Array Iterator",target:e(t),index:0,kind:r})}),(function(){var t=f(this),r=t.target,n=t.kind,e=t.index++;return!r||e>=r.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:e,done:!1}:"values"==n?{value:r[e],done:!1}:{value:[e,r[e]],done:!1}}),"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,r){t.exports=function(){}},function(t,r,n){var e=n(0),o=n(59),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,r,n){var e=n(28),o=Function.toString;"function"!=typeof e.inspectSource&&(e.inspectSource=function(t){return o.call(t)}),t.exports=e.inspectSource},function(t,r,n){var e=n(0),o=n(2);t.exports=function(t,r){try{o(e,t,r)}catch(n){e[t]=r}return r}},function(t,r,n){"use strict";var e=n(32).IteratorPrototype,o=n(65),i=n(12),u=n(36),c=n(5),a=function(){return this};t.exports=function(t,r,n){var f=r+" Iterator";return t.prototype=o(e,{next:i(1,n)}),u(t,f,!1,!0),c[f]=a,t}},function(t,r,n){var e=n(14);t.exports=function(t){return Object(e(t))}},function(t,r,n){var e=n(4);t.exports=!e((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},function(t,r,n){var e=n(34);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,r,n){var e,o=n(8),i=n(66),u=n(35),c=n(19),a=n(72),f=n(25),s=n(17),p=s("IE_PROTO"),l=function(){},v=function(t){return"<script>"+t+"<\/script>"},y=function(){try{e=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,r;y=e?function(t){t.write(v("")),t.close();var r=t.parentWindow.Object;return t=null,r}(e):((r=f("iframe")).style.display="none",a.appendChild(r),r.src=String("javascript:"),(t=r.contentWindow.document).open(),t.write(v("document.F=Object")),t.close(),t.F);for(var n=u.length;n--;)delete y.prototype[u[n]];return y()};c[p]=!0,t.exports=Object.create||function(t,r){var n;return null!==t?(l.prototype=o(t),n=new l,l.prototype=null,n[p]=t):n=y(),void 0===r?n:i(n,r)}},function(t,r,n){var e=n(6),o=n(16),i=n(8),u=n(67);t.exports=e?Object.defineProperties:function(t,r){i(t);for(var n,e=u(r),c=e.length,a=0;c>a;)o.f(t,n=e[a++],r[n]);return t}},function(t,r,n){var e=n(68),o=n(35);t.exports=Object.keys||function(t){return e(t,o)}},function(t,r,n){var e=n(1),o=n(10),i=n(69).indexOf,u=n(19);t.exports=function(t,r){var n,c=o(t),a=0,f=[];for(n in c)!e(u,n)&&e(c,n)&&f.push(n);for(;r.length>a;)e(c,n=r[a++])&&(~i(f,n)||f.push(n));return f}},function(t,r,n){var e=n(10),o=n(70),i=n(71),u=function(t){return function(r,n,u){var c,a=e(r),f=o(a.length),s=i(u,f);if(t&&n!=n){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===n)return t||s||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},function(t,r,n){var e=n(20),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,r,n){var e=n(20),o=Math.max,i=Math.min;t.exports=function(t,r){var n=e(t);return n<0?o(n+r,0):i(n,r)}},function(t,r,n){var e=n(73);t.exports=e("document","documentElement")},function(t,r,n){var e=n(15),o=n(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,r){return arguments.length<2?i(e[t])||i(o[t]):e[t]&&e[t][r]||o[t]&&o[t][r]}},function(t,r,n){"use strict";var e=n(21),o=n(11);t.exports=e?{}.toString:function(){return"[object "+o(this)+"]"}},function(t,r,n){var e=n(8),o=n(76);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),r=n instanceof Array}catch(t){}return function(n,i){return e(n),o(i),r?t.call(n,i):n.__proto__=i,n}}():void 0)},function(t,r,n){var e=n(7);t.exports=function(t){if(!e(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,r,n){var e=n(2);t.exports=function(t,r,n,o){o&&o.enumerable?t[r]=n:e(t,r,n)}},function(t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,r,n){var e=n(20),o=n(14),i=function(t){return function(r,n){var i,u,c=String(o(r)),a=e(n),f=c.length;return a<0||a>=f?t?"":void 0:(i=c.charCodeAt(a))<55296||i>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},function(t,r,n){var e=n(8),o=n(81);t.exports=function(t){var r=o(t);if("function"!=typeof r)throw TypeError(String(t)+" is not iterable");return e(r.call(t))}},function(t,r,n){var e=n(11),o=n(5),i=n(3)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[e(t)]}},function(t,r,n){t.exports=n(83)},function(t,r,n){n(26),n(37);var e=n(84);t.exports=e},function(t,r,n){var e=n(11),o=n(3),i=n(5),u=o("iterator");t.exports=function(t){var r=Object(t);return void 0!==r[u]||"@@iterator"in r||i.hasOwnProperty(e(r))}},function(t,r){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}}])}));
//# sourceMappingURL=index.js.map