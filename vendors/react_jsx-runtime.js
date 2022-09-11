/* esm.sh - esbuild bundle(react@18.2.0/jsx-runtime) es2022 production */
import __react$ from "react";var a=Object.create;var u=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var E=(r=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(r,{get:(e,o)=>(typeof require!="undefined"?require:e)[o]}):r)(function(r){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+r+'" is not supported')});var l=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var k=(r,e,o,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of O(e))!v.call(r,s)&&s!==o&&u(r,s,{get:()=>e[s],enumerable:!(t=x(e,s))||t.enumerable});return r};var N=(r,e,o)=>(o=r!=null?a(j(r)):{},k(e||!r||!r.__esModule?u(o,"default",{value:r,enumerable:!0}):o,r));var i=l(n=>{"use strict";var R=__react$,S=Symbol.for("react.element"),b=Symbol.for("react.fragment"),q=Object.prototype.hasOwnProperty,w=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P={key:!0,ref:!0,__self:!0,__source:!0};function p(r,e,o){var t,s={},_=null,f=null;o!==void 0&&(_=""+o),e.key!==void 0&&(_=""+e.key),e.ref!==void 0&&(f=e.ref);for(t in e)q.call(e,t)&&!P.hasOwnProperty(t)&&(s[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)s[t]===void 0&&(s[t]=e[t]);return{$$typeof:S,type:r,key:_,ref:f,props:s,_owner:w.current}}n.Fragment=b;n.jsx=p;n.jsxs=p});var c=l((I,d)=>{"use strict";d.exports=i()});var y=N(c()),{Fragment:L,jsx:T,jsxs:g}=y,{default:m,...h}=y,C=m!==void 0?m:h;export{L as Fragment,C as default,T as jsx,g as jsxs};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */