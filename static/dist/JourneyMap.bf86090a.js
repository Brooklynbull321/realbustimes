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

},{"f11b6b8f6a1f6f0b":"3zK3f","f490fb404efab291":"7ixpT"}],"5wscS":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "5f4c3916ce7975d9";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "6ca45951bf86090a";
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

},{}],"2qXAQ":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$ceb0 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$ceb0.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Locations", ()=>Locations);
parcelHelpers.export(exports, "JourneyStops", ()=>JourneyStops);
parcelHelpers.export(exports, "default", ()=>JourneyMap);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibre = require("react-map-gl/maplibre");
var _map = require("./Map");
var _mapDefault = parcelHelpers.interopDefault(_map);
var _loadingSorry = require("./LoadingSorry");
var _loadingSorryDefault = parcelHelpers.interopDefault(_loadingSorry);
var _stopPopup = require("./StopPopup");
var _stopPopupDefault = parcelHelpers.interopDefault(_stopPopup);
var _tripTimetable = require("./TripTimetable");
var _tripTimetableDefault = parcelHelpers.interopDefault(_tripTimetable);
var _vehicleMarker = require("./VehicleMarker");
var _vehicleMarkerDefault = parcelHelpers.interopDefault(_vehicleMarker);
var _vehiclePopup = require("./VehiclePopup");
var _vehiclePopupDefault = parcelHelpers.interopDefault(_vehiclePopup);
var _utils = require("./utils");
var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$();
const Locations = /*#__PURE__*/ (0, _reactDefault.default).memo(_s(function Locations({ locations }) {
    _s();
    const theme = (0, _reactDefault.default).useContext((0, _map.ThemeContext));
    const darkMode = theme === "alidade_smooth_dark" || theme === "alidade_satellite" || theme === "alidade_36_dark";
    const routeStyle = {
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
    const locationsStyle = {
        id: "locations",
        type: "symbol",
        layout: {
            "text-field": [
                "get",
                "time"
            ],
            "text-size": 12,
            "text-font": [
                "Stadia Regular"
            ],
            "icon-rotate": [
                "+",
                45,
                [
                    "get",
                    "heading"
                ]
            ],
            "icon-image": "arrow",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "icon-anchor": "top-left",
            "text-allow-overlap": true
        },
        paint: {
            "text-opacity": [
                "case",
                [
                    "boolean",
                    [
                        "feature-state",
                        "hover"
                    ],
                    false
                ],
                1,
                0
            ],
            "text-color": darkMode ? "#fff" : "#333",
            "text-halo-color": darkMode ? "#333" : "#fff",
            "text-halo-width": 3
        }
    };
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: {
                    type: "LineString",
                    coordinates: locations.map((l)=>l.coordinates)
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    ...routeStyle
                }, void 0, false, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                id: "locations",
                data: {
                    type: "FeatureCollection",
                    features: locations.map((l)=>{
                        return {
                            type: "Feature",
                            id: l.id,
                            geometry: {
                                type: "Point",
                                coordinates: l.coordinates
                            },
                            properties: {
                                // delta: l.delta,
                                heading: l.direction,
                                // datetime: l.datetime,
                                time: new Date(l.datetime).toTimeString().slice(0, 8)
                            }
                        };
                    })
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    ...locationsStyle
                }, void 0, false, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}, "+C1P7ukOg/azcV4AZ819oyezFOE="));
_c = Locations;
const JourneyStops = /*#__PURE__*/ (0, _reactDefault.default).memo(_s1(function Stops({ stops, clickedStopUrl, setClickedStop }) {
    _s1();
    const theme = (0, _reactDefault.default).useContext((0, _map.ThemeContext));
    const darkMode = theme === "alidade_smooth_dark" || theme === "alidade_satellite" || theme === "alidade_36_dark";
    const features = (0, _reactDefault.default).useMemo(()=>{
        return stops.filter((s)=>s.coordinates).map((s)=>{
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: s.coordinates
                },
                properties: {
                    url: `/stops/${s.atco_code}`,
                    name: s.name,
                    heading: s.heading
                }
            };
        });
    }, [
        stops
    ]);
    const featuresByUrl = (0, _reactDefault.default).useMemo(()=>{
        return Object.assign({}, ...features.map((stop)=>({
                [stop.properties.url]: stop
            })));
    }, [
        features
    ]);
    const clickedStop = featuresByUrl && clickedStopUrl && featuresByUrl[clickedStopUrl];
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Source), {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: features
                },
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Layer), {
                    id: "stops",
                    type: "symbol",
                    layout: {
                        // "symbol-sort-key": ["get", "priority"],
                        "icon-rotate": [
                            "+",
                            45,
                            [
                                "get",
                                "heading"
                            ]
                        ],
                        "icon-image": [
                            "case",
                            [
                                "==",
                                [
                                    "get",
                                    "heading"
                                ],
                                [
                                    "literal",
                                    null
                                ]
                            ],
                            darkMode ? "route-stop-marker-dark-circle" : "route-stop-marker-circle",
                            darkMode ? "route-stop-marker-dark" : "route-stop-marker"
                        ],
                        // "icon-padding": 0,
                        "icon-allow-overlap": true,
                        "icon-ignore-placement": true
                    }
                }, void 0, false, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            clickedStop && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _stopPopupDefault.default), {
                item: clickedStop,
                onClose: ()=>setClickedStop(undefined)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 231,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}, "Tslu9n1LIu8RiaHhBBqV8mgQlz8="));
