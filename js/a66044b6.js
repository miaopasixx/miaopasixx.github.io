(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var o=0;o<n.length;o++){var r=n[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(i=r.key,u=void 0,u=function(t,n){if("object"!==e(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var r=o.call(t,n||"default");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(i,"string"),"symbol"===e(u)?u:String(u)),r)}var i,u}var n,o=function(e){var t=e.key,n=e.handler,o=e.preventDefault,r=void 0!==o&&o,i=t.toLowerCase().split("+").map((function(e){return e.trim()})),u=/Mac|iPod|iPhone|iPad/.test(navigator.platform),a=function(e){i.every((function(t){return"control"===t?u?e.metaKey:e.ctrlKey:e.key.toLowerCase()===t}))&&(r&&e.preventDefault(),n(e))};return document.addEventListener("keydown",a),function(){return document.removeEventListener("keydown",a)}},r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,o,r;return n=e,o=[{key:"emit",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:document,o=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0});n.dispatchEvent(o)}},{key:"on",value:function(e,t){(arguments.length>2&&void 0!==arguments[2]?arguments[2]:document).addEventListener(e,t)}},{key:"off",value:function(e,t){(arguments.length>2&&void 0!==arguments[2]?arguments[2]:document).removeEventListener(e,t)}}],o&&t(n.prototype,o),r&&t(n,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();new r;n=()=>{o({key:"control+h",preventDefault:!0,handler:()=>location.href="/"}),o({key:"control+p",preventDefault:!0,handler:()=>location.href="/cosy-preference"})},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()})();