/*!
 * basket.js
 * v0.5.2 - 2015-02-07
 * http://addyosmani.github.com/basket.js
 * (c) Addy Osmani;  License
 * Created by: Addy Osmani, Sindre Sorhus, Andrée Hansson, Mat Scales
 * Contributors: Ironsjp, Mathias Bynens, Rick Waldron, Felipe Morais
 * Uses rsvp.js, https://github.com/tildeio/rsvp.js
 */
(function(){"use strict";function a(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function b(a){var b=a._promiseCallbacks;return b||(b=a._promiseCallbacks={}),b}function c(a,b){return"onerror"===a?void rb.on("error",b):2!==arguments.length?rb[a]:void(rb[a]=b)}function d(a){return"function"==typeof a||"object"==typeof a&&null!==a}function e(a){return"function"==typeof a}function f(a){return"object"==typeof a&&null!==a}function g(){}function h(){setTimeout(function(){for(var a,b=0;b<wb.length;b++){a=wb[b];var c=a.payload;c.guid=c.key+c.id,c.childGuid=c.key+c.childId,c.error&&(c.stack=c.error.stack),rb.trigger(a.name,a.payload)}wb.length=0},50)}function i(a,b,c){1===wb.push({name:a,payload:{key:b._guidKey,id:b._id,eventName:a,detail:b._result,childId:c&&c._id,label:b._label,timeStamp:ub(),error:rb["instrument-with-stack"]?new Error(b._label):null}})&&h()}function j(){return new TypeError("A promises callback cannot return that same promise.")}function k(){}function l(a){try{return a.then}catch(b){return Bb.error=b,Bb}}function m(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function n(a,b,c){rb.async(function(a){var d=!1,e=m(c,b,function(c){d||(d=!0,b!==c?q(a,c):s(a,c))},function(b){d||(d=!0,t(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,t(a,e))},a)}function o(a,b){b._state===zb?s(a,b._result):b._state===Ab?(b._onError=null,t(a,b._result)):u(b,void 0,function(c){b!==c?q(a,c):s(a,c)},function(b){t(a,b)})}function p(a,b){if(b.constructor===a.constructor)o(a,b);else{var c=l(b);c===Bb?t(a,Bb.error):void 0===c?s(a,b):e(c)?n(a,b,c):s(a,b)}}function q(a,b){a===b?s(a,b):d(b)?p(a,b):s(a,b)}function r(a){a._onError&&a._onError(a._result),v(a)}function s(a,b){a._state===yb&&(a._result=b,a._state=zb,0===a._subscribers.length?rb.instrument&&xb("fulfilled",a):rb.async(v,a))}function t(a,b){a._state===yb&&(a._state=Ab,a._result=b,rb.async(r,a))}function u(a,b,c,d){var e=a._subscribers,f=e.length;a._onError=null,e[f]=b,e[f+zb]=c,e[f+Ab]=d,0===f&&a._state&&rb.async(v,a)}function v(a){var b=a._subscribers,c=a._state;if(rb.instrument&&xb(c===zb?"fulfilled":"rejected",a),0!==b.length){for(var d,e,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?y(c,d,e,f):e(f);a._subscribers.length=0}}function w(){this.error=null}function x(a,b){try{return a(b)}catch(c){return Cb.error=c,Cb}}function y(a,b,c,d){var f,g,h,i,k=e(c);if(k){if(f=x(c,d),f===Cb?(i=!0,g=f.error,f=null):h=!0,b===f)return void t(b,j())}else f=d,h=!0;b._state!==yb||(k&&h?q(b,f):i?t(b,g):a===zb?s(b,f):a===Ab&&t(b,f))}function z(a,b){var c=!1;try{b(function(b){c||(c=!0,q(a,b))},function(b){c||(c=!0,t(a,b))})}catch(d){t(a,d)}}function A(a,b,c){return a===zb?{state:"fulfilled",value:c}:{state:"rejected",reason:c}}function B(a,b,c,d){this._instanceConstructor=a,this.promise=new a(k,d),this._abortOnReject=c,this._validateInput(b)?(this._input=b,this.length=b.length,this._remaining=b.length,this._init(),0===this.length?s(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&s(this.promise,this._result))):t(this.promise,this._validationError())}function C(a,b){return new Db(this,a,!0,b).promise}function D(a,b){function c(a){q(f,a)}function d(a){t(f,a)}var e=this,f=new e(k,b);if(!tb(a))return t(f,new TypeError("You must pass an array to race.")),f;for(var g=a.length,h=0;f._state===yb&&g>h;h++)u(e.resolve(a[h]),void 0,c,d);return f}function E(a,b){var c=this;if(a&&"object"==typeof a&&a.constructor===c)return a;var d=new c(k,b);return q(d,a),d}function F(a,b){var c=this,d=new c(k,b);return t(d,a),d}function G(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function H(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function I(a,b){this._id=Jb++,this._label=b,this._state=void 0,this._result=void 0,this._subscribers=[],rb.instrument&&xb("created",this),k!==a&&(e(a)||G(),this instanceof I||H(),z(this,a))}function J(){this.value=void 0}function K(a){try{return a.then}catch(b){return Lb.value=b,Lb}}function L(a,b,c){try{a.apply(b,c)}catch(d){return Lb.value=d,Lb}}function M(a,b){for(var c,d,e={},f=a.length,g=new Array(f),h=0;f>h;h++)g[h]=a[h];for(d=0;d<b.length;d++)c=b[d],e[c]=g[d+1];return e}function N(a){for(var b=a.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=a[d];return c}function O(a,b){return{then:function(c,d){return a.call(b,c,d)}}}function P(a,b){var c=function(){for(var c,d=this,e=arguments.length,f=new Array(e+1),g=!1,h=0;e>h;++h){if(c=arguments[h],!g){if(g=S(c),g===Mb){var i=new Kb(k);return t(i,Mb.value),i}g&&g!==!0&&(c=O(g,c))}f[h]=c}var j=new Kb(k);return f[e]=function(a,c){a?t(j,a):void 0===b?q(j,c):b===!0?q(j,N(arguments)):tb(b)?q(j,M(arguments,b)):q(j,c)},g?R(j,f,a,d):Q(j,f,a,d)};return c.__proto__=a,c}function Q(a,b,c,d){var e=L(c,d,b);return e===Lb&&t(a,e.value),a}function R(a,b,c,d){return Kb.all(b).then(function(b){var e=L(c,d,b);return e===Lb&&t(a,e.value),a})}function S(a){return a&&"object"==typeof a?a.constructor===Kb?!0:K(a):!1}function T(a,b){return Kb.all(a,b)}function U(a,b,c){this._superConstructor(a,b,!1,c)}function V(a,b){return new U(Kb,a,b).promise}function W(a,b){return Kb.race(a,b)}function X(a,b,c){this._superConstructor(a,b,!0,c)}function Y(a,b){return new Rb(Kb,a,b).promise}function Z(a,b,c){this._superConstructor(a,b,!1,c)}function $(a,b){return new Z(Kb,a,b).promise}function _(a){throw setTimeout(function(){throw a}),a}function ab(a){var b={};return b.promise=new Kb(function(a,c){b.resolve=a,b.reject=c},a),b}function bb(a,b,c){return Kb.all(a,c).then(function(a){if(!e(b))throw new TypeError("You must pass a function as map's second argument.");for(var d=a.length,f=new Array(d),g=0;d>g;g++)f[g]=b(a[g]);return Kb.all(f,c)})}function cb(a,b){return Kb.resolve(a,b)}function db(a,b){return Kb.reject(a,b)}function eb(a,b,c){return Kb.all(a,c).then(function(a){if(!e(b))throw new TypeError("You must pass a function as filter's second argument.");for(var d=a.length,f=new Array(d),g=0;d>g;g++)f[g]=b(a[g]);return Kb.all(f,c).then(function(b){for(var c=new Array(d),e=0,f=0;d>f;f++)b[f]&&(c[e]=a[f],e++);return c.length=e,c})})}function fb(a,b){gc[_b]=a,gc[_b+1]=b,_b+=2,2===_b&&Tb()}function gb(){var a=process.nextTick,b=process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(b)&&"0"===b[1]&&"10"===b[2]&&(a=setImmediate),function(){a(lb)}}function hb(){return function(){vertxNext(lb)}}function ib(){var a=0,b=new dc(lb),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function jb(){var a=new MessageChannel;return a.port1.onmessage=lb,function(){a.port2.postMessage(0)}}function kb(){return function(){setTimeout(lb,1)}}function lb(){for(var a=0;_b>a;a+=2){var b=gc[a],c=gc[a+1];b(c),gc[a]=void 0,gc[a+1]=void 0}_b=0}function mb(){try{var a=require("vertx");return a.runOnLoop||a.runOnContext,hb()}catch(b){return kb()}}function nb(a,b){rb.async(a,b)}function ob(){rb.on.apply(rb,arguments)}function pb(){rb.off.apply(rb,arguments)}var qb={mixin:function(a){return a.on=this.on,a.off=this.off,a.trigger=this.trigger,a._promiseCallbacks=void 0,a},on:function(c,d){var e,f=b(this);e=f[c],e||(e=f[c]=[]),-1===a(e,d)&&e.push(d)},off:function(c,d){var e,f,g=b(this);return d?(e=g[c],f=a(e,d),void(-1!==f&&e.splice(f,1))):void(g[c]=[])},trigger:function(a,c){var d,e,f=b(this);if(d=f[a])for(var g=0;g<d.length;g++)(e=d[g])(c)}},rb={instrument:!1};qb.mixin(rb);var sb;sb=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};var tb=sb,ub=Date.now||function(){return(new Date).getTime()},vb=Object.create||function(a){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof a)throw new TypeError("Argument must be an object");return g.prototype=a,new g},wb=[],xb=i,yb=void 0,zb=1,Ab=2,Bb=new w,Cb=new w,Db=B;B.prototype._validateInput=function(a){return tb(a)},B.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},B.prototype._init=function(){this._result=new Array(this.length)},B.prototype._enumerate=function(){for(var a=this.length,b=this.promise,c=this._input,d=0;b._state===yb&&a>d;d++)this._eachEntry(c[d],d)},B.prototype._eachEntry=function(a,b){var c=this._instanceConstructor;f(a)?a.constructor===c&&a._state!==yb?(a._onError=null,this._settledAt(a._state,b,a._result)):this._willSettleAt(c.resolve(a),b):(this._remaining--,this._result[b]=this._makeResult(zb,b,a))},B.prototype._settledAt=function(a,b,c){var d=this.promise;d._state===yb&&(this._remaining--,this._abortOnReject&&a===Ab?t(d,c):this._result[b]=this._makeResult(a,b,c)),0===this._remaining&&s(d,this._result)},B.prototype._makeResult=function(a,b,c){return c},B.prototype._willSettleAt=function(a,b){var c=this;u(a,void 0,function(a){c._settledAt(zb,b,a)},function(a){c._settledAt(Ab,b,a)})};var Eb=C,Fb=D,Gb=E,Hb=F,Ib="rsvp_"+ub()+"-",Jb=0,Kb=I;I.cast=Gb,I.all=Eb,I.race=Fb,I.resolve=Gb,I.reject=Hb,I.prototype={constructor:I,_guidKey:Ib,_onError:function(a){rb.async(function(b){setTimeout(function(){b._onError&&rb.trigger("error",a)},0)},this)},then:function(a,b,c){var d=this,e=d._state;if(e===zb&&!a||e===Ab&&!b)return rb.instrument&&xb("chained",this,this),this;d._onError=null;var f=new this.constructor(k,c),g=d._result;if(rb.instrument&&xb("chained",d,f),e){var h=arguments[e-1];rb.async(function(){y(e,f,h,g)})}else u(d,f,a,b);return f},"catch":function(a,b){return this.then(null,a,b)},"finally":function(a,b){var c=this.constructor;return this.then(function(b){return c.resolve(a()).then(function(){return b})},function(b){return c.resolve(a()).then(function(){throw b})},b)}};var Lb=new J,Mb=new J,Nb=P,Ob=T;U.prototype=vb(Db.prototype),U.prototype._superConstructor=Db,U.prototype._makeResult=A,U.prototype._validationError=function(){return new Error("allSettled must be called with an array")};var Pb=V,Qb=W,Rb=X;X.prototype=vb(Db.prototype),X.prototype._superConstructor=Db,X.prototype._init=function(){this._result={}},X.prototype._validateInput=function(a){return a&&"object"==typeof a},X.prototype._validationError=function(){return new Error("Promise.hash must be called with an object")},X.prototype._enumerate=function(){var a=this.promise,b=this._input,c=[];for(var d in b)a._state===yb&&b.hasOwnProperty(d)&&c.push({position:d,entry:b[d]});var e=c.length;this._remaining=e;for(var f,g=0;a._state===yb&&e>g;g++)f=c[g],this._eachEntry(f.entry,f.position)};var Sb=Y;Z.prototype=vb(Rb.prototype),Z.prototype._superConstructor=Db,Z.prototype._makeResult=A,Z.prototype._validationError=function(){return new Error("hashSettled must be called with an object")};var Tb,Ub=$,Vb=_,Wb=ab,Xb=bb,Yb=cb,Zb=db,$b=eb,_b=0,ac=fb,bc="undefined"!=typeof window?window:void 0,cc=bc||{},dc=cc.MutationObserver||cc.WebKitMutationObserver,ec="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),fc="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,gc=new Array(1e3);if(Tb=ec?gb():dc?ib():fc?jb():void 0===bc&&"function"==typeof require?mb():kb(),rb.async=ac,"undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var hc=window.__PROMISE_INSTRUMENTATION__;c("instrument",!0);for(var ic in hc)hc.hasOwnProperty(ic)&&ob(ic,hc[ic])}var jc={race:Qb,Promise:Kb,allSettled:Pb,hash:Sb,hashSettled:Ub,denodeify:Nb,on:ob,off:pb,map:Xb,filter:$b,resolve:Yb,reject:Zb,all:Ob,rethrow:Vb,defer:Wb,EventTarget:qb,configure:c,async:nb};"function"==typeof define&&define.amd?define(function(){return jc}):"undefined"!=typeof module&&module.exports?module.exports=jc:"undefined"!=typeof this&&(this.RSVP=jc)}).call(this),function(a,b){"use strict";var c=b.head||b.getElementsByTagName("head")[0],d="basket-",e=5e3,f=[],g=function(a,b){try{return localStorage.setItem(d+a,JSON.stringify(b)),!0}catch(c){if(c.name.toUpperCase().indexOf("QUOTA")>=0){var e,f=[];for(e in localStorage)0===e.indexOf(d)&&f.push(JSON.parse(localStorage[e]));return f.length?(f.sort(function(a,b){return a.stamp-b.stamp}),basket.remove(f[0].key),g(a,b)):void 0}return}},h=function(a){var b=new RSVP.Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.onreadystatechange=function(){4===d.readyState&&(200===d.status||0===d.status&&d.responseText?b({content:d.responseText,type:d.getResponseHeader("content-type")}):c(new Error(d.statusText)))},setTimeout(function(){d.readyState<4&&d.abort()},basket.timeout),d.send()});return b},i=function(a){return h(a.url).then(function(b){var c=j(a,b);return a.skipCache||g(a.key,c),c})},j=function(a,b){var c=+new Date;return a.data=b.content,a.originalType=b.type,a.type=a.type||b.type,a.skipCache=a.skipCache||!1,a.stamp=c,a.expire=c+60*(a.expire||e)*60*1e3,a},k=function(a,b){return!a||a.expire-+new Date<0||b.unique!==a.unique||basket.isValidItem&&!basket.isValidItem(a,b)},l=function(a){var b,c,d;if(a.url)return a.key=a.key||a.url,b=basket.get(a.key),a.execute=a.execute!==!1,d=k(b,a),a.live||d?(a.unique&&(a.url+=(a.url.indexOf("?")>0?"&":"?")+"basket-unique="+a.unique),c=i(a),a.live&&!d&&(c=c.then(function(a){return a},function(){return b}))):(b.type=a.type||b.originalType,b.execute=a.execute,c=new RSVP.Promise(function(a){a(b)})),c},m=function(a){var d=b.createElement("script");d.defer=!0,d.text=a.data,c.appendChild(d)},n={"default":m},o=function(a){return a.type&&n[a.type]?n[a.type](a):n["default"](a)},p=function(a){return a.map(function(a){return a.execute&&o(a),a})},q=function(){var a,b,c=[];for(a=0,b=arguments.length;b>a;a++)c.push(l(arguments[a]));return RSVP.all(c)},r=function(){var a=q.apply(null,arguments),b=this.then(function(){return a}).then(p);return b.thenRequire=r,b};a.basket={require:function(){for(var a=0,b=arguments.length;b>a;a++)arguments[a].execute=arguments[a].execute!==!1,arguments[a].once&&f.indexOf(arguments[a].url)>=0?arguments[a].execute=!1:arguments[a].execute!==!1&&f.indexOf(arguments[a].url)<0&&f.push(arguments[a].url);var c=q.apply(null,arguments).then(p);return c.thenRequire=r,c},remove:function(a){return localStorage.removeItem(d+a),this},get:function(a){var b=localStorage.getItem(d+a);try{return JSON.parse(b||"false")}catch(c){return!1}},clear:function(a){var b,c,e=+new Date;for(b in localStorage)c=b.split(d)[1],c&&(!a||this.get(c).expire<=e)&&this.remove(c);return this},isValidItem:null,timeout:5e3,addHandler:function(a,b){Array.isArray(a)||(a=[a]),a.forEach(function(a){n[a]=b})},removeHandler:function(a){basket.addHandler(a,void 0)}},basket.clear(!0)}(this,document);
//# sourceMappingURL=basket.full.min.js.map