_c1 = JourneyStops;
function nextOrPreviousLink(today, nextOrPrevious) {
    const nextOrPreviousDate = new Date(nextOrPrevious.datetime);
    const string = nextOrPreviousDate.toLocaleDateString();
    const timeString = nextOrPreviousDate.toTimeString().slice(0, 5);
    if (string === today) return timeString;
    return `${string} ${timeString}`;
}
function Sidebar({ journey, loading, onMouseEnter, vehicle }) {
    _s2();
    let className = "trip-timetable map-sidebar";
    if (loading) className += " loading";
    const trip = (0, _reactDefault.default).useMemo(()=>{
        return (0, _tripTimetable.tripFromJourney)(journey);
    }, [
        journey
    ]);
    const today = new Date(journey.datetime).toLocaleDateString();
    let previousLink;
    let nextLink;
    if (journey) {
        if (journey.previous) {
            previousLink = nextOrPreviousLink(today, journey.previous);
            previousLink = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                className: "previous",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                    href: `#journeys/${journey.previous.id}`,
                    children: [
                        "\u2190 ",
                        previousLink
                    ]
                }, void 0, true, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 284,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 283,
                columnNumber: 9
            }, this);
        }
        if (journey.next) {
            nextLink = nextOrPreviousLink(today, journey.next);
            nextLink = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                className: "next",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                    href: `#journeys/${journey.next.id}`,
                    children: [
                        nextLink,
                        " \u2192"
                    ]
                }, void 0, true, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 292,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 291,
                columnNumber: 9
            }, this);
        }
    }
    let text = today;
    let reg = null;
    if (journey.vehicle) {
        reg = journey.vehicle;
        if (journey.vehicle.includes(" ")) {
            if (journey.vehicle.includes(" - ")) {
                const parts = journey.vehicle.split(" - ", 2);
                text += ` ${parts[0]}`;
                reg = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                    className: "reg",
                    children: parts[1]
                }, void 0, false, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 306,
                    columnNumber: 15
                }, this);
            }
        }
    } else {
        text += ` ${journey.route_name}`;
        if (journey.destination) text += ` to ${journey.destination}`;
    }
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "navigation",
                children: [
                    previousLink,
                    nextLink
                ]
            }, void 0, true, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                children: [
                    text,
                    " ",
                    reg
                ]
            }, void 0, true, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            trip ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _tripTimetableDefault.default), {
                onMouseEnter: onMouseEnter,
                trip: trip,
                vehicle: vehicle
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 326,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                children: journey.code
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 332,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s2(Sidebar, "RgIM/0dzxsJXcp0TH9jngvuMWTQ=");
_c2 = Sidebar;
function JourneyVehicle({ vehicleId, // journey,
onVehicleMove, clickedVehicleMarker, setClickedVehicleMarker }) {
    _s3();
    const [vehicle, setVehicle] = (0, _reactDefault.default).useState();
    (0, _reactDefault.default).useEffect(()=>{
        if (vehicle) onVehicleMove(vehicle);
    }, [
        vehicle,
        onVehicleMove
    ]);
    (0, _reactDefault.default).useEffect(()=>{
        if (!vehicleId) return;
        let timeout;
        let current = true;
        const loadVehicle = ()=>{
            fetch(`/vehicles.json?id=${vehicleId}`).then((response)=>{
                response.json().then((data)=>{
                    if (current && data && data.length) {
                        setVehicle(data[0]);
                        timeout = window.setTimeout(loadVehicle, 12000); // 12 seconds
                    }
                });
            });
        };
        loadVehicle();
        return ()=>{
            current = false;
            clearTimeout(timeout);
        };
    }, [
        vehicleId
    ]);
    if (!vehicle) return null;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _vehicleMarkerDefault.default), {
                selected: clickedVehicleMarker,
                vehicle: vehicle
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            clickedVehicleMarker ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _vehiclePopupDefault.default), {
                item: vehicle,
                onClose: ()=>setClickedVehicleMarker(false)
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 394,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 391,
        columnNumber: 5
    }, this);
}
_s3(JourneyVehicle, "XdODH6i5hRm4N28+iePMNUUpl8Q=");
_c3 = JourneyVehicle;
function JourneyMap({ journey, loading = false }) {
    _s4();
    const [cursor, setCursor] = (0, _reactDefault.default).useState();
    const hoveredLocation = (0, _reactDefault.default).useRef();
    const onMouseEnter = (0, _reactDefault.default).useCallback((e)=>{
        var _e_features;
        const vehicleId = (0, _vehicleMarker.getClickedVehicleMarkerId)(e);
        if (vehicleId) return;
        if ((_e_features = e.features) === null || _e_features === void 0 ? void 0 : _e_features.length) {
            setCursor("pointer");
            for (const feature of e.features)if (feature.layer.id === "locations") {
                if (hoveredLocation.current) e.target.setFeatureState({
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
    // setClickedLocation(undefined);
    }, []);
    const [clickedStopUrl, setClickedStop] = (0, _reactDefault.default).useState();
    const [clickedVehicleMarker, setClickedVehicleMarker] = (0, _reactDefault.default).useState(true);
    const [locations, setLocations] = (0, _reactDefault.default).useState([]);
    const [vehicle, setVehicle] = (0, _reactDefault.default).useState();
    const handleVehicleMove = (0, _reactDefault.default).useCallback((vehicle)=>{
        if (!locations.length || locations[locations.length - 1].datetime > vehicle.datetime) {
            setLocations(locations.concat([
                {
                    id: new Date(vehicle.datetime).getTime(),
                    coordinates: vehicle.coordinates,
                    // delta: null,
                    datetime: vehicle.datetime,
                    direction: vehicle.heading
                }
            ]));
            setVehicle(vehicle);
        }
    }, [
        locations
    ]);
    const handleMapClick = (0, _reactDefault.default).useCallback((e)=>{
        var _e_features;
        const vehicleId = (0, _vehicleMarker.getClickedVehicleMarkerId)(e);
        if (vehicleId) {
            setClickedVehicleMarker(true);
            setClickedStop(undefined);
            return;
        }
        setClickedVehicleMarker(false);
        if ((_e_features = e.features) === null || _e_features === void 0 ? void 0 : _e_features.length) {
            for (const feature of e.features)if (feature.layer.id === "stops") {
                setClickedStop(feature.properties.url);
                break;
            }
        } else setClickedStop(undefined);
    }, []);
    const handleRowHover = (0, _reactDefault.default).useCallback((a)=>{
        if (a.stop.location && a.stop.atco_code) setClickedStop(`/stops/${a.stop.atco_code}`);
    }, []);
    const mapRef = (0, _reactDefault.default).useRef();
    const bounds = (0, _reactDefault.default).useMemo(()=>{
        if (journey) {
            const bounds = (0, _utils.getBounds)(journey.stops, (item)=>item.coordinates);
            return (0, _utils.getBounds)(journey.locations, (item)=>item.coordinates, bounds);
        }
    }, [
        journey
    ]);
    const onMapInit = (0, _reactDefault.default).useCallback((map)=>{
        // debugger;
        mapRef.current = map;
    // if (bounds) {
    //   map.fitBounds(bounds, {
    //     padding: 50,
    //   });
    // }
    }, []);
    (0, _reactDefault.default).useEffect(()=>{
        if (bounds && mapRef.current) mapRef.current.fitBounds(bounds, {
            padding: 50
        });
    }, [
        bounds
    ]);
    if (!journey) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loadingSorryDefault.default), {}, void 0, false, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 538,
        columnNumber: 12
    }, this);
    let className = "journey-map has-sidebar";
    if (!journey.stops) className += " no-stops";
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: className,
                children: bounds ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _mapDefault.default), {
                    initialViewState: {
                        bounds: bounds,
                        fitBoundsOptions: {
                            padding: 50
                        }
                    },
                    cursor: cursor,
                    onMouseEnter: onMouseEnter,
                    onMouseMove: onMouseEnter,
                    onMouseLeave: onMouseLeave,
                    onClick: handleMapClick,
                    onMapInit: onMapInit,
                    interactiveLayerIds: [
                        "stops",
                        "locations"
                    ],
                    children: [
                        journey.stops ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(JourneyStops, {
                            stops: journey.stops,
                            clickedStopUrl: clickedStopUrl,
                            setClickedStop: setClickedStop
                        }, void 0, false, {
                            fileName: "frontend/js/JourneyMap.tsx",
                            lineNumber: 566,
                            columnNumber: 15
                        }, this) : null,
                        journey.locations ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Locations, {
                            locations: journey.current ? journey.locations.concat(locations) : journey.locations
                        }, void 0, false, {
                            fileName: "frontend/js/JourneyMap.tsx",
                            lineNumber: 574,
                            columnNumber: 15
                        }, this) : null,
                        journey.locations && journey.current ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(JourneyVehicle, {
                            vehicleId: window.VEHICLE_ID,
                            // journey={journey}
                            onVehicleMove: handleVehicleMove,
                            clickedVehicleMarker: clickedVehicleMarker,
                            setClickedVehicleMarker: setClickedVehicleMarker
                        }, void 0, false, {
                            fileName: "frontend/js/JourneyMap.tsx",
                            lineNumber: 583,
                            columnNumber: 15
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "frontend/js/JourneyMap.tsx",
                    lineNumber: 550,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Sidebar, {
                loading: loading,
                journey: journey,
                onMouseEnter: handleRowHover,
                vehicle: vehicle
            }, void 0, false, {
                fileName: "frontend/js/JourneyMap.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/JourneyMap.tsx",
        lineNumber: 547,
        columnNumber: 5
    }, this);
}
_s4(JourneyMap, "30VgWRIn1fe49JkJMMePW9yYeFw=");
_c4 = JourneyMap;
var _c, _c1, _c2, _c3, _c4;
$RefreshReg$(_c, "Locations");
$RefreshReg$(_c1, "JourneyStops");
$RefreshReg$(_c2, "Sidebar");
$RefreshReg$(_c3, "JourneyVehicle");
$RefreshReg$(_c4, "JourneyMap");

  $parcel$ReactRefreshHelpers$ceb0.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-map-gl/maplibre":"g334S","./Map":"d2niv","./LoadingSorry":"9cPeb","./StopPopup":"3ANPd","./TripTimetable":"jiDUM","./VehicleMarker":"80cMB","./VehiclePopup":"dcM9Y","./utils":"5hJ9y","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"jiDUM":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$9a64 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$9a64.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tripFromJourney", ()=>tripFromJourney);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _s = $RefreshSig$(), _s1 = $RefreshSig$();
function Row({ stop, onMouseEnter, vehicle, aimedColumn, highlightedStop, first = false, last = false }) {
    _s();
    const handleMouseEnter = (0, _reactDefault.default).useCallback(()=>{
        if (onMouseEnter) {
            if (stop.stop.location) onMouseEnter(stop);
        }
    }, [
        stop,
        onMouseEnter
    ]);
    let className;
    let stopName = stop.stop.name;
    if (stop.stop.icon) stopName = `${stopName} (${stop.stop.icon})`;
    if (stop.stop.atco_code) {
        const url = `/stops/${stop.stop.atco_code}`;
        if (url === highlightedStop) className = "is-highlighted";
        stopName = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
            href: url,
            children: stopName
        }, void 0, false, {
            fileName: "frontend/js/TripTimetable.tsx",
            lineNumber: 88,
            columnNumber: 16
        }, this);
    }
    if (stop.timing_status && stop.timing_status !== "PTP") className = className ? `${className} minor` : "minor";
    let rowSpan;
    if (aimedColumn && stop.aimed_arrival_time && stop.aimed_departure_time && stop.aimed_arrival_time !== stop.aimed_departure_time) rowSpan = 2;
    let actual;
    let actualRowSpan = rowSpan;
    actual = stop.expected_departure_time || stop.expected_arrival_time; // Irish live departures
    if (!actual) {
        if ((vehicle === null || vehicle === void 0 ? void 0 : vehicle.progress) && vehicle.progress.id === stop.id) {
            actual = vehicle.datetime;
            if (vehicle.progress.progress > 0.1) actualRowSpan = (actualRowSpan || 1) + 1;
        } else if (!(vehicle === null || vehicle === void 0 ? void 0 : vehicle.progress) || vehicle.progress.id > stop.id) actual = stop.actual_departure_time; // vehicle history
        if (actual) actual = new Date(actual).toTimeString().slice(0, 5);
    }
    if (actual) actual = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
        rowSpan: actualRowSpan,
        children: actual
    }, void 0, false, {
        fileName: "frontend/js/TripTimetable.tsx",
        lineNumber: 124,
        columnNumber: 14
    }, this);
    let caveat;
    if (!first && !last) {
        if (stop.set_down === false) {
            if (stop.pick_up === false) caveat = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("abbr", {
                title: "does not stop",
                children: "pass"
            }, void 0, false, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 131,
                columnNumber: 18
            }, this);
            else caveat = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("abbr", {
                title: "picks up only",
                children: "p"
            }, void 0, false, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 133,
                columnNumber: 18
            }, this);
        } else if (stop.pick_up === false) caveat = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("abbr", {
            title: "sets down only",
            children: "s"
        }, void 0, false, {
            fileName: "frontend/js/TripTimetable.tsx",
            lineNumber: 136,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                className: className,
                onMouseEnter: handleMouseEnter,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                        className: "stop-name",
                        rowSpan: rowSpan,
                        children: stopName
                    }, void 0, false, {
                        fileName: "frontend/js/TripTimetable.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    aimedColumn ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                        children: [
                            stop.aimed_arrival_time || stop.aimed_departure_time,
                            caveat
                        ]
                    }, void 0, true, {
                        fileName: "frontend/js/TripTimetable.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this) : null,
                    actual
                ]
            }, void 0, true, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            rowSpan ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                className: className,
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                    children: stop.aimed_departure_time
                }, void 0, false, {
                    fileName: "frontend/js/TripTimetable.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/TripTimetable.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(Row, "6kMML3dc+lNidWEtX9Ik5DXeC7g=");
_c = Row;
const tripFromJourney = (journey)=>{
    if (journey.stops) return {
        times: journey.stops.map((stop, i)=>{
            return {
                id: stop.id,
                stop: {
                    atco_code: stop.atco_code,
                    name: stop.name,
                    location: stop.coordinates || undefined
                },
                timing_status: stop.minor ? "OTH" : "PTP",
                aimed_arrival_time: stop.aimed_arrival_time,
                aimed_departure_time: stop.aimed_departure_time,
                actual_departure_time: stop.actual_departure_time
            };
        })
    };
};
const TripTimetable = /*#__PURE__*/ _s1((0, _reactDefault.default).memo(_c1 = _s1(function TripTimetable({ trip, onMouseEnter, vehicle, highlightedStop }) {
    var _trip_times, _trip_times1, _trip_notes;
    _s1();
    const [showEarlierStops, setShowEarlierStops] = (0, _reactDefault.default).useState(false);
    const aimedColumn = (_trip_times = trip.times) === null || _trip_times === void 0 ? void 0 : _trip_times.some((item)=>item.aimed_arrival_time || item.aimed_departure_time);
    const actualColumn = vehicle || ((_trip_times1 = trip.times) === null || _trip_times1 === void 0 ? void 0 : _trip_times1.some((item)=>item.actual_departure_time || item.expected_arrival_time || item.expected_departure_time));
    let earlierStops = false;
    let times = trip.times;
    if (!showEarlierStops && vehicle && vehicle.progress) {
        const index = times.findIndex((item)=>{
            var _vehicle_progress;
            return item.id === ((_vehicle_progress = vehicle.progress) === null || _vehicle_progress === void 0 ? void 0 : _vehicle_progress.id);
        });
        if (index > 0) {
            times = times.slice(index);
            earlierStops = true;
        }
    }
    const indexOfLastRow = times.length - 1;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
        children: [
            earlierStops || showEarlierStops ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                        type: "checkbox",
                        checked: showEarlierStops,
                        onChange: ()=>setShowEarlierStops(!showEarlierStops)
                    }, void 0, false, {
                        fileName: "frontend/js/TripTimetable.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    " Show previous stops"
                ]
            }, void 0, true, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    className: "stop-name"
                                }, void 0, false, {
                                    fileName: "frontend/js/TripTimetable.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                aimedColumn ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Sched\xaduled"
                                }, void 0, false, {
                                    fileName: "frontend/js/TripTimetable.tsx",
                                    lineNumber: 237,
                                    columnNumber: 28
                                }, this) : null,
                                actualColumn ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Actual"
                                }, void 0, false, {
                                    fileName: "frontend/js/TripTimetable.tsx",
                                    lineNumber: 238,
                                    columnNumber: 29
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "frontend/js/TripTimetable.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "frontend/js/TripTimetable.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                        children: times.map((stop, i)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Row, {
                                aimedColumn: aimedColumn,
                                stop: stop,
                                onMouseEnter: onMouseEnter,
                                vehicle: vehicle,
                                highlightedStop: highlightedStop,
                                first: i === 0 && !earlierStops,
                                last: i === indexOfLastRow
                            }, stop.id || i, false, {
                                fileName: "frontend/js/TripTimetable.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "frontend/js/TripTimetable.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "frontend/js/TripTimetable.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            (_trip_notes = trip.notes) === null || _trip_notes === void 0 ? void 0 : _trip_notes.map((note)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                    children: note.text
                }, note.code, false, {
                    fileName: "frontend/js/TripTimetable.tsx",
                    lineNumber: 257,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "frontend/js/TripTimetable.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}, "4UuBrO9azZmRRf0gAi2ZkNDkPN8=")), "4UuBrO9azZmRRf0gAi2ZkNDkPN8=");
_c2 = TripTimetable;
exports.default = TripTimetable;
var _c, _c1, _c2;
$RefreshReg$(_c, "Row");
$RefreshReg$(_c1, "TripTimetable$React.memo");
$RefreshReg$(_c2, "TripTimetable");

  $parcel$ReactRefreshHelpers$9a64.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"5hJ9y":[function(require,module,exports,__globalThis) {
// import { useState } from "react";
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useDarkMode", ()=>useDarkMode);
parcelHelpers.export(exports, "getBounds", ()=>getBounds);
var _maplibreGl = require("maplibre-gl");
const useDarkMode = ()=>{
    // const query = window.matchMedia("(prefers-color-scheme: dark)");
    // const [darkMode, setDarkMode] = useState(query.matches);
    // useEffect(() => {
    //   const handleChange = (e: MediaQueryListEvent) => {
    //     setDarkMode(e.matches);
    //   };
    //   query.addEventListener("change", handleChange);
    //   return () => {
    //     query.removeEventListener("change", handleChange);
    //   };
    // }, [query]);
    // const [darkMode, _] = useState(() => {
    //   try {
    //     const mapStyle = localStorage.getItem("map-style");
    //     if (mapStyle) {
    //       return mapStyle.endsWith("_dark");
    //     }
    //   } catch {
    //     // ignore
    //   }
    //   return false;
    // });
    // return darkMode;
    return false;
};
function getBounds(list, key, initialBounds) {
    if (list === null || list === void 0 ? void 0 : list.length) {
        const bounds = initialBounds || new (0, _maplibreGl.LngLatBounds)();
        list.reduce((bounds, item)=>{
            if (item) {
                const value = key(item);
                if (value) bounds.extend(value);
            }
            return bounds;
        }, bounds);
        return bounds;
    }
}

},{"maplibre-gl":"5t9QD","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}]},["fsRwl","5wscS"], null, "parcelRequire94c2")

//# sourceMappingURL=JourneyMap.bf86090a.js.map
