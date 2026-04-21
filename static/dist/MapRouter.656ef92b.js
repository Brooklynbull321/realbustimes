// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fsRwl":[function(require,module,exports,__globalThis) {
var Refresh = require("f11b6b8f6a1f6f0b");
var ErrorOverlay = require("f490fb404efab291");
window.__REACT_REFRESH_VERSION_RUNTIME = '0.14.2';
Refresh.injectIntoGlobalHook(window);
window.$RefreshReg$ = function() {};
window.$RefreshSig$ = function() {
    return function(type) {
        return type;
    };
};
ErrorOverlay.setEditorHandler(function editorHandler(errorLocation) {
    let file = `${errorLocation.fileName}:${errorLocation.lineNumber || 1}:${errorLocation.colNumber || 1}`;
    fetch(`/__parcel_launch_editor?file=${encodeURIComponent(file)}`);
});
ErrorOverlay.startReportingRuntimeErrors({
    onError: function() {}
});
window.addEventListener('parcelhmraccept', ()=>{
    ErrorOverlay.dismissRuntimeErrors();
});

},{"f11b6b8f6a1f6f0b":"3zK3f","f490fb404efab291":"7ixpT"}],"2ICvc":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "5f4c3916ce7975d9";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "72e5b43d656ef92b";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"bzhJQ":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$3bfb = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$3bfb.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>MapRouter);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _wouter = require("wouter");
var _bigMap = require("./BigMap");
var _bigMapDefault = parcelHelpers.interopDefault(_bigMap);
const tripDataElement = document.getElementById("trip-data");
let tripData;
if (tripDataElement) tripData = JSON.parse(tripDataElement.textContent);
function MapRouter() {
    var _tripData_operator;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Switch), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Route), {
                path: "/trips/:tripId",
                children: (params)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _bigMapDefault.default), {
                        mode: (0, _bigMap.MapMode).Trip,
                        trip: tripData,
                        tripId: params.tripId
                    }, void 0, false, {
                        fileName: "frontend/js/MapRouter.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this)
            }, void 0, false, {
                fileName: "frontend/js/MapRouter.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Route), {
                path: "/journeys/:journeyId",
                children: (params)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _bigMapDefault.default), {
                        mode: (0, _bigMap.MapMode).Journey,
                        journeyId: params.journeyId
                    }, void 0, false, {
                        fileName: "frontend/js/MapRouter.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
            }, void 0, false, {
                fileName: "frontend/js/MapRouter.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Route), {
                path: "/vehicles/tfl/:reg",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _bigMapDefault.default), {
                    mode: (0, _bigMap.MapMode).Trip,
                    trip: tripData,
                    vehicleId: window.VEHICLE_ID
                }, void 0, false, {
                    fileName: "frontend/js/MapRouter.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/MapRouter.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Route), {
                path: "/operators/:operatorSlug/map",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _bigMapDefault.default), {
                    mode: (0, _bigMap.MapMode).Operator,
                    noc: window.OPERATOR_ID || (tripData === null || tripData === void 0 ? void 0 : (_tripData_operator = tripData.operator) === null || _tripData_operator === void 0 ? void 0 : _tripData_operator.noc)
                }, void 0, false, {
                    fileName: "frontend/js/MapRouter.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/MapRouter.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Route), {
                path: "/map",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _bigMapDefault.default), {
                    mode: (0, _bigMap.MapMode).Slippy
                }, void 0, false, {
                    fileName: "frontend/js/MapRouter.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/MapRouter.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/MapRouter.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = MapRouter;
var _c;
$RefreshReg$(_c, "MapRouter");

  $parcel$ReactRefreshHelpers$3bfb.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","wouter":"4hYSv","./BigMap":"eQL0S","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"eQL0S":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$a762 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$a762.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapMode", ()=>MapMode);
parcelHelpers.export(exports, "default", ()=>BigMap);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibreGl = require("maplibre-gl");
var _maplibre = require("react-map-gl/maplibre");
var _wouter = require("wouter");
var _debounce = require("lodash/debounce");
var _debounceDefault = parcelHelpers.interopDefault(_debounce);
var _vehicleMarker = require("./VehicleMarker");
var _vehicleMarkerDefault = parcelHelpers.interopDefault(_vehicleMarker);
var _journeyMap = require("./JourneyMap");
var _loadingSorry = require("./LoadingSorry");
var _loadingSorryDefault = parcelHelpers.interopDefault(_loadingSorry);
var _map = require("./Map");
var _mapDefault = parcelHelpers.interopDefault(_map);
var _stopPopup = require("./StopPopup");
var _stopPopupDefault = parcelHelpers.interopDefault(_stopPopup);
var _tripMap = require("./TripMap");
var _tripTimetable = require("./TripTimetable");
var _tripTimetableDefault = parcelHelpers.interopDefault(_tripTimetable);
var _vehiclePopup = require("./VehiclePopup");
var _vehiclePopupDefault = parcelHelpers.interopDefault(_vehiclePopup);
var _utils = require("./utils");
var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
const apiRoot = "/";
const updateLocalStorage = (0, _debounceDefault.default)((zoom, latLng)=>{
    try {
        localStorage.setItem("vehicleMap", `${zoom}/${latLng.lat}/${latLng.lng}`);
    } catch (e) {
    // never mind
    }
}, 2000);
if (window.INITIAL_VIEW_STATE && !window.location.hash) try {
    if (localStorage.vehicleMap) {
        const parts = localStorage.vehicleMap.split("/");
        if (parts.length === 3) window.INITIAL_VIEW_STATE = {
            zoom: parts[0],
            latitude: parts[1],
            longitude: parts[2]
        };
    }
} catch (e) {
// never mind
}
function getBoundsQueryString(bounds) {
    return `?ymax=${bounds.getNorth()}&xmax=${bounds.getEast()}&ymin=${bounds.getSouth()}&xmin=${bounds.getWest()}`;
}
function containsBounds(a, b) {
    // console.log(a, b);
    // if (a) {
    //   console.log("N", a.getNorth(), b.getNorth(), a.getNorth() >= b.getNorth());
    //   console.log("E ", a.getEast(), b.getEast(), a.getEast() >= b.getEast());
    //   console.log("S ", a.getSouth(), b.getSouth(), a.getSouth() <= b.getSouth());
    //   console.log("W ", a.getWest(), b.getWest(), a.getWest() <= b.getWest());
    // }
    // console.log(a?.contains(b.getNorthWest()) && a.contains(b.getSouthEast()));
    return (a === null || a === void 0 ? void 0 : a.contains(b.getNorthWest())) && a.contains(b.getSouthEast());
}
function shouldShowStops(zoom) {
    return zoom && zoom >= 14;
}
function shouldShowVehicles(zoom) {
    return zoom && zoom >= 6;
}
var MapMode = /*#__PURE__*/ function(MapMode) {
    MapMode[MapMode["Slippy"] = 0] = "Slippy";
    MapMode[MapMode["Operator"] = 1] = "Operator";
    MapMode[MapMode["Trip"] = 2] = "Trip";
    MapMode[MapMode["Journey"] = 3] = "Journey";
    return MapMode;
}({});
function SlippyMapHash() {
    _s();
    const mapRef = (0, _maplibre.useMap)();
    (0, _reactDefault.default).useEffect(()=>{
        if (mapRef.current) {
            const map = mapRef.current.getMap();
            const hash = map._hash || new (0, _maplibreGl.Hash)();
            map._hash = hash;
            hash.addTo(map);
            return ()=>{
                hash.remove();
            };
        }
    }, [
        mapRef
    ]);
    return null;
}
_s(SlippyMapHash, "U3FDkxysDj2rlX0pa9syHBXwznk=", false, function() {
    return [
        (0, _maplibre.useMap)
    ];
});
_c = SlippyMapHash;
function Stops({ stops, times, clickedStopUrl, setClickedStop }) {
    _s1();
    const stopsById = (0, _reactDefault.default).useMemo(()=>{
        if (stops) return Object.assign({}, ...stops.features.map((stop)=>({
                [stop.properties.url]: stop
            })));
        if (times) return Object.assign({}, ...times.map((time)=>{
            const url = `/stops/${time.stop.atco_code}`;
            return {
                [url]: {
                    properties: {
                        url,
                        name: time.stop.name
                    },
                    geometry: {
                        coordinates: time.stop.location
                    }
                }
            };
        }));
    }, [
        stops,
        times
    ]);
    const clickedStop = stopsById && clickedStopUrl && stopsById[clickedStopUrl];
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            stops ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: stops,
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    id: "stops",
                    type: "symbol",
                    minzoom: 14,
                    layout: {
                        "text-field": [
                            "get",
                            "icon"
                        ],
                        "text-font": [
                            "Stadia Regular"
                        ],
                        "text-allow-overlap": true,
                        "text-size": 10,
                        "icon-rotate": [
                            "+",
                            45,
                            [
                                "get",
                                "bearing"
                            ]
                        ],
                        "icon-image": [
                            "case",
                            [
                                "==",
                                [
                                    "get",
                                    "bearing"
                                ],
                                [
                                    "literal",
                                    null
                                ]
                            ],
                            "stop-marker-circle",
                            "stop-marker"
                        ],
                        "icon-allow-overlap": true,
                        "icon-ignore-placement": true,
                        "text-ignore-placement": true,
                        "icon-padding": [
                            3
                        ]
                    },
                    paint: {
                        "text-color": "#ffffff"
                    }
                }, void 0, false, {
                    fileName: "frontend/js/BigMap.tsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this) : null,
            clickedStop ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stopPopupDefault.default), {
                item: clickedStop,
                onClose: ()=>setClickedStop(undefined)
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_s1(Stops, "lq9CAH69pRqQO11gSfp1/CX0MX0=");
_c1 = Stops;
function fetchJson(url) {
    return fetch(apiRoot + url).then((response)=>{
        if (response.ok) return response.json();
    }, ()=>{
    // never mind
    });
}
const Vehicles = /*#__PURE__*/ (0, _react.memo)(_s2(function Vehicles({ vehicles, tripId, journeyId, clickedVehicleMarkerId, setClickedVehicleMarker }) {
    var _clickedVehicle_trip_id, _clickedVehicle_journey_id;
    _s2();
    const vehiclesById = (0, _reactDefault.default).useMemo(()=>{
        return Object.assign({}, ...vehicles.map((item)=>({
                [item.id]: item
            })));
    }, [
        vehicles
    ]);
    const vehiclesGeoJson = (0, _reactDefault.default).useMemo(()=>{
        if (vehicles.length < 1000) return null;
        return {
            type: "FeatureCollection",
            features: vehicles ? vehicles.map((vehicle)=>{
                var _vehicle_vehicle, _vehicle_vehicle1, _vehicle_vehicle_css, _vehicle_vehicle2;
                return {
                    type: "Feature",
                    id: vehicle.id,
                    geometry: {
                        type: "Point",
                        coordinates: vehicle.coordinates
                    },
                    properties: {
                        url: (_vehicle_vehicle = vehicle.vehicle) === null || _vehicle_vehicle === void 0 ? void 0 : _vehicle_vehicle.url,
                        colour: ((_vehicle_vehicle1 = vehicle.vehicle) === null || _vehicle_vehicle1 === void 0 ? void 0 : _vehicle_vehicle1.colour) || (((_vehicle_vehicle2 = vehicle.vehicle) === null || _vehicle_vehicle2 === void 0 ? void 0 : (_vehicle_vehicle_css = _vehicle_vehicle2.css) === null || _vehicle_vehicle_css === void 0 ? void 0 : _vehicle_vehicle_css.length) === 7 ? vehicle.vehicle.css : "#fff")
                    }
                };
            }) : []
        };
    }, [
        vehicles
    ]);
    const clickedVehicle = clickedVehicleMarkerId && vehiclesById[clickedVehicleMarkerId];
    let markers;
    if (!vehiclesGeoJson) markers = vehicles.map((item)=>{
        var _item_trip_id, _item_journey_id;
        return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _vehicleMarkerDefault.default), {
            selected: item === clickedVehicle || tripId && tripId === ((_item_trip_id = item.trip_id) === null || _item_trip_id === void 0 ? void 0 : _item_trip_id.toString()) || journeyId && journeyId === ((_item_journey_id = item.journey_id) === null || _item_journey_id === void 0 ? void 0 : _item_journey_id.toString()) || false,
            vehicle: item
        }, item.id, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 295,
            columnNumber: 9
        }, this);
    });
    else markers = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
        type: "geojson",
        data: vehiclesGeoJson,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
            id: "vehicles",
            type: "circle",
            paint: {
                "circle-color": [
                    "get",
                    "colour"
                ]
            }
        }, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 310,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 309,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            markers,
            clickedVehicle && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _vehiclePopupDefault.default), {
                item: clickedVehicle,
                activeLink: tripId ? ((_clickedVehicle_trip_id = clickedVehicle.trip_id) === null || _clickedVehicle_trip_id === void 0 ? void 0 : _clickedVehicle_trip_id.toString()) === tripId : journeyId ? ((_clickedVehicle_journey_id = clickedVehicle.journey_id) === null || _clickedVehicle_journey_id === void 0 ? void 0 : _clickedVehicle_journey_id.toString()) === journeyId : false,
                onClose: ()=>setClickedVehicleMarker(),
                snazzyTripLink: true
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 327,
                columnNumber: 9
            }, this),
            clickedVehicle && vehiclesGeoJson && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _vehicleMarkerDefault.default), {
                selected: true,
                vehicle: clickedVehicle
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 341,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}, "61a5IP5MnoPf6o5ROx3g6ebL7B4="));
_c2 = Vehicles;
function TripSidebar(props) {
    var _trip_id, _props_vehicle, _trip_service;
    let className = "trip-timetable map-sidebar";
    const trip = props.trip;
    if (!trip) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: className
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 358,
        columnNumber: 12
    }, this);
    if (props.tripId !== ((_trip_id = trip.id) === null || _trip_id === void 0 ? void 0 : _trip_id.toString())) className += " loading";
    const operator = trip.operator ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
            href: `/operators/${trip.operator.slug}`,
            children: trip.operator.name
        }, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 367,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 366,
        columnNumber: 5
    }, this) : null;
    const service = ((_props_vehicle = props.vehicle) === null || _props_vehicle === void 0 ? void 0 : _props_vehicle.service) ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
            href: props.vehicle.service.url,
            children: props.vehicle.service.line_name
        }, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 373,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this) : ((_trip_service = trip.service) === null || _trip_service === void 0 ? void 0 : _trip_service.slug) ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
            href: `/services/${trip.service.slug}`,
            children: trip.service.line_name
        }, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 377,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this) : null;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: className,
        children: [
            operator || service ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("ul", {
                className: "breadcrumb",
                children: [
                    operator,
                    service
                ]
            }, void 0, true, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 384,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _tripTimetableDefault.default), {
                trip: trip,
                vehicle: props.vehicle,
                highlightedStop: props.highlightedStop
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 389,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
_c3 = TripSidebar;
function JourneySidebar(props) {
    var _props_vehicle_service, _props_vehicle, _journey_id;
    _s3();
    let className = "trip-timetable map-sidebar";
    const journey = props.journey;
    const trip = (0, _reactDefault.default).useMemo(()=>{
        return (0, _tripTimetable.tripFromJourney)(journey);
    }, [
        journey
    ]);
    let service = `${journey.route_name} to ${journey.destination}`;
    if ((_props_vehicle = props.vehicle) === null || _props_vehicle === void 0 ? void 0 : (_props_vehicle_service = _props_vehicle.service) === null || _props_vehicle_service === void 0 ? void 0 : _props_vehicle_service.url) service = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
        href: props.vehicle.service.url,
        children: service
    }, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 415,
        columnNumber: 15
    }, this);
    if (!trip) className += " no-stops";
    if (props.journeyId !== ((_journey_id = journey.id) === null || _journey_id === void 0 ? void 0 : _journey_id.toString())) className += " loading";
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                children: service
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            trip ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _tripTimetableDefault.default), {
                trip: trip,
                vehicle: props.vehicle,
                highlightedStop: props.highlightedStop
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 441,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 427,
        columnNumber: 5
    }, this);
}
_s3(JourneySidebar, "RgIM/0dzxsJXcp0TH9jngvuMWTQ=");
_c4 = JourneySidebar;
function BigMap(props) {
    _s4();
    const mapRef = (0, _reactDefault.default).useRef();
    const [trip, setTrip] = (0, _reactDefault.default).useState(props.trip);
    const [journey, setJourney] = (0, _reactDefault.default).useState();
    const [vehicles, setVehicles] = (0, _reactDefault.default).useState();
    const [stops, setStops] = (0, _reactDefault.default).useState();
    const [zoom, setZoom] = (0, _reactDefault.default).useState();
    const [clickedStopUrl, setClickedStopURL] = (0, _reactDefault.default).useState(()=>{
        if (document.referrer) {
            const referrer = new URL(document.referrer).pathname;
            if (referrer.indexOf("/stops/") === 0) return referrer;
        }
    });
    const [tripVehicle, setTripVehicle] = (0, _reactDefault.default).useState();
    const initialViewState = (0, _react.useRef)(window.INITIAL_VIEW_STATE);
    const bounds = (0, _react.useMemo)(()=>{
        if (trip) return (0, _utils.getBounds)(trip.times, (time)=>time.stop.location);
        if (journey) {
            const _bounds = (0, _utils.getBounds)(journey.stops, (item)=>item.coordinates);
            // maybe extend bounds
            return (0, _utils.getBounds)(journey.locations, (item)=>item.coordinates, _bounds);
        }
    }, [
        trip,
        journey
    ]);
    const fitBoundsOptions = (0, _react.useMemo)(()=>{
        if (props.mode === 0 || props.mode === 1) return {
            padding: {
                top: 50,
                bottom: 150,
                left: 50,
                right: 50
            }
        };
        return {
            padding: 50
        };
    }, [
        props.mode
    ]);
    (0, _react.useEffect)(()=>{
        if (bounds && mapRef.current) mapRef.current.fitBounds(bounds, {
            padding: 50
        });
    }, [
        bounds
    ]);
    // slippy map stuff
    const boundsRef = (0, _reactDefault.default).useRef();
    const stopsHighWaterMark = (0, _reactDefault.default).useRef();
    const stopsTimeout = (0, _reactDefault.default).useRef();
    const vehiclesHighWaterMark = (0, _reactDefault.default).useRef();
    const vehiclesTimeout = (0, _reactDefault.default).useRef();
    const vehiclesAbortController = (0, _reactDefault.default).useRef();
    const vehiclesLength = (0, _reactDefault.default).useRef(0);
    const loadStops = (0, _reactDefault.default).useCallback(()=>{
        const _bounds = boundsRef.current;
        fetchJson(`stops.json${getBoundsQueryString(_bounds)}`).then((items)=>{
            stopsHighWaterMark.current = _bounds;
            setLoadingStops(false);
            setStops(items);
        });
    }, []);
    const [loadingStops, setLoadingStops] = (0, _reactDefault.default).useState(false);
    const [loadingBuses, setLoadingBuses] = (0, _reactDefault.default).useState(true);
    const loadVehicles = (0, _reactDefault.default).useCallback((first = false)=>{
        if (!first && document.hidden) return;
        clearTimeout(vehiclesTimeout.current);
        if (vehiclesAbortController.current) {
            vehiclesAbortController.current.abort();
            vehiclesAbortController.current = undefined;
        }
        let _bounds;
        let url;
        switch(props.mode){
            case 0:
                if (boundsRef.current) {
                    _bounds = boundsRef.current;
                    url = getBoundsQueryString(_bounds);
                }
                break;
            case 1:
                url = `?operator=${props.noc}`;
                break;
            case 2:
                if (props.vehicleId) url = `?id=${props.vehicleId}`;
                else if (trip === null || trip === void 0 ? void 0 : trip.service) url = `?service=${trip.service.id}&trip=${trip.id}`;
                break;
            case 3:
                if (journey === null || journey === void 0 ? void 0 : journey.service_id) {
                    url = `?service=${journey === null || journey === void 0 ? void 0 : journey.service_id}`;
                    if (journey.trip_id) url += `&trip=${journey.trip_id}`;
                } else if (journey === null || journey === void 0 ? void 0 : journey.vehicle_id) url = `?id=${journey.vehicle_id}`;
                break;
        }
        if (!url) return;
        setLoadingBuses(true);
        vehiclesAbortController.current = new AbortController();
        return fetch(`${apiRoot}vehicles.json${url}`, {
            signal: vehiclesAbortController.current.signal
        }).then((response)=>{
            if (response.ok || response.status === 404) {
                response.json().then((items)=>{
                    vehiclesHighWaterMark.current = _bounds;
                    if (props.mode === 1 && !initialViewState.current) {
                        const bounds = (0, _utils.getBounds)(items, (item)=>item.coordinates);
                        if (bounds) initialViewState.current = {
                            bounds,
                            fitBoundsOptions: {
                                padding: {
                                    top: 50,
                                    bottom: 150,
                                    left: 50,
                                    right: 50
                                }
                            }
                        };
                    }
                    if (items.length || vehiclesLength.current || first) {
                        if (trip || (journey === null || journey === void 0 ? void 0 : journey.vehicle_id)) {
                            for (const item of items)if (trip && trip.id === item.trip_id || (journey === null || journey === void 0 ? void 0 : journey.vehicle_id) === item.id) {
                                if (first) setClickedVehicleMarker(item.id);
                                setTripVehicle(item);
                                break;
                            }
                        }
                        vehiclesLength.current = items.length;
                        setVehicles(items);
                    }
                });
                setLoadingBuses(false);
            }
            if (!document.hidden) vehiclesTimeout.current = window.setTimeout(loadVehicles, 12000); // 12 seconds
        }, ()=>{
        // never mind
        // setLoadingBuses(false);
        }).catch(()=>{
        // never mind
        // setLoadingBuses(false);
        });
    }, [
        props.mode,
        props.noc,
        trip,
        journey,
        props.vehicleId
    ]);
    (0, _reactDefault.default).useEffect(()=>{
        if (props.tripId) {
            var _trip_id;
            // trip mode
            if ((trip === null || trip === void 0 ? void 0 : (_trip_id = trip.id) === null || _trip_id === void 0 ? void 0 : _trip_id.toString()) === props.tripId) {
                var _trip_service, _trip_operator;
                loadVehicles(true);
                document.title = `${(_trip_service = trip.service) === null || _trip_service === void 0 ? void 0 : _trip_service.line_name} \u2013 ${(_trip_operator = trip.operator) === null || _trip_operator === void 0 ? void 0 : _trip_operator.name} \u2013 bustimes.org`;
            } else {
                setJourney(undefined);
                setTrip(undefined);
                fetch(`${apiRoot}api/trips/${props.tripId}/`).then((response)=>{
                    if (response.ok) response.json().then(setTrip);
                });
            }
        } else if (props.noc) {
            var _trip_operator1;
            setJourney(undefined);
            setTrip(undefined);
            // operator mode
            if (props.noc === (trip === null || trip === void 0 ? void 0 : (_trip_operator1 = trip.operator) === null || _trip_operator1 === void 0 ? void 0 : _trip_operator1.noc)) document.title = `Bus tracker map \u2013 ${trip.operator.name} \u2013 bustimes.org`;
            loadVehicles(true);
        } else if (props.journeyId) {
            var _journey_id;
            // journey mode
            if ((journey === null || journey === void 0 ? void 0 : (_journey_id = journey.id) === null || _journey_id === void 0 ? void 0 : _journey_id.toString()) === props.journeyId) {
                if (journey.current) loadVehicles(true);
            } else {
                setJourney(undefined);
                setTrip(undefined);
                fetch(`${apiRoot}journeys/${props.journeyId}.json`).then((response)=>{
                    if (response.ok) response.json().then((journey)=>{
                        setJourney({
                            ...journey,
                            id: props.journeyId
                        });
                    });
                });
            }
        } else if (!props.vehicleId) {
            setJourney(undefined);
            setTrip(undefined);
            // slippy mode
            document.title = "Map \u2013 bustimes.org";
        } else loadVehicles();
    }, [
        props.tripId,
        trip,
        props.noc,
        props.vehicleId,
        props.journeyId,
        journey,
        loadVehicles
    ]);
    const handleMoveEnd = (0, _reactDefault.default).useCallback((evt)=>{
        if (vehiclesTimeout.current) {
            clearTimeout(vehiclesTimeout.current);
            setLoadingBuses(false);
        }
        if (stopsTimeout.current) {
            clearTimeout(stopsTimeout.current);
            setLoadingStops(false);
        }
        const _bounds = evt.target.getBounds();
        const _zoom = evt.viewState.zoom;
        setZoom(_zoom);
        boundsRef.current = _bounds;
        if (shouldShowVehicles(_zoom)) {
            if (!containsBounds(vehiclesHighWaterMark.current, boundsRef.current) || vehiclesLength.current >= 1000) {
                setLoadingBuses(true);
                vehiclesTimeout.current = window.setTimeout(loadVehicles, 200);
            }
            if (shouldShowStops(_zoom) && !containsBounds(stopsHighWaterMark.current, boundsRef.current)) {
                setLoadingStops(true);
                stopsTimeout.current = window.setTimeout(loadStops, 200);
            }
        }
        updateLocalStorage(_zoom, evt.target.getCenter());
    }, [
        loadStops,
        loadVehicles
    ]);
    // (re)load vehicles on tab visibility change
    (0, _reactDefault.default).useEffect(()=>{
        const handleVisibilityChange = ()=>{
            if (!document.hidden) loadVehicles();
        };
        window.addEventListener("visibilitychange", handleVisibilityChange);
        return ()=>{
            window.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [
        loadVehicles
    ]);
    const [clickedVehicleMarkerId, setClickedVehicleMarker] = (0, _reactDefault.default).useState(props.vehicleId);
    const handleMapClick = (0, _reactDefault.default).useCallback((e)=>{
        var _e_features;
        // handle click on VehicleMarker element
        const vehicleId = (0, _vehicleMarker.getClickedVehicleMarkerId)(e);
        if (vehicleId) {
            setClickedVehicleMarker(vehicleId);
            setClickedStopURL(undefined);
            return;
        }
        // handle click on maplibre rendered feature
        if ((_e_features = e.features) === null || _e_features === void 0 ? void 0 : _e_features.length) for (const feature of e.features){
            if (feature.layer.id === "vehicles" && feature.id) {
                setClickedVehicleMarker(feature.id);
                return;
            }
            if (feature.properties.url !== clickedStopUrl) {
                setClickedStopURL(feature.properties.url);
                break;
            }
        }
        else setClickedStopURL(undefined);
        setClickedVehicleMarker(undefined);
    }, [
        clickedStopUrl
    ]);
    const handleMapInit = (0, _reactDefault.default).useCallback((map)=>{
        mapRef.current = map;
        if (props.mode === 0) {
            if (!boundsRef.current) {
                // first load
                const _zoom = map.getZoom();
                const _bounds = map.getBounds();
                boundsRef.current = map.getBounds();
                setZoom(_zoom);
                if (shouldShowVehicles(_zoom)) {
                    setLoadingBuses(true);
                    loadVehicles();
                    if (shouldShowStops(_zoom)) {
                        setLoadingStops(true);
                        loadStops();
                    }
                }
            }
        }
    }, [
        props.mode,
        loadVehicles,
        loadStops
    ]);
    const [cursor, setCursor] = (0, _reactDefault.default).useState();
    const hoveredLocation = (0, _reactDefault.default).useRef();
    const onMouseEnter = (0, _reactDefault.default).useCallback((e)=>{
        var _e_features;
        const vehicleId = (0, _vehicleMarker.getClickedVehicleMarkerId)(e);
        if (vehicleId) return;
        if ((_e_features = e.features) === null || _e_features === void 0 ? void 0 : _e_features.length) {
            setCursor("pointer");
            // journey map
            for (const feature of e.features)if (feature.layer.id === "locations") {
                if (hoveredLocation.current !== undefined) e.target.setFeatureState({
                    source: "locations",
                    id: hoveredLocation.current
                }, {
                    hover: false
                });
                e.target.setFeatureState({
                    source: "locations",
                    id: feature.id
                }, {
                    hover: true
                });
                hoveredLocation.current = feature.id;
                return;
            }
        }
    }, []);
    const onMouseLeave = (0, _reactDefault.default).useCallback(()=>{
        setCursor(undefined);
    }, []);
    const showStops = shouldShowStops(zoom);
    const showBuses = props.mode !== 0 || shouldShowVehicles(zoom);
    if (props.mode === 1) {
        if (!vehicles) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loadingSorryDefault.default), {}, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 866,
            columnNumber: 14
        }, this);
        if (!vehiclesLength.current) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loadingSorryDefault.default), {
            text: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                children: [
                    "Sorry, no buses are tracking at the moment.",
                    " ",
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                        href: "/map",
                        children: "Go to the main map?"
                    }, void 0, false, {
                        fileName: "frontend/js/BigMap.tsx",
                        lineNumber: 874,
                        columnNumber: 15
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 872,
                columnNumber: 13
            }, void 0)
        }, void 0, false, {
            fileName: "frontend/js/BigMap.tsx",
            lineNumber: 870,
            columnNumber: 9
        }, this);
    }
    if (props.mode === 3 && !journey && !mapRef.current) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loadingSorryDefault.default), {}, void 0, false, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 883,
        columnNumber: 12
    }, this);
    let className = "big-map";
    if (props.mode === 2 || props.mode === 3) className += " has-sidebar";
    // console.dir(bounds);
    // console.dir(journey);
    // console.dir(initialViewState.current);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            props.mode !== 0 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Link), {
                className: "map-link",
                href: "/map",
                children: "Map"
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 897,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: className,
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _mapDefault.default), {
                    initialViewState: initialViewState.current || {
                        bounds,
                        fitBoundsOptions
                    },
                    onMoveEnd: props.mode === 0 ? handleMoveEnd : undefined,
                    hash: props.mode === 0,
                    onClick: handleMapClick,
                    onMouseEnter: onMouseEnter,
                    onMouseMove: props.mode === 3 ? onMouseEnter : undefined,
                    onMouseLeave: onMouseLeave,
                    cursor: cursor,
                    onMapInit: handleMapInit,
                    interactiveLayerIds: [
                        "stops",
                        "vehicles",
                        "locations"
                    ],
                    children: [
                        props.mode === 2 && trip ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _tripMap.Route), {
                            times: trip.times
                        }, void 0, false, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 952,
                            columnNumber: 13
                        }, this) : null,
                        props.mode === 3 && (journey === null || journey === void 0 ? void 0 : journey.stops) ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _journeyMap.JourneyStops), {
                            stops: journey.stops,
                            clickedStopUrl: clickedStopUrl,
                            setClickedStop: setClickedStopURL
                        }, void 0, false, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 956,
                            columnNumber: 13
                        }, this) : null,
                        trip || stops && showStops ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Stops, {
                            stops: props.mode === 0 ? stops : undefined,
                            times: props.mode === 2 ? trip === null || trip === void 0 ? void 0 : trip.times : undefined,
                            setClickedStop: setClickedStopURL,
                            clickedStopUrl: clickedStopUrl
                        }, void 0, false, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 966,
                            columnNumber: 13
                        }, this) : null,
                        vehicles && showBuses ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Vehicles, {
                            vehicles: vehicles,
                            tripId: props.tripId,
                            journeyId: props.journeyId,
                            clickedVehicleMarkerId: clickedVehicleMarkerId,
                            setClickedVehicleMarker: setClickedVehicleMarker
                        }, void 0, false, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 975,
                            columnNumber: 13
                        }, this) : null,
                        zoom && (props.mode === 0 && !showStops || loadingBuses || loadingStops) ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "maplibregl-ctrl map-status-bar",
                            children: [
                                props.mode === 0 && !showStops ? "Zoom in to see stops" : null,
                                !showBuses ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    children: "Zoom in to see buses"
                                }, void 0, false, {
                                    fileName: "frontend/js/BigMap.tsx",
                                    lineNumber: 992,
                                    columnNumber: 29
                                }, this) : null,
                                showBuses && (loadingBuses || loadingStops) ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    children: "Loading\u2026"
                                }, void 0, false, {
                                    fileName: "frontend/js/BigMap.tsx",
                                    lineNumber: 994,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 988,
                            columnNumber: 13
                        }, this) : null,
                        props.mode === 3 && (journey === null || journey === void 0 ? void 0 : journey.locations) && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _journeyMap.Locations), {
                            locations: journey.locations
                        }, void 0, false, {
                            fileName: "frontend/js/BigMap.tsx",
                            lineNumber: 1000,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "frontend/js/BigMap.tsx",
                    lineNumber: 902,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 901,
                columnNumber: 7
            }, this),
            props.mode === 2 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(TripSidebar, {
                trip: trip,
                tripId: props.tripId,
                vehicle: tripVehicle,
                highlightedStop: clickedStopUrl
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 1006,
                columnNumber: 9
            }, this) : null,
            props.mode === 3 && journey ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(JourneySidebar, {
                journey: journey,
                journeyId: props.journeyId,
                vehicle: tripVehicle,
                highlightedStop: clickedStopUrl
            }, void 0, false, {
                fileName: "frontend/js/BigMap.tsx",
                lineNumber: 1015,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/BigMap.tsx",
        lineNumber: 895,
        columnNumber: 5
    }, this);
}
_s4(BigMap, "QimIl31F6RiDgSmzYXukgjxlBC4=");
_c5 = BigMap;
var _c, _c1, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "SlippyMapHash");
$RefreshReg$(_c1, "Stops");
$RefreshReg$(_c2, "Vehicles");
$RefreshReg$(_c3, "TripSidebar");
$RefreshReg$(_c4, "JourneySidebar");
$RefreshReg$(_c5, "BigMap");

  $parcel$ReactRefreshHelpers$a762.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","maplibre-gl":"5t9QD","react-map-gl/maplibre":"g334S","wouter":"4hYSv","lodash/debounce":"6P4kv","./VehicleMarker":"80cMB","./JourneyMap":"2qXAQ","./LoadingSorry":"9cPeb","./Map":"d2niv","./StopPopup":"3ANPd","./TripMap":"3d1yR","./TripTimetable":"jiDUM","./VehiclePopup":"dcM9Y","./utils":"5hJ9y","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"6P4kv":[function(require,module,exports,__globalThis) {
var isObject = require("3b174a999d6a40ac"), now = require("575b2317167ce20d"), toNumber = require("a13332670c5c0f63");
/** Error message constants. */ var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeMax = Math.max, nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */ function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != 'function') throw new TypeError(FUNC_ERROR_TEXT);
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) return trailingEdge(time);
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now());
    }
    function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) return leadingEdge(lastCallTime);
            if (maxing) {
                // Handle invocations in a tight loop.
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) timerId = setTimeout(timerExpired, wait);
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
module.exports = debounce;

},{"3b174a999d6a40ac":"iy6kA","575b2317167ce20d":"jwusw","a13332670c5c0f63":"lMrNh"}],"iy6kA":[function(require,module,exports,__globalThis) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
module.exports = isObject;

},{}],"jwusw":[function(require,module,exports,__globalThis) {
var root = require("6439589d9d88d885");
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */ var now = function() {
    return root.Date.now();
};
module.exports = now;

},{"6439589d9d88d885":"fIPY4"}],"fIPY4":[function(require,module,exports,__globalThis) {
var freeGlobal = require("cd92e8811deaabf5");
/** Detect free variable `self`. */ var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

},{"cd92e8811deaabf5":"7PDi6"}],"7PDi6":[function(require,module,exports,__globalThis) {
/** Detect free variable `global` from Node.js. */ var global = arguments[3];
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
module.exports = freeGlobal;

},{}],"lMrNh":[function(require,module,exports,__globalThis) {
var baseTrim = require("261e89907fb89d78"), isObject = require("faaa289d287a34a5"), isSymbol = require("47b3bd23f771891");
/** Used as references for various `Number` constants. */ var NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == 'number') return value;
    if (isSymbol(value)) return NAN;
    if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') return value === 0 ? value : +value;
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = toNumber;

},{"261e89907fb89d78":"ft4KW","faaa289d287a34a5":"iy6kA","47b3bd23f771891":"19I3b"}],"ft4KW":[function(require,module,exports,__globalThis) {
var trimmedEndIndex = require("985d3c9be7b51937");
/** Used to match leading whitespace. */ var reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */ function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}
module.exports = baseTrim;

},{"985d3c9be7b51937":"ay0y1"}],"ay0y1":[function(require,module,exports,__globalThis) {
/** Used to match a single whitespace character. */ var reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */ function trimmedEndIndex(string) {
    var index = string.length;
    while(index-- && reWhitespace.test(string.charAt(index)));
    return index;
}
module.exports = trimmedEndIndex;

},{}],"19I3b":[function(require,module,exports,__globalThis) {
var baseGetTag = require("6118c0d5630f51ce"), isObjectLike = require("74644060ad1a1d3c");
/** `Object#toString` result references. */ var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
module.exports = isSymbol;

},{"6118c0d5630f51ce":"5tUMs","74644060ad1a1d3c":"6ihCT"}],"5tUMs":[function(require,module,exports,__globalThis) {
var Symbol = require("68a84eb98c5d3fa2"), getRawTag = require("9b2aaf31b7bdd837"), objectToString = require("46d5beb3375f8a28");
/** `Object#toString` result references. */ var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
/** Built-in value references. */ var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    if (value == null) return value === undefined ? undefinedTag : nullTag;
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
module.exports = baseGetTag;

},{"68a84eb98c5d3fa2":"ltBgQ","9b2aaf31b7bdd837":"hUnJq","46d5beb3375f8a28":"3FleQ"}],"ltBgQ":[function(require,module,exports,__globalThis) {
var root = require("9ff1abd51ad45ac0");
/** Built-in value references. */ var Symbol = root.Symbol;
module.exports = Symbol;

},{"9ff1abd51ad45ac0":"fIPY4"}],"hUnJq":[function(require,module,exports,__globalThis) {
var Symbol = require("e9b4533b2a68f814");
/** Used for built-in method references. */ var objectProto = Object.prototype;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var nativeObjectToString = objectProto.toString;
/** Built-in value references. */ var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[symToStringTag] = tag;
        else delete value[symToStringTag];
    }
    return result;
}
module.exports = getRawTag;

},{"e9b4533b2a68f814":"ltBgQ"}],"3FleQ":[function(require,module,exports,__globalThis) {
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function objectToString(value) {
    return nativeObjectToString.call(value);
}
module.exports = objectToString;

},{}],"6ihCT":[function(require,module,exports,__globalThis) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return value != null && typeof value == 'object';
}
module.exports = isObjectLike;

},{}],"3d1yR":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$7982 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$7982.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Route", ()=>Route);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibre = require("react-map-gl/maplibre");
var _map = require("./Map");
var _s = $RefreshSig$();
const Route = /*#__PURE__*/ _s((0, _reactDefault.default).memo(_c = _s(function Route({ times }) {
    _s();
    const theme = (0, _reactDefault.default).useContext((0, _map.ThemeContext));
    const darkMode = theme === "alidade_smooth_dark" || theme === "alidade_satellite";
    const stopsStyle = {
        id: "stops",
        type: "symbol",
        layout: {
            "symbol-sort-key": [
                "get",
                "priority"
            ],
            "text-field": [
                "get",
                "time"
            ],
            "text-size": 11,
            "text-font": [
                "Stadia Regular"
            ]
        },
        paint: {
            "text-color": darkMode ? "#fff" : "#333",
            "text-halo-color": darkMode ? "#333" : "#fff",
            "text-halo-width": 2
        }
    };
    const routeStyle = {
        type: "line",
        paint: {
            "line-color": darkMode ? "#ddd" : "#666",
            "line-width": 3
        }
    };
    const lineStyle = {
        type: "line",
        paint: {
            "line-color": darkMode ? "#eee" : "#666",
            "line-width": 2,
            "line-dasharray": [
                2,
                2
            ]
        }
    };
    const lines = [];
    const lineStrings = [];
    let prevTime;
    let prevLocation;
    let i = null;
    for (const time of times){
        if (time.track) lineStrings.push(time.track);
        else if (prevTime && prevLocation && time.stop.location) {
            if (prevTime.track || i === null) {
                lines.push([
                    prevLocation,
                    time.stop.location
                ]);
                i = lines.length - 1;
            } else lines[i].push(time.stop.location);
        }
        prevTime = time;
        prevLocation = time.stop.location;
    }
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: lineStrings.map((lineString)=>{
                        return {
                            type: "Feature",
                            geometry: {
                                type: "LineString",
                                coordinates: lineString
                            },
                            properties: null
                        };
                    })
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    ...routeStyle
                }, void 0, false, {
                    fileName: "frontend/js/TripMap.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/TripMap.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: lines.map((line)=>{
                        return {
                            type: "Feature",
                            geometry: {
                                type: "LineString",
                                coordinates: line
                            },
                            properties: null
                        };
                    })
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    ...lineStyle
                }, void 0, false, {
                    fileName: "frontend/js/TripMap.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/TripMap.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: times.filter((stop)=>stop.stop.location).map((stop)=>{
                        return {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: stop.stop.location
                            },
                            properties: {
                                url: stop.stop.atco_code ? `/stops/${stop.stop.atco_code}` : null,
                                name: stop.stop.name,
                                bearing: stop.stop.bearing,
                                time: stop.aimed_arrival_time || stop.aimed_departure_time || stop.expected_arrival_time,
                                priority: stop.timing_status === "PTP" ? 0 : 1
                            }
                        };
                    })
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    ...stopsStyle
                }, void 0, false, {
                    fileName: "frontend/js/TripMap.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/TripMap.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/TripMap.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}, "+C1P7ukOg/azcV4AZ819oyezFOE=")), "+C1P7ukOg/azcV4AZ819oyezFOE=");
_c1 = Route;
var _c, _c1;
$RefreshReg$(_c, "Route$React.memo");
$RefreshReg$(_c1, "Route");

  $parcel$ReactRefreshHelpers$7982.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-map-gl/maplibre":"g334S","./Map":"d2niv","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}]},["fsRwl","2ICvc"], null, "parcelRequire94c2")

//# sourceMappingURL=MapRouter.656ef92b.js.map
