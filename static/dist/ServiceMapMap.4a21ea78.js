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
})({"cRCuN":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "5f4c3916ce7975d9";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "27c9b59e4a21ea78";
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

},{}],"g334S":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Marker", ()=>(0, _markerJs.Marker));
parcelHelpers.export(exports, "Popup", ()=>(0, _popupJs.Popup));
parcelHelpers.export(exports, "AttributionControl", ()=>(0, _attributionControlJs.AttributionControl));
parcelHelpers.export(exports, "FullscreenControl", ()=>(0, _fullscreenControlJs.FullscreenControl));
parcelHelpers.export(exports, "GeolocateControl", ()=>(0, _geolocateControlJs.GeolocateControl));
parcelHelpers.export(exports, "NavigationControl", ()=>(0, _navigationControlJs.NavigationControl));
parcelHelpers.export(exports, "ScaleControl", ()=>(0, _scaleControlJs.ScaleControl));
parcelHelpers.export(exports, "TerrainControl", ()=>(0, _terrainControlJs.TerrainControl));
parcelHelpers.export(exports, "LogoControl", ()=>(0, _logoControlJs.LogoControl));
parcelHelpers.export(exports, "Source", ()=>(0, _sourceJs.Source));
parcelHelpers.export(exports, "Layer", ()=>(0, _layerJs.Layer));
parcelHelpers.export(exports, "useControl", ()=>(0, _useControlJs.useControl));
parcelHelpers.export(exports, "MapProvider", ()=>(0, _useMapJs.MapProvider));
parcelHelpers.export(exports, "useMap", ()=>(0, _useMapJs.useMap));
parcelHelpers.export(exports, "Map", ()=>(0, _mapJs.Map));
var _mapJs = require("./components/map.js");
var _markerJs = require("./components/marker.js");
var _popupJs = require("./components/popup.js");
var _attributionControlJs = require("./components/attribution-control.js");
var _fullscreenControlJs = require("./components/fullscreen-control.js");
var _geolocateControlJs = require("./components/geolocate-control.js");
var _navigationControlJs = require("./components/navigation-control.js");
var _scaleControlJs = require("./components/scale-control.js");
var _terrainControlJs = require("./components/terrain-control.js");
var _logoControlJs = require("./components/logo-control.js");
var _sourceJs = require("./components/source.js");
var _layerJs = require("./components/layer.js");
var _useControlJs = require("./components/use-control.js");
var _useMapJs = require("./components/use-map.js");
// Types
var _commonJs = require("./types/common.js");
parcelHelpers.exportAll(_commonJs, exports);
var _eventsJs = require("./types/events.js");
parcelHelpers.exportAll(_eventsJs, exports);
var _libJs = require("./types/lib.js");
parcelHelpers.exportAll(_libJs, exports);
var _styleSpecJs = require("./types/style-spec.js");
parcelHelpers.exportAll(_styleSpecJs, exports);
exports.default = (0, _mapJs.Map);

},{"./components/map.js":"lyROP","./components/marker.js":"janHd","./components/popup.js":"NcRWL","./components/attribution-control.js":"84TEX","./components/fullscreen-control.js":"3vkvH","./components/geolocate-control.js":"k02iR","./components/navigation-control.js":"a6hqp","./components/scale-control.js":"2OV98","./components/terrain-control.js":"qvC21","./components/logo-control.js":"2mu0k","./components/source.js":"7kh6X","./components/layer.js":"1mRpX","./components/use-control.js":"a1uj5","./components/use-map.js":"bh0i7","./types/common.js":"fPPEH","./types/events.js":"4APIN","./types/lib.js":"lTvQK","./types/style-spec.js":"g4ByD","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"lyROP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MapContext", ()=>MapContext);
parcelHelpers.export(exports, "Map", ()=>Map);
var _react = require("react");
var _useMapJs = require("./use-map.js");
var _maplibreJs = require("../maplibre/maplibre.js");
var _maplibreJsDefault = parcelHelpers.interopDefault(_maplibreJs);
var _createRefJs = require("../maplibre/create-ref.js");
var _createRefJsDefault = parcelHelpers.interopDefault(_createRefJs);
var _useIsomorphicLayoutEffectJs = require("../utils/use-isomorphic-layout-effect.js");
var _useIsomorphicLayoutEffectJsDefault = parcelHelpers.interopDefault(_useIsomorphicLayoutEffectJs);
var _setGlobalsJs = require("../utils/set-globals.js");
var _setGlobalsJsDefault = parcelHelpers.interopDefault(_setGlobalsJs);
const MapContext = _react.createContext(null);
function _Map(props, ref) {
    const mountedMapsContext = (0, _react.useContext)((0, _useMapJs.MountedMapsContext));
    const [mapInstance, setMapInstance] = (0, _react.useState)(null);
    const containerRef = (0, _react.useRef)();
    const { current: contextValue } = (0, _react.useRef)({
        mapLib: null,
        map: null
    });
    (0, _react.useEffect)(()=>{
        const mapLib = props.mapLib;
        let isMounted = true;
        let maplibre;
        Promise.resolve(mapLib || require("7b9c299407dc5213")).then((module)=>{
            if (!isMounted) return;
            if (!module) throw new Error('Invalid mapLib');
            const mapboxgl = 'Map' in module ? module : module.default;
            if (!mapboxgl.Map) throw new Error('Invalid mapLib');
            // workerUrl & workerClass may change the result of supported()
            // https://github.com/visgl/react-map-gl/discussions/2027
            (0, _setGlobalsJsDefault.default)(mapboxgl, props);
            if (!mapboxgl.supported || mapboxgl.supported(props)) {
                if (props.reuseMaps) maplibre = (0, _maplibreJsDefault.default).reuse(props, containerRef.current);
                if (!maplibre) maplibre = new (0, _maplibreJsDefault.default)(mapboxgl.Map, props, containerRef.current);
                contextValue.map = (0, _createRefJsDefault.default)(maplibre);
                contextValue.mapLib = mapboxgl;
                setMapInstance(maplibre);
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
            } else throw new Error('Map is not supported by this browser');
        }).catch((error)=>{
            const { onError } = props;
            if (onError) onError({
                type: 'error',
                target: null,
                originalEvent: null,
                error
            });
            else console.error(error); // eslint-disable-line
        });
        return ()=>{
            isMounted = false;
            if (maplibre) {
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                if (props.reuseMaps) maplibre.recycle();
                else maplibre.destroy();
            }
        };
    }, []);
    (0, _useIsomorphicLayoutEffectJsDefault.default)(()=>{
        if (mapInstance) mapInstance.setProps(props);
    });
    (0, _react.useImperativeHandle)(ref, ()=>contextValue.map, [
        mapInstance
    ]);
    const style = (0, _react.useMemo)(()=>({
            position: 'relative',
            width: '100%',
            height: '100%',
            ...props.style
        }), [
        props.style
    ]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return _react.createElement("div", {
        id: props.id,
        ref: containerRef,
        style: style
    }, mapInstance && _react.createElement(MapContext.Provider, {
        value: contextValue
    }, _react.createElement("div", {
        "mapboxgl-children": "",
        style: CHILD_CONTAINER_STYLE
    }, props.children)));
}
const Map = _react.forwardRef(_Map);

},{"react":"gYgqf","./use-map.js":"bh0i7","../maplibre/maplibre.js":"d8bey","../maplibre/create-ref.js":"2iZ2D","../utils/use-isomorphic-layout-effect.js":"3FDg4","../utils/set-globals.js":"lcOKm","7b9c299407dc5213":"8iWQn","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"bh0i7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MountedMapsContext", ()=>MountedMapsContext);
parcelHelpers.export(exports, "MapProvider", ()=>MapProvider);
parcelHelpers.export(exports, "useMap", ()=>useMap);
var _react = require("react");
var _mapJs = require("./map.js");
const MountedMapsContext = _react.createContext(null);
const MapProvider = (props)=>{
    const [maps, setMaps] = (0, _react.useState)({});
    const onMapMount = (0, _react.useCallback)((map, id = 'default')=>{
        setMaps((currMaps)=>{
            if (id === 'current') throw new Error("'current' cannot be used as map id");
            if (currMaps[id]) throw new Error(`Multiple maps with the same id: ${id}`);
            return {
                ...currMaps,
                [id]: map
            };
        });
    }, []);
    const onMapUnmount = (0, _react.useCallback)((id = 'default')=>{
        setMaps((currMaps)=>{
            if (currMaps[id]) {
                const nextMaps = {
                    ...currMaps
                };
                delete nextMaps[id];
                return nextMaps;
            }
            return currMaps;
        });
    }, []);
    return _react.createElement(MountedMapsContext.Provider, {
        value: {
            maps,
            onMapMount,
            onMapUnmount
        }
    }, props.children);
};
function useMap() {
    var _useContext;
    const maps = (_useContext = (0, _react.useContext)(MountedMapsContext)) === null || _useContext === void 0 ? void 0 : _useContext.maps;
    const currentMap = (0, _react.useContext)((0, _mapJs.MapContext));
    const mapsWithCurrent = (0, _react.useMemo)(()=>{
        return {
            ...maps,
            current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map
        };
    }, [
        maps,
        currentMap
    ]);
    return mapsWithCurrent;
}

},{"react":"gYgqf","./map.js":"lyROP","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"d8bey":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _transformJs = require("../utils/transform.js");
var _styleUtilsJs = require("../utils/style-utils.js");
var _deepEqualJs = require("../utils/deep-equal.js");
const DEFAULT_STYLE = {
    version: 8,
    sources: {},
    layers: []
};
const pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
const cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
const otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
const settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
const handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
/**
 * A wrapper for mapbox-gl's Map class
 */ class Maplibre {
    get map() {
        return this._map;
    }
    setProps(props) {
        const oldProps = this.props;
        this.props = props;
        const settingsChanged = this._updateSettings(props, oldProps);
        const sizeChanged = this._updateSize(props);
        const viewStateChanged = this._updateViewState(props);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || viewStateChanged && !this._map.isMoving()) this.redraw();
    }
    static reuse(props, container) {
        const that = Maplibre.savedMaps.pop();
        if (!that) return null;
        const map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step 1: reparenting child nodes from old container to new container
        const oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while(oldContainer.childNodes.length > 0)container.appendChild(oldContainer.childNodes[0]);
        // Step 2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
        // When reusing the saved map, we need to disconnect the observer and observe the new container.
        // Step 3: telling the ResizeObserver to disconnect and observe the new container
        // @ts-ignore
        const resizeObserver = map._resizeObserver;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(container);
        }
        // Step 4: apply new props
        that.setProps({
            ...props,
            styleDiffing: false
        });
        map.resize();
        const { initialViewState } = props;
        if (initialViewState) {
            if (initialViewState.bounds) map.fitBounds(initialViewState.bounds, {
                ...initialViewState.fitBoundsOptions,
                duration: 0
            });
            else that._updateViewState(initialViewState);
        }
        // Simulate load event
        if (map.isStyleLoaded()) map.fire('load');
        else map.once('style.load', ()=>map.fire('load'));
        // Force reload
        // @ts-ignore
        map._update();
        return that;
    }
    /* eslint-disable complexity,max-statements */ _initialize(container) {
        const { props } = this;
        const { mapStyle = DEFAULT_STYLE } = props;
        const mapOptions = {
            ...props,
            ...props.initialViewState,
            container,
            style: (0, _styleUtilsJs.normalizeStyle)(mapStyle)
        };
        const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [
                viewState.longitude || 0,
                viewState.latitude || 0
            ],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            const getContext = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = ()=>{
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext;
                return props.gl;
            };
        }
        const map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) map.setPadding(viewState.padding);
        if (props.cursor) map.getCanvas().style.cursor = props.cursor;
        // add listeners
        map.transformCameraUpdate = this._onCameraUpdate;
        map.on('style.load', ()=>{
            var _map_getProjection;
            // Map style has changed, this would have wiped out all settings from props
            this._styleComponents = {
                light: map.getLight(),
                sky: map.getSky(),
                // @ts-ignore getProjection() does not exist in v4
                projection: (_map_getProjection = map.getProjection) === null || _map_getProjection === void 0 ? void 0 : _map_getProjection.call(map),
                terrain: map.getTerrain()
            };
            this._updateStyleComponents(this.props);
        });
        map.on('sourcedata', ()=>{
            // Some sources have loaded, we may need them to attach terrain
            this._updateStyleComponents(this.props);
        });
        for(const eventName in pointerEvents)map.on(eventName, this._onPointerEvent);
        for(const eventName in cameraEvents)map.on(eventName, this._onCameraEvent);
        for(const eventName in otherEvents)map.on(eventName, this._onEvent);
        this._map = map;
    }
    /* eslint-enable complexity,max-statements */ recycle() {
        // Clean up unnecessary elements before storing for reuse.
        const container = this.map.getContainer();
        const children = container.querySelector('[mapboxgl-children]');
        children === null || children === void 0 ? void 0 : children.remove();
        Maplibre.savedMaps.push(this);
    }
    destroy() {
        this._map.remove();
    }
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    redraw() {
        const map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    }
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */ _updateSize(nextProps) {
        // Check if size is controlled
        const { viewState } = nextProps;
        if (viewState) {
            const map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    }
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */ _updateViewState(nextProps) {
        const map = this._map;
        const tr = map.transform;
        const isMoving = map.isMoving();
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            const changes = (0, _transformJs.applyViewStateToTransform)(tr, nextProps);
            if (Object.keys(changes).length > 0) {
                this._internalUpdate = true;
                map.jumpTo(changes);
                this._internalUpdate = false;
                return true;
            }
        }
        return false;
    }
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */ _updateSettings(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of settingNames)if (propName in nextProps && !(0, _deepEqualJs.deepEqual)(nextProps[propName], currProps[propName])) {
            changed = true;
            const setter = map[`set${propName[0].toUpperCase()}${propName.slice(1)}`];
            setter === null || setter === void 0 ? void 0 : setter.call(map, nextProps[propName]);
        }
        return changed;
    }
    /* Update map style to match props */ _updateStyle(nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) this._map.getCanvas().style.cursor = nextProps.cursor || '';
        if (nextProps.mapStyle !== currProps.mapStyle) {
            const { mapStyle = DEFAULT_STYLE, styleDiffing = true } = nextProps;
            const options = {
                diff: styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) // @ts-ignore Mapbox specific prop
            options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            this._map.setStyle((0, _styleUtilsJs.normalizeStyle)(mapStyle), options);
        }
    }
    /* Update fog, light, projection and terrain to match props
     * These props are special because
     * 1. They can not be applied right away. Certain conditions (style loaded, source loaded, etc.) must be met
     * 2. They can be overwritten by mapStyle
     */ _updateStyleComponents({ light, projection, sky, terrain }) {
        const map = this._map;
        const currProps = this._styleComponents;
        // We can safely manipulate map style once it's loaded
        if (map.style._loaded) {
            var _currProps_projection;
            if (light && !(0, _deepEqualJs.deepEqual)(light, currProps.light)) {
                currProps.light = light;
                map.setLight(light);
            }
            if (projection && !(0, _deepEqualJs.deepEqual)(projection, currProps.projection) && projection !== ((_currProps_projection = currProps.projection) === null || _currProps_projection === void 0 ? void 0 : _currProps_projection.type)) {
                var // @ts-ignore setProjection does not exist in v4
                _map_setProjection;
                currProps.projection = typeof projection === 'string' ? {
                    type: projection
                } : projection;
                (_map_setProjection = map.setProjection) === null || _map_setProjection === void 0 ? void 0 : _map_setProjection.call(map, currProps.projection);
            }
            if (sky && !(0, _deepEqualJs.deepEqual)(sky, currProps.sky)) {
                currProps.sky = sky;
                map.setSky(sky);
            }
            if (terrain !== undefined && !(0, _deepEqualJs.deepEqual)(terrain, currProps.terrain)) {
                if (!terrain || map.getSource(terrain.source)) {
                    currProps.terrain = terrain;
                    map.setTerrain(terrain);
                }
            }
        }
    }
    /* Update interaction handlers to match props */ _updateHandlers(nextProps, currProps) {
        const map = this._map;
        for (const propName of handlerNames){
            var _nextProps_propName;
            const newValue = (_nextProps_propName = nextProps[propName]) !== null && _nextProps_propName !== void 0 ? _nextProps_propName : true;
            var _currProps_propName;
            const oldValue = (_currProps_propName = currProps[propName]) !== null && _currProps_propName !== void 0 ? _currProps_propName : true;
            if (!(0, _deepEqualJs.deepEqual)(newValue, oldValue)) {
                if (newValue) map[propName].enable(newValue);
                else map[propName].disable();
            }
        }
    }
    _queryRenderedFeatures(point) {
        const map = this._map;
        const { interactiveLayerIds = [] } = this.props;
        try {
            return map.queryRenderedFeatures(point, {
                layers: interactiveLayerIds.filter(map.getLayer.bind(map))
            });
        } catch  {
            // May fail if style is not loaded
            return [];
        }
    }
    _updateHover(e) {
        const { props } = this;
        const shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            var _this__hoveredFeatures;
            const eventType = e.type;
            const wasHovering = ((_this__hoveredFeatures = this._hoveredFeatures) === null || _this__hoveredFeatures === void 0 ? void 0 : _this__hoveredFeatures.length) > 0;
            const features = this._queryRenderedFeatures(e.point);
            const isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        } else this._hoveredFeatures = null;
    }
    constructor(MapClass, props, container){
        // mapboxgl.Map instance
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._hoveredFeatures = null;
        this._propsedCameraUpdate = null;
        this._styleComponents = {};
        this._onEvent = (e)=>{
            // @ts-ignore
            const cb = this.props[otherEvents[e.type]];
            if (cb) cb(e);
            else if (e.type === 'error') console.error(e.error); // eslint-disable-line
        };
        this._onCameraEvent = (e)=>{
            if (this._internalUpdate) return;
            e.viewState = this._propsedCameraUpdate || (0, _transformJs.transformToViewState)(this._map.transform);
            // @ts-ignore
            const cb = this.props[cameraEvents[e.type]];
            if (cb) cb(e);
        };
        this._onCameraUpdate = (tr)=>{
            if (this._internalUpdate) return tr;
            this._propsedCameraUpdate = (0, _transformJs.transformToViewState)(tr);
            return (0, _transformJs.applyViewStateToTransform)(tr, this.props);
        };
        this._onPointerEvent = (e)=>{
            if (e.type === 'mousemove' || e.type === 'mouseout') this._updateHover(e);
            // @ts-ignore
            const cb = this.props[pointerEvents[e.type]];
            if (cb) {
                if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') e.features = this._hoveredFeatures || this._queryRenderedFeatures(e.point);
                cb(e);
                delete e.features;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
}
Maplibre.savedMaps = [];
exports.default = Maplibre;

},{"../utils/transform.js":"dIcRv","../utils/style-utils.js":"iNKYh","../utils/deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"dIcRv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */ parcelHelpers.export(exports, "transformToViewState", ()=>transformToViewState);
/* eslint-disable complexity */ /**
 * Applies requested view state to a transform
 * @returns an object containing detected changes
 */ parcelHelpers.export(exports, "applyViewStateToTransform", ()=>applyViewStateToTransform);
var _deepEqualJs = require("./deep-equal.js");
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
function applyViewStateToTransform(/** An object that describes Maplibre's camera state */ tr, /** Props from Map component */ props) {
    const v = props.viewState || props;
    const changes = {};
    if ('longitude' in v && 'latitude' in v && (v.longitude !== tr.center.lng || v.latitude !== tr.center.lat)) {
        const LngLat = tr.center.constructor;
        // @ts-expect-error we should not import LngLat class from maplibre-gl because we don't know the source of mapLib
        changes.center = new LngLat(v.longitude, v.latitude);
    }
    if ('zoom' in v && v.zoom !== tr.zoom) changes.zoom = v.zoom;
    if ('bearing' in v && v.bearing !== tr.bearing) changes.bearing = v.bearing;
    if ('pitch' in v && v.pitch !== tr.pitch) changes.pitch = v.pitch;
    if (v.padding && tr.padding && !(0, _deepEqualJs.deepEqual)(v.padding, tr.padding)) changes.padding = v.padding;
    return changes;
}

},{"./deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"evnkK":[function(require,module,exports,__globalThis) {
/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "arePointsEqual", ()=>arePointsEqual);
/* eslint-disable complexity */ /**
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */ parcelHelpers.export(exports, "deepEqual", ()=>deepEqual);
function arePointsEqual(a, b) {
    const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
function deepEqual(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for(let i = 0; i < a.length; i++){
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    } else if (Array.isArray(b)) return false;
    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys){
            if (!b.hasOwnProperty(key)) return false;
            if (!deepEqual(a[key], b[key])) return false;
        }
        return true;
    }
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"iNKYh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in older styles that would fail Mapbox's diffing
parcelHelpers.export(exports, "normalizeStyle", ()=>normalizeStyle);
const refProps = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout'
];
function normalizeStyle(style) {
    if (!style) return null;
    if (typeof style === 'string') return style;
    if ('toJS' in style) style = style.toJS();
    if (!style.layers) return style;
    const layerIndex = {};
    for (const layer of style.layers)layerIndex[layer.id] = layer;
    const layers = style.layers.map((layer)=>{
        let normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = Object.assign({}, layer);
            // Breaks style diffing :(
            // @ts-ignore legacy field not typed
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        // @ts-ignore legacy field not typed
        const layerRef = layerIndex[layer.ref];
        if (layerRef) {
            normalizedLayer = normalizedLayer || Object.assign({}, layer);
            // @ts-ignore
            delete normalizedLayer.ref;
            // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
            for (const propName of refProps)if (propName in layerRef) normalizedLayer[propName] = layerRef[propName];
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return {
        ...style,
        layers
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"2iZ2D":[function(require,module,exports,__globalThis) {
/** These methods may break the react binding if called directly */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>createRef);
const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance) {
    if (!mapInstance) return null;
    const map = mapInstance.map;
    const result = {
        getMap: ()=>map
    };
    for (const key of getMethodNames(map))// @ts-expect-error
    if (!(key in result) && !skipMethods.includes(key)) result[key] = map[key].bind(map);
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while(proto){
        for (const key of Object.getOwnPropertyNames(proto))if (key[0] !== '_' && typeof obj[key] === 'function' && key !== 'fire' && key !== 'setEventedParent') result.add(key);
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"3FDg4":[function(require,module,exports,__globalThis) {
// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _react = require("react");
const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? (0, _react.useLayoutEffect) : (0, _react.useEffect);
exports.default = useIsomorphicLayoutEffect;

},{"react":"gYgqf","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"lcOKm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>setGlobals);
function setGlobals(mapLib, props) {
    const { RTLTextPlugin, maxParallelImageRequests, workerCount, workerUrl } = props;
    if (RTLTextPlugin && mapLib.getRTLTextPluginStatus && mapLib.getRTLTextPluginStatus() === 'unavailable') {
        const { pluginUrl, lazy = true } = typeof RTLTextPlugin === 'string' ? {
            pluginUrl: RTLTextPlugin
        } : RTLTextPlugin;
        mapLib.setRTLTextPlugin(pluginUrl, (error)=>{
            if (error) // eslint-disable-next-line
            console.error(error);
        }, lazy);
    }
    if (maxParallelImageRequests !== undefined) mapLib.setMaxParallelImageRequests(maxParallelImageRequests);
    if (workerCount !== undefined) mapLib.setWorkerCount(workerCount);
    if (workerUrl !== undefined) mapLib.setWorkerUrl(workerUrl);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"8iWQn":[function(require,module,exports,__globalThis) {
module.exports = require("6d19a3f069e01e16")(require("f87c22ca0ca4450f").getBundleURL('3pMZx') + "maplibre-gl.0b883e30.js").catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root('5t9QD'));

},{"6d19a3f069e01e16":"5enKE","f87c22ca0ca4450f":"4fV6J","5t9QD":"5t9QD"}],"5enKE":[function(require,module,exports,__globalThis) {
"use strict";
var cacheLoader = require("ca2a84f7fa4a3bb0");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        var existingScripts = document.getElementsByTagName('script');
        if ([].concat(existingScripts).some(function(script) {
            return script.src === bundle;
        })) {
            resolve();
            return;
        }
        var preloadLink = document.createElement('link');
        preloadLink.href = bundle;
        preloadLink.rel = 'preload';
        preloadLink.as = 'script';
        document.head.appendChild(preloadLink);
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = bundle;
        script.onerror = function(e) {
            var error = new TypeError("Failed to fetch dynamically imported module: ".concat(bundle, ". Error: ").concat(e.message));
            script.onerror = script.onload = null;
            script.remove();
            reject(error);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    });
});

},{"ca2a84f7fa4a3bb0":"b770b"}],"b770b":[function(require,module,exports,__globalThis) {
"use strict";
var cachedBundles = {};
var cachedPreloads = {};
var cachedPrefetches = {};
function getCache(type) {
    switch(type){
        case 'preload':
            return cachedPreloads;
        case 'prefetch':
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"4fV6J":[function(require,module,exports,__globalThis) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"janHd":[function(require,module,exports,__globalThis) {
/* global document */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Marker", ()=>Marker);
var _react = require("react");
var _reactDom = require("react-dom");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _mapJs = require("./map.js");
var _deepEqualJs = require("../utils/deep-equal.js");
const Marker = (0, _react.memo)((0, _react.forwardRef)((props, ref)=>{
    const { map, mapLib } = (0, _react.useContext)((0, _mapJs.MapContext));
    const thisRef = (0, _react.useRef)({
        props
    });
    thisRef.current.props = props;
    const marker = (0, _react.useMemo)(()=>{
        let hasChildren = false;
        _react.Children.forEach(props.children, (el)=>{
            if (el) hasChildren = true;
        });
        const options = {
            ...props,
            element: hasChildren ? document.createElement('div') : null
        };
        const mk = new mapLib.Marker(options);
        mk.setLngLat([
            props.longitude,
            props.latitude
        ]);
        mk.getElement().addEventListener('click', (e)=>{
            var _thisRef_current_props_onClick, _thisRef_current_props;
            (_thisRef_current_props_onClick = (_thisRef_current_props = thisRef.current.props).onClick) === null || _thisRef_current_props_onClick === void 0 ? void 0 : _thisRef_current_props_onClick.call(_thisRef_current_props, {
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', (e)=>{
            var _thisRef_current_props_onDragStart, _thisRef_current_props;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_thisRef_current_props_onDragStart = (_thisRef_current_props = thisRef.current.props).onDragStart) === null || _thisRef_current_props_onDragStart === void 0 ? void 0 : _thisRef_current_props_onDragStart.call(_thisRef_current_props, evt);
        });
        mk.on('drag', (e)=>{
            var _thisRef_current_props_onDrag, _thisRef_current_props;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_thisRef_current_props_onDrag = (_thisRef_current_props = thisRef.current.props).onDrag) === null || _thisRef_current_props_onDrag === void 0 ? void 0 : _thisRef_current_props_onDrag.call(_thisRef_current_props, evt);
        });
        mk.on('dragend', (e)=>{
            var _thisRef_current_props_onDragEnd, _thisRef_current_props;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_thisRef_current_props_onDragEnd = (_thisRef_current_props = thisRef.current.props).onDragEnd) === null || _thisRef_current_props_onDragEnd === void 0 ? void 0 : _thisRef_current_props_onDragEnd.call(_thisRef_current_props, evt);
        });
        return mk;
    }, []);
    (0, _react.useEffect)(()=>{
        marker.addTo(map.getMap());
        return ()=>{
            marker.remove();
        };
    }, []);
    const { longitude, latitude, offset, style, draggable = false, popup = null, rotation = 0, rotationAlignment = 'auto', pitchAlignment = 'auto' } = props;
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(marker.getElement(), style);
    }, [
        style
    ]);
    (0, _react.useImperativeHandle)(ref, ()=>marker, []);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) marker.setLngLat([
        longitude,
        latitude
    ]);
    if (offset && !(0, _deepEqualJs.arePointsEqual)(marker.getOffset(), offset)) marker.setOffset(offset);
    if (marker.isDraggable() !== draggable) marker.setDraggable(draggable);
    if (marker.getRotation() !== rotation) marker.setRotation(rotation);
    if (marker.getRotationAlignment() !== rotationAlignment) marker.setRotationAlignment(rotationAlignment);
    if (marker.getPitchAlignment() !== pitchAlignment) marker.setPitchAlignment(pitchAlignment);
    if (marker.getPopup() !== popup) marker.setPopup(popup);
    return (0, _reactDom.createPortal)(props.children, marker.getElement());
}));

},{"react":"gYgqf","react-dom":"hbRJO","../utils/apply-react-style.js":"lfh7w","./map.js":"lyROP","../utils/deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"lfh7w":[function(require,module,exports,__globalThis) {
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "applyReactStyle", ()=>applyReactStyle);
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) return;
    const style = element.style;
    for(const key in styles){
        const value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) style[key] = `${value}px`;
        else style[key] = value;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"NcRWL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Popup", ()=>Popup);
var _reactDom = require("react-dom");
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _mapJs = require("./map.js");
var _deepEqualJs = require("../utils/deep-equal.js");
// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
const Popup = (0, _react.memo)((0, _react.forwardRef)((props, ref)=>{
    const { map, mapLib } = (0, _react.useContext)((0, _mapJs.MapContext));
    const container = (0, _react.useMemo)(()=>{
        return document.createElement('div');
    }, []);
    const thisRef = (0, _react.useRef)({
        props
    });
    thisRef.current.props = props;
    const popup = (0, _react.useMemo)(()=>{
        const options = {
            ...props
        };
        const pp = new mapLib.Popup(options);
        pp.setLngLat([
            props.longitude,
            props.latitude
        ]);
        pp.once('open', (e)=>{
            var _thisRef_current_props_onOpen, _thisRef_current_props;
            (_thisRef_current_props_onOpen = (_thisRef_current_props = thisRef.current.props).onOpen) === null || _thisRef_current_props_onOpen === void 0 ? void 0 : _thisRef_current_props_onOpen.call(_thisRef_current_props, e);
        });
        return pp;
    }, []);
    (0, _react.useEffect)(()=>{
        const onClose = (e)=>{
            var _thisRef_current_props_onClose, _thisRef_current_props;
            (_thisRef_current_props_onClose = (_thisRef_current_props = thisRef.current.props).onClose) === null || _thisRef_current_props_onClose === void 0 ? void 0 : _thisRef_current_props_onClose.call(_thisRef_current_props, e);
        };
        popup.on('close', onClose);
        popup.setDOMContent(container).addTo(map.getMap());
        return ()=>{
            // https://github.com/visgl/react-map-gl/issues/1825
            // onClose should not be fired if the popup is removed by unmounting
            // When using React strict mode, the component is mounted twice.
            // Firing the onClose callback here would be a false signal to remove the component.
            popup.off('close', onClose);
            if (popup.isOpen()) popup.remove();
        };
    }, []);
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(popup.getElement(), props.style);
    }, [
        props.style
    ]);
    (0, _react.useImperativeHandle)(ref, ()=>popup, []);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) popup.setLngLat([
            props.longitude,
            props.latitude
        ]);
        if (props.offset && !(0, _deepEqualJs.deepEqual)(popup.options.offset, props.offset)) popup.setOffset(props.offset);
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        if (popup.options.className !== props.className) {
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList)if (!nextClassList.has(c)) popup.removeClassName(c);
            for (const c of nextClassList)if (!prevClassList.has(c)) popup.addClassName(c);
            popup.options.className = props.className;
        }
    }
    return (0, _reactDom.createPortal)(props.children, container);
}));

},{"react-dom":"hbRJO","react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./map.js":"lyROP","../utils/deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"84TEX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AttributionControl", ()=>AttributionControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _AttributionControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.AttributionControl(props), {
        position: props.position
    });
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, props.style);
    }, [
        props.style
    ]);
    return null;
}
const AttributionControl = (0, _react.memo)(_AttributionControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"a1uj5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useControl", ()=>useControl);
var _react = require("react");
var _mapJs = require("./map.js");
function useControl(onCreate, arg1, arg2, arg3) {
    const context = (0, _react.useContext)((0, _mapJs.MapContext));
    const ctrl = (0, _react.useMemo)(()=>onCreate(context), []);
    (0, _react.useEffect)(()=>{
        const opts = arg3 || arg2 || arg1;
        const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
        const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
        const { map } = context;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, opts === null || opts === void 0 ? void 0 : opts.position);
            if (onAdd) onAdd(context);
        }
        return ()=>{
            if (onRemove) onRemove(context);
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) map.removeControl(ctrl);
        };
    }, []);
    return ctrl;
}

},{"react":"gYgqf","./map.js":"lyROP","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"3vkvH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FullscreenControl", ()=>FullscreenControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _FullscreenControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.FullscreenControl({
            container: props.containerId && document.getElementById(props.containerId)
        }), {
        position: props.position
    });
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._controlContainer, props.style);
    }, [
        props.style
    ]);
    return null;
}
const FullscreenControl = (0, _react.memo)(_FullscreenControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"k02iR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GeolocateControl", ()=>GeolocateControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _GeolocateControl(props, ref) {
    const thisRef = (0, _react.useRef)({
        props
    });
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>{
        const gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        const setupUI = gc._setupUI;
        gc._setupUI = ()=>{
            if (!gc._container.hasChildNodes()) setupUI();
        };
        gc.on('geolocate', (e)=>{
            var _thisRef_current_props_onGeolocate, _thisRef_current_props;
            (_thisRef_current_props_onGeolocate = (_thisRef_current_props = thisRef.current.props).onGeolocate) === null || _thisRef_current_props_onGeolocate === void 0 ? void 0 : _thisRef_current_props_onGeolocate.call(_thisRef_current_props, e);
        });
        gc.on('error', (e)=>{
            var _thisRef_current_props_onError, _thisRef_current_props;
            (_thisRef_current_props_onError = (_thisRef_current_props = thisRef.current.props).onError) === null || _thisRef_current_props_onError === void 0 ? void 0 : _thisRef_current_props_onError.call(_thisRef_current_props, e);
        });
        gc.on('outofmaxbounds', (e)=>{
            var _thisRef_current_props_onOutOfMaxBounds, _thisRef_current_props;
            (_thisRef_current_props_onOutOfMaxBounds = (_thisRef_current_props = thisRef.current.props).onOutOfMaxBounds) === null || _thisRef_current_props_onOutOfMaxBounds === void 0 ? void 0 : _thisRef_current_props_onOutOfMaxBounds.call(_thisRef_current_props, e);
        });
        gc.on('trackuserlocationstart', (e)=>{
            var _thisRef_current_props_onTrackUserLocationStart, _thisRef_current_props;
            (_thisRef_current_props_onTrackUserLocationStart = (_thisRef_current_props = thisRef.current.props).onTrackUserLocationStart) === null || _thisRef_current_props_onTrackUserLocationStart === void 0 ? void 0 : _thisRef_current_props_onTrackUserLocationStart.call(_thisRef_current_props, e);
        });
        gc.on('trackuserlocationend', (e)=>{
            var _thisRef_current_props_onTrackUserLocationEnd, _thisRef_current_props;
            (_thisRef_current_props_onTrackUserLocationEnd = (_thisRef_current_props = thisRef.current.props).onTrackUserLocationEnd) === null || _thisRef_current_props_onTrackUserLocationEnd === void 0 ? void 0 : _thisRef_current_props_onTrackUserLocationEnd.call(_thisRef_current_props, e);
        });
        return gc;
    }, {
        position: props.position
    });
    thisRef.current.props = props;
    (0, _react.useImperativeHandle)(ref, ()=>ctrl, []);
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, props.style);
    }, [
        props.style
    ]);
    return null;
}
const GeolocateControl = (0, _react.memo)((0, _react.forwardRef)(_GeolocateControl));

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"a6hqp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NavigationControl", ()=>NavigationControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _NavigationControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.NavigationControl(props), {
        position: props.position
    });
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, props.style);
    }, [
        props.style
    ]);
    return null;
}
const NavigationControl = (0, _react.memo)(_NavigationControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"2OV98":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ScaleControl", ()=>ScaleControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _ScaleControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.ScaleControl(props), {
        position: props.position
    });
    const propsRef = (0, _react.useRef)(props);
    const prevProps = propsRef.current;
    propsRef.current = props;
    const { style } = props;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) ctrl.options.maxWidth = props.maxWidth;
    if (props.unit !== undefined && props.unit !== prevProps.unit) ctrl.setUnit(props.unit);
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, style);
    }, [
        style
    ]);
    return null;
}
const ScaleControl = (0, _react.memo)(_ScaleControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"qvC21":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TerrainControl", ()=>TerrainControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _TerrainControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.TerrainControl(props), {
        position: props.position
    });
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, props.style);
    }, [
        props.style
    ]);
    return null;
}
const TerrainControl = (0, _react.memo)(_TerrainControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"2mu0k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LogoControl", ()=>LogoControl);
var _react = require("react");
var _applyReactStyleJs = require("../utils/apply-react-style.js");
var _useControlJs = require("./use-control.js");
function _LogoControl(props) {
    const ctrl = (0, _useControlJs.useControl)(({ mapLib })=>new mapLib.LogoControl(props), {
        position: props.position
    });
    (0, _react.useEffect)(()=>{
        (0, _applyReactStyleJs.applyReactStyle)(ctrl._container, props.style);
    }, [
        props.style
    ]);
    return null;
}
const LogoControl = (0, _react.memo)(_LogoControl);

},{"react":"gYgqf","../utils/apply-react-style.js":"lfh7w","./use-control.js":"a1uj5","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"7kh6X":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/* eslint-enable complexity */ parcelHelpers.export(exports, "Source", ()=>Source);
var _react = require("react");
var _mapJs = require("./map.js");
var _assertJs = require("../utils/assert.js");
var _assertJsDefault = parcelHelpers.interopDefault(_assertJs);
var _deepEqualJs = require("../utils/deep-equal.js");
let sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        const options = {
            ...props
        };
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */ function updateSource(source, props, prevProps) {
    (0, _assertJsDefault.default)(props.id === prevProps.id, 'source id changed');
    (0, _assertJsDefault.default)(props.type === prevProps.type, 'source type changed');
    let changedKey = '';
    let changedKeyCount = 0;
    for(const key in props)if (key !== 'children' && key !== 'id' && !(0, _deepEqualJs.deepEqual)(prevProps[key], props[key])) {
        changedKey = key;
        changedKeyCount++;
    }
    if (!changedKeyCount) return;
    const type = props.type;
    if (type === 'geojson') source.setData(props.data);
    else if (type === 'image') source.updateImage({
        url: props.url,
        coordinates: props.coordinates
    });
    else switch(changedKey){
        case 'coordinates':
            var // @ts-ignore
            _source_setCoordinates;
            (_source_setCoordinates = source.setCoordinates) === null || _source_setCoordinates === void 0 ? void 0 : _source_setCoordinates.call(source, props.coordinates);
            break;
        case 'url':
            var // @ts-ignore
            _source_setUrl;
            (_source_setUrl = source.setUrl) === null || _source_setUrl === void 0 ? void 0 : _source_setUrl.call(source, props.url);
            break;
        case 'tiles':
            var // @ts-ignore
            _source_setTiles;
            (_source_setTiles = source.setTiles) === null || _source_setTiles === void 0 ? void 0 : _source_setTiles.call(source, props.tiles);
            break;
        default:
            // eslint-disable-next-line
            console.warn(`Unable to update <Source> prop: ${changedKey}`);
    }
}
function Source(props) {
    const map = (0, _react.useContext)((0, _mapJs.MapContext)).map.getMap();
    const propsRef = (0, _react.useRef)(props);
    const [, setStyleLoaded] = (0, _react.useState)(0);
    const id = (0, _react.useMemo)(()=>props.id || `jsx-source-${sourceCounter++}`, []);
    (0, _react.useEffect)(()=>{
        if (map) {
            /* global setTimeout */ const forceUpdate = ()=>setTimeout(()=>setStyleLoaded((version)=>version + 1), 0);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return ()=>{
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getSource(id)) {
                    var _map_getStyle;
                    // Parent effects are destroyed before child ones, see
                    // https://github.com/facebook/react/issues/16728
                    // Source can only be removed after all child layers are removed
                    const allLayers = (_map_getStyle = map.getStyle()) === null || _map_getStyle === void 0 ? void 0 : _map_getStyle.layers;
                    if (allLayers) {
                        for (const layer of allLayers)// @ts-ignore (2339) source does not exist on all layer types
                        if (layer.source === id) map.removeLayer(layer.id);
                    }
                    map.removeSource(id);
                }
            };
        }
        return undefined;
    }, [
        map
    ]);
    // @ts-ignore
    let source = map && map.style && map.getSource(id);
    if (source) updateSource(source, props, propsRef.current);
    else source = createSource(map, id, props);
    propsRef.current = props;
    return source && _react.Children.map(props.children, (child)=>child && (0, _react.cloneElement)(child, {
            source: id
        })) || null;
}

},{"react":"gYgqf","./map.js":"lyROP","../utils/assert.js":"e1tly","../utils/deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"e1tly":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>assert);
function assert(condition, message) {
    if (!condition) throw new Error(message);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"1mRpX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Layer", ()=>Layer);
var _react = require("react");
var _mapJs = require("./map.js");
var _assertJs = require("../utils/assert.js");
var _assertJsDefault = parcelHelpers.interopDefault(_assertJs);
var _deepEqualJs = require("../utils/deep-equal.js");
/* eslint-disable complexity, max-statements */ function updateLayer(map, id, props, prevProps) {
    (0, _assertJsDefault.default)(props.id === prevProps.id, 'layer id changed');
    (0, _assertJsDefault.default)(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') return;
    // @ts-ignore filter does not exist in some Layer types
    const { layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) map.moveLayer(id, beforeId);
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for(const key in layout)if (!(0, _deepEqualJs.deepEqual)(layout[key], prevLayout[key])) map.setLayoutProperty(id, key, layout[key]);
        for(const key in prevLayout)if (!layout.hasOwnProperty(key)) map.setLayoutProperty(id, key, undefined);
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for(const key in paint)if (!(0, _deepEqualJs.deepEqual)(paint[key], prevPaint[key])) map.setPaintProperty(id, key, paint[key]);
        for(const key in prevPaint)if (!paint.hasOwnProperty(key)) map.setPaintProperty(id, key, undefined);
    }
    // @ts-ignore filter does not exist in some Layer types
    if (!(0, _deepEqualJs.deepEqual)(filter, prevProps.filter)) map.setFilter(id, filter);
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) map.setLayerZoomRange(id, minzoom, maxzoom);
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = {
            ...props,
            id
        };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */ let layerCounter = 0;
function Layer(props) {
    const map = (0, _react.useContext)((0, _mapJs.MapContext)).map.getMap();
    const propsRef = (0, _react.useRef)(props);
    const [, setStyleLoaded] = (0, _react.useState)(0);
    const id = (0, _react.useMemo)(()=>props.id || `jsx-layer-${layerCounter++}`, []);
    (0, _react.useEffect)(()=>{
        if (map) {
            const forceUpdate = ()=>setStyleLoaded((version)=>version + 1);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return ()=>{
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getLayer(id)) map.removeLayer(id);
            };
        }
        return undefined;
    }, [
        map
    ]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) try {
        updateLayer(map, id, props, propsRef.current);
    } catch (error) {
        console.warn(error); // eslint-disable-line
    }
    else createLayer(map, id, props);
    // Store last rendered props
    propsRef.current = props;
    return null;
}

},{"react":"gYgqf","./map.js":"lyROP","../utils/assert.js":"e1tly","../utils/deep-equal.js":"evnkK","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"fPPEH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"4APIN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"lTvQK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"g4ByD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"d2niv":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$4106 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$4106.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ThemeContext", ()=>ThemeContext);
parcelHelpers.export(exports, "default", ()=>BusTimesMap);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _client = require("react-dom/client");
// import { captureException } from "@sentry/react";
var _maplibre = require("react-map-gl/maplibre");
var _maplibreDefault = parcelHelpers.interopDefault(_maplibre);
var _historyArrowPng = require("data-url:../history-arrow.png");
var _historyArrowPngDefault = parcelHelpers.interopDefault(_historyArrowPng);
var _routeStopMarkerCirclePng = require("data-url:../route-stop-marker-circle.png");
var _routeStopMarkerCirclePngDefault = parcelHelpers.interopDefault(_routeStopMarkerCirclePng);
var _routeStopMarkerDarkCirclePng = require("data-url:../route-stop-marker-dark-circle.png");
var _routeStopMarkerDarkCirclePngDefault = parcelHelpers.interopDefault(_routeStopMarkerDarkCirclePng);
var _routeStopMarkerDarkPng = require("data-url:../route-stop-marker-dark.png");
var _routeStopMarkerDarkPngDefault = parcelHelpers.interopDefault(_routeStopMarkerDarkPng);
var _routeStopMarkerPng = require("data-url:../route-stop-marker.png");
var _routeStopMarkerPngDefault = parcelHelpers.interopDefault(_routeStopMarkerPng);
var _stopMarkerCirclePng = require("data-url:../stop-marker-circle.png");
var _stopMarkerCirclePngDefault = parcelHelpers.interopDefault(_stopMarkerCirclePng);
var _stopMarkerPng = require("data-url:../stop-marker.png");
var _stopMarkerPngDefault = parcelHelpers.interopDefault(_stopMarkerPng);
var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();
const imagesByName = {
    "stop-marker": (0, _stopMarkerPngDefault.default),
    "stop-marker-circle": (0, _stopMarkerCirclePngDefault.default),
    "route-stop-marker": (0, _routeStopMarkerPngDefault.default),
    "route-stop-marker-circle": (0, _routeStopMarkerCirclePngDefault.default),
    "route-stop-marker-dark": (0, _routeStopMarkerDarkPngDefault.default),
    "route-stop-marker-dark-circle": (0, _routeStopMarkerDarkCirclePngDefault.default),
    arrow: (0, _historyArrowPngDefault.default)
};
const mapStyles = {
    alidade_smooth: "Light",
    alidade_smooth_dark: "Dark",
    alidade_36_dark: "36",
    alidade_satellite: "Satellite",
    osm_bright: "Bright"
};
class StyleSwitcher {
    onAdd() {
        this._container = document.createElement("div");
        const root = (0, _client.createRoot)(this._container);
        root.render(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("details", {
            className: "maplibregl-ctrl maplibregl-ctrl-group map-style-switcher",
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("summary", {
                    children: "Map style"
                }, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                Object.entries(mapStyles).map(([key, value])=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                type: "radio",
                                value: key,
                                name: "map-style",
                                defaultChecked: key === this.style,
                                onChange: this.handleChange
                            }, void 0, false, {
                                fileName: "frontend/js/Map.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            value
                        ]
                    }, key, true, {
                        fileName: "frontend/js/Map.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "frontend/js/Map.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this));
        return this._container;
    }
    onRemove() {
        var _this__container_parentNode, _this__container;
        (_this__container = this._container) === null || _this__container === void 0 ? void 0 : (_this__container_parentNode = _this__container.parentNode) === null || _this__container_parentNode === void 0 ? void 0 : _this__container_parentNode.removeChild(this._container);
    }
    constructor(props){
        this.style = props.style;
        this.handleChange = props.onChange;
    }
}
const StyleSwitcherControl = /*#__PURE__*/ (0, _react.memo)(_s(function StyleSwitcherControl(props) {
    _s();
    (0, _maplibre.useControl)(()=>new StyleSwitcher(props));
    return null;
}, "7GmvtzRI6MWJXafv4/vDlacgS1Y=", false, function() {
    return [
        (0, _maplibre.useControl)
    ];
}));
_c = StyleSwitcherControl;
const ThemeContext = /*#__PURE__*/ (0, _react.createContext)("");
function MapChild({ onInit }) {
    _s1();
    const { current: map } = (0, _maplibre.useMap)();
    (0, _react.useEffect)(()=>{
        if (map) {
            const _map = map.getMap();
            _map.keyboard.disableRotation();
            _map.touchZoomRotate.disableRotation();
            if (onInit) onInit(_map);
            const onStyleImageMissing = (e)=>{
                if (e.id in imagesByName) {
                    const image = new Image();
                    image.src = imagesByName[e.id];
                    image.onload = ()=>{
                        if (!map.hasImage(e.id)) map.addImage(e.id, image, {
                            pixelRatio: 2
                        });
                    };
                }
            };
            map.on("styleimagemissing", onStyleImageMissing);
            return ()=>{
                map.off("styleimagemissing", onStyleImageMissing);
            };
        }
    });
    return null;
}
_s1(MapChild, "IU9o0dWRMAmFeK0fET+YEfSwXV8=", false, function() {
    return [
        (0, _maplibre.useMap)
    ];
});
_c1 = MapChild;
function BusTimesMap(props) {
    _s2();
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [mapStyle, setMapStyle] = (0, _reactDefault.default).useState(()=>{
        try {
            const style = localStorage.getItem("map-style");
            if (style && style in mapStyles) return style;
        } catch  {
        // ignore
        }
        return darkModeQuery.matches ? "alidade_smooth_dark" : "alidade_smooth";
    });
    (0, _react.useEffect)(()=>{
        const handleChange = (e)=>{
            setMapStyle(e.matches ? "alidade_smooth_dark" : "alidade_smooth");
        };
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener("change", handleChange);
            return ()=>{
                darkModeQuery.removeEventListener("change", handleChange);
            };
        }
    }, [
        darkModeQuery
    ]);
    const handleMapStyleChange = (0, _reactDefault.default).useCallback((e)=>{
        const style = e.target.value;
        const defaultStyle = darkModeQuery.matches ? "alidade_smooth_dark" : "alidade_smooth";
        setMapStyle(style);
        try {
            if (style === defaultStyle) localStorage.removeItem("map-style");
            else localStorage.setItem("map-style", style);
        } catch  {
        // ignore
        }
    }, [
        darkModeQuery.matches
    ]);
    const [contextMenu, setContextMenu] = (0, _reactDefault.default).useState();
    const onContextMenu = (e)=>{
        if ("lngLat" in e) setContextMenu(e.lngLat);
        else setContextMenu(undefined);
    };
    (0, _react.useEffect)(()=>{
        document.body.classList.toggle("harrogate-mode", mapStyle.endsWith("_36_dark"));
        document.body.classList.toggle("dark-mode", mapStyle.endsWith("_dark"));
        document.body.classList.toggle("harrogate-mode", mapStyle.endsWith("_36_dark"));
    }, [
        mapStyle
    ]);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(ThemeContext.Provider, {
        value: mapStyle,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibreDefault.default), {
            ...props,
            reuseMaps: true,
            touchPitch: false,
            pitchWithRotate: false,
            dragRotate: false,
            minZoom: 2,
            maxZoom: 18,
            mapStyle: `https://tiles.stadiamaps.com/styles/${mapStyle}.json`,
            RTLTextPlugin: "",
            attributionControl: false,
            // onError={(e) => captureException(e.error)}
            onContextMenu: onContextMenu,
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.NavigationControl), {
                    showCompass: false
                }, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.GeolocateControl), {
                    trackUserLocation: true
                }, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(StyleSwitcherControl, {
                    style: mapStyle,
                    onChange: handleMapStyleChange
                }, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.AttributionControl), {}, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(MapChild, {
                    onInit: props.onMapInit
                }, void 0, false, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this),
                props.children,
                contextMenu ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Popup), {
                    longitude: contextMenu.lng,
                    latitude: contextMenu.lat,
                    onClose: onContextMenu,
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                            href: `https://www.openstreetmap.org/#map=15/${contextMenu.lat}/${contextMenu.lng}`,
                            rel: "noopener noreferrer",
                            children: "OpenStreetMap"
                        }, void 0, false, {
                            fileName: "frontend/js/Map.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                            href: `https://www.google.com/maps/search/?api=1&query=${contextMenu.lat},${contextMenu.lng}`,
                            rel: "noopener noreferrer",
                            children: "Google Maps"
                        }, void 0, false, {
                            fileName: "frontend/js/Map.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "frontend/js/Map.tsx",
                    lineNumber: 237,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "frontend/js/Map.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/Map.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
_s2(BusTimesMap, "M1Ck5GOVrCEHqTupR5teB1XQ9/U=");
_c2 = BusTimesMap;
var _c, _c1, _c2;
$RefreshReg$(_c, "StyleSwitcherControl");
$RefreshReg$(_c1, "MapChild");
$RefreshReg$(_c2, "BusTimesMap");

  $parcel$ReactRefreshHelpers$4106.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-dom/client":"cqsDI","react-map-gl/maplibre":"g334S","data-url:../history-arrow.png":"17Iul","data-url:../route-stop-marker-circle.png":"imx78","data-url:../route-stop-marker-dark-circle.png":"2yyka","data-url:../route-stop-marker-dark.png":"8cwzB","data-url:../route-stop-marker.png":"fPFST","data-url:../stop-marker-circle.png":"lJWNx","data-url:../stop-marker.png":"7Nopu","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"17Iul":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAALElEQVQoz%2B3KoREAMAzDQO2%2FtEJ6pTZPJPpg%2FGVLxVwN9UNiB%2FdAekgNIcMBTq7FO6ysKMMAAAAASUVORK5CYII%3D";

},{}],"imx78":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAA%2BElEQVR42pVTMRZDQBBVpM5N5BBxEnkyU4SGC1CpFYo4jgNQCbq4QTRSeM%2BGx1prCf403s4378%2BfGYmHfQIZVfTBu9%2B0i32S1mCcMYAKyCQqDIzzAhUVKNq0GAUqc6rD0mKgw1XlkqUVmxGUHF0ZtTIBjyxNGtKhIWnyyJiYQTsG9MkN65pMUNduONYOerMqWpVRGX2sXrVGahf6b5oQEe3rKEWW7jfaVkOW0BDaKqoSeP2nGZEVWPFA9g%2BRmYzPtoxJg%2Flrq8HOuu8%2F6%2FScWXdgKBvj1vPpuFcXyYr5RdKuu1cU7L3L%2F9auO88KnsJZiQfbhgry%2FGB%2FYbk7Qn%2BieIQAAAAASUVORK5CYII%3D";

},{}],"2yyka":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAtklEQVR42pWTrQ3GIBCG67oLC%2BDxuBrmQHcKVsCwQOeo4DCYjlF3H%2FnKT0tAHG9CCHlCHuBu6Qcwr0CDTjNb5uNYExQDtkAEfawDFDhcDWuBC3iPbuEOOMkN2%2BfUhp7o0KQ4PN84r65NwKJEkSPRvmSyO%2BiytaPosjdcP3Asp4pBbIHj%2F12LqxzCsroDW7x6lg7FJC7DXlVjM4VNtSbBJA3SBQlPR%2FoU0ncTColQorTip7cVqWF%2FEjVLG%2BSDKzcAAAAASUVORK5CYII%3D";

},{}],"8cwzB":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAA2ElEQVR42o2TsQ2DMBBF6ZglLEAbZQCqNDCGXSdigHSewYXLNMyBBJ%2FGDWPQXUCWY8sWNv81h%2FWK43wupjt6xPC5RVWEQb%2FQGdBgQ5mVHVhR52XHhmcgf%2BnjIUjR6Ou1L%2B%2FCI6Ah6TUzlIEc83Y6i%2BQYaWV9QW7%2BvaOK5Bhl5e6CLKzMC3BTiktyZ0qVbWNuC1SmHKnJ%2FOB0O%2BahzYfMje4ImB38K30pR4YSqz2S1JxftwnqZbPHIykSJ4tk9afRkyvqghpravldbO8MOvGs4qBCB77TxQ%2F2By4KcudBWjRoAAAAAElFTkSuQmCC";

},{}],"fPFST":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAABA0lEQVR42o2TMQ6CMBSGOzBzEzyEXMMFg%2B%2BZKIscwDo5OzjIcUxcZVJgE08gCw4kVBJo8VG1%2Fv8C6deX%2F%2FW1DCdw%2BODdbOqPuMWomgXx1SVGgW2AiXN0CWwybgbw%2FL4%2B9V6doSC4S%2BD1SRDVIrks0j5MYFNYU1VtjxLHSIN1XFUvuWWARRNGRXGMcC1kq%2BhpsK4w7uA9g137uTr%2FAc%2BmXaJHbY7hj2QD2dXYILfg2f4s0qrSj26ZvR0dYxjJvdsjwbWhNApsyEHI6smlVuNeZmTcrdAlt6wI4zCmF8kfs164AfHDnFGhq8JQ32RVosDGCEoClnBQWXVxCxz0cN%2FYA2f4YF%2Fr9GB6ifRHngAAAABJRU5ErkJggg%3D%3D";

},{}],"lJWNx":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J%2FAAAB00lEQVR42qWVsU7bUBSGT6YUijJVDOlEVlh4hNYsdCELrJV4gLxDpHSAude%2Bt7vJS1goiQdERpRONFJdqamChFVE5BBL0ddaahVBgkns%2F5%2FPf3Xuvec7skgU2UfT5pqIO8455YgKBVlGlDHcs0ghDqX04jUaRAAPPf%2Bs5lhqU2%2Fbde03bzvTIQABVtrZXYCht2eLmXdVja8AUGzIvNhlAHFwrMQ856JpuUyAPrtPyzfow%2Biy4ohJ94F66AEDyo8DVNL3uhbzstf16BLosjYrt4DJgRKznCtOHACN%2F%2BUlAmi5Ypb3sQKif23gwPiqaGQlDz3AiAgFQqgqMat5zwbuKQoVmA7FrO7kNdgXjuC2kyXAPwO0cAp%2BM0tAzQHawjnUdZYASwHXwh1s21kCNjUQCRG8cfIEfIN3Kk8LHag5eS5Rg%2B%2FmecYPMO7l%2BUivGIGV%2FSuL8AV%2BeZJ1mER4SwQf7czjLMIniIOKswJQfgANmeGcbkLEzEhL2mCQUPFlrFXV5Cvwk%2FI81vtA3HKLKVhvu8QzrM%2BjXUGCt6pKXSyfeS3PCYsAYHoT%2BhfNut6xd%2By6vmiG%2FvQGgO%2B8l3RRwiHMtFxnosAWh5zg8fuvPU44ZGvxev8DxBIggNwqL4cAAAAASUVORK5CYII%3D";

},{}],"7Nopu":[function(require,module,exports,__globalThis) {
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J%2FAAABdElEQVR42qWVPUtCURiAT0sfJk616GRjuPgT0pYaxMXW6Af4IxIbbO7ce203%2F4Qkagg6ik0lZJChkBTGzQ%2Fk6SKEIH7kOc%2BzP3DvOed9Bav44p5rzjhgQ8yD%2F9PFxDM3INKLPTQurYfsR3HcBqBJeM3A1Ki0awBI3CoBx810PsMAaBBUCUyMyH4daOFVCzi6rF4FqLKjFnD0m6MmkFQNOF5IwMarGnBs54C0RuDYAHpsqQYcJ6dxohEo3QGWRiBuAgWNQEgCTxqBfQuwBTbsmTqBZziSOp9QhLip8xMtKGZ0jvEUfuo6F2mbbwhJ5assBLfwnlN9TA74sOHcUHvOE7iCUdNvrjFQXoGk%2BIMdqtCruKw1R9oUfLSgX4%2FI1cN98Ai84Z3dD0EawDCf2Vwy1gsZhtOxPgNuJIBdi8qli%2BWGXbEIwjQBxp1uqZxNWAEjYCSscrZbGncAeCEkloMHk%2B7S5boaNvATI0WOT8ccKWL456%2F3X835RQAFXdyWAAAAAElFTkSuQmCC";

},{}],"3ANPd":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$bad3 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$bad3.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>StopPopup);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibre = require("react-map-gl/maplibre");
function StopPopup({ item, onClose }) {
    let name;
    if (item.properties.url) name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
        href: item.properties.url,
        className: "link-with-smalls",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "description",
                children: item.properties.name
            }, void 0, false, {
                fileName: "frontend/js/StopPopup.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            item.properties.services ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "smalls",
                children: item.properties.services.join("\u00A0 ")
            }, void 0, false, {
                fileName: "frontend/js/StopPopup.tsx",
                lineNumber: 30,
                columnNumber: 11
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "frontend/js/StopPopup.tsx",
        lineNumber: 27,
        columnNumber: 7
    }, this);
    else name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        children: item.properties.name
    }, void 0, false, {
        fileName: "frontend/js/StopPopup.tsx",
        lineNumber: 37,
        columnNumber: 12
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Popup), {
        offset: 2,
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
        closeOnClick: false,
        onClose: onClose,
        focusAfterOpen: false,
        children: name
    }, void 0, false, {
        fileName: "frontend/js/StopPopup.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = StopPopup;
var _c;
$RefreshReg$(_c, "StopPopup");

  $parcel$ReactRefreshHelpers$bad3.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-map-gl/maplibre":"g334S","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"80cMB":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$d99c = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$d99c.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getClickedVehicleMarkerId", ()=>getClickedVehicleMarkerId);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibre = require("react-map-gl/maplibre");
function getClickedVehicleMarkerId(e) {
    // handle click on VehicleMarker element
    const target = e.originalEvent.target;
    if (target instanceof HTMLElement || target instanceof SVGElement) {
        let vehicleId = target.dataset.vehicleId;
        if (!vehicleId && target.parentElement) vehicleId = target.parentElement.dataset.vehicleId;
        if (!vehicleId && (target.firstChild instanceof HTMLElement || target.firstChild instanceof SVGElement)) vehicleId = target.firstChild.dataset.vehicleId;
        if (vehicleId) return Number.parseInt(vehicleId, 10);
    }
}
function VehicleMarker({ vehicle, selected }) {
    var _vehicle_vehicle, _vehicle_vehicle1, _vehicle_vehicle2, _vehicle_service;
    let className = "vehicle-marker";
    let rotation = vehicle.heading;
    let background = "";
    if ((_vehicle_vehicle = vehicle.vehicle) === null || _vehicle_vehicle === void 0 ? void 0 : _vehicle_vehicle.css) background = vehicle.vehicle.css;
    if (rotation != null) {
        if (rotation < 180) {
            var _vehicle_vehicle3;
            rotation -= 90;
            className += " right";
            if ((_vehicle_vehicle3 = vehicle.vehicle) === null || _vehicle_vehicle3 === void 0 ? void 0 : _vehicle_vehicle3.right_css) background = vehicle.vehicle.right_css;
        } else rotation -= 270;
    }
    const liveryId = (_vehicle_vehicle1 = vehicle.vehicle) === null || _vehicle_vehicle1 === void 0 ? void 0 : _vehicle_vehicle1.livery;
    if (liveryId) className += ` livery-${liveryId}`;
    else if (background && ((_vehicle_vehicle2 = vehicle.vehicle) === null || _vehicle_vehicle2 === void 0 ? void 0 : _vehicle_vehicle2.text_colour)) className += " white-text";
    if (selected) className += " selected";
    let marker = ((_vehicle_service = vehicle.service) === null || _vehicle_service === void 0 ? void 0 : _vehicle_service.line_name) || "";
    if (liveryId && liveryId !== 262 && liveryId !== 1502) // not London or Bee Network
    marker = // biome-ignore lint/a11y/noSvgWithoutTitle: not sure what the best title would be
    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("svg", {
        width: "24",
        height: "16",
        "data-vehicle-id": vehicle.id,
        className: className,
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("text", {
            x: "12",
            y: "12",
            children: marker
        }, void 0, false, {
            fileName: "frontend/js/VehicleMarker.tsx",
            lineNumber: 115,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "frontend/js/VehicleMarker.tsx",
        lineNumber: 109,
        columnNumber: 7
    }, this);
    else marker = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        "data-vehicle-id": vehicle.id,
        className: className,
        style: background ? {
            background: background
        } : undefined,
        children: marker
    }, void 0, false, {
        fileName: "frontend/js/VehicleMarker.tsx",
        lineNumber: 122,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Marker), {
        latitude: vehicle.coordinates[1],
        longitude: vehicle.coordinates[0],
        rotation: rotation,
        style: {
            zIndex: selected ? 1 : 0
        },
        "data-vehicle-id": vehicle.id,
        children: [
            marker,
            rotation == null ? null : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "arrow",
                "data-vehicle-id": vehicle.id
            }, void 0, false, {
                fileName: "frontend/js/VehicleMarker.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/VehicleMarker.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c = VehicleMarker;
function propsAreEqual(prev, props) {
    return prev.selected === props.selected && prev.vehicle.datetime === props.vehicle.datetime;
}
exports.default = /*#__PURE__*/ _c1 = (0, _react.memo)(VehicleMarker, propsAreEqual);
var _c, _c1;
$RefreshReg$(_c, "VehicleMarker");
$RefreshReg$(_c1, "%default%");

  $parcel$ReactRefreshHelpers$d99c.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-map-gl/maplibre":"g334S","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"dcM9Y":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$ff95 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
var prevRefreshReg = window.$RefreshReg$;
var prevRefreshSig = window.$RefreshSig$;
$parcel$ReactRefreshHelpers$ff95.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Delay", ()=>Delay);
parcelHelpers.export(exports, "default", ()=>VehiclePopup);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _maplibre = require("react-map-gl/maplibre");
var _reactTimeago = require("react-timeago");
var _reactTimeagoDefault = parcelHelpers.interopDefault(_reactTimeago);
var _wouter = require("wouter");
function getTimeDelta(seconds) {
    const minutes = Math.round(seconds / 60);
    if (minutes === 1) return "1 minute";
    return `${minutes} minutes`;
}
function Delay({ item }) {
    const delay = item.delay;
    if (typeof delay !== "undefined") {
        let delayString;
        const abs = Math.abs(delay);
        if (abs < 45) delayString = "On time";
        else {
            if (delay < 0) delayString = "early";
            else delayString = "late";
            delayString = `${getTimeDelta(abs)} ${delayString}`;
        }
        return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            children: delayString
        }, void 0, false, {
            fileName: "frontend/js/VehiclePopup.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, this);
    }
}
_c = Delay;
function VehiclePopup({ item, onClose, snazzyTripLink = false, activeLink = false }) {
    var _item_service, _item_service1, _item_vehicle, _item_vehicle1, _item_vehicle2;
    let line_name = ((_item_service = item.service) === null || _item_service === void 0 ? void 0 : _item_service.line_name) || "";
    if (item.destination) {
        if (line_name) line_name += " to ";
        line_name += item.destination;
    }
    if (item.trip_id) {
        if (!activeLink) {
            if (snazzyTripLink) line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Link), {
                href: `/trips/${item.trip_id}`,
                children: line_name
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 65,
                columnNumber: 21
            }, this);
            else line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                href: `/trips/${item.trip_id}`,
                children: line_name
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 67,
                columnNumber: 21
            }, this);
        }
    } else if (item.journey_id) {
        if (!activeLink) {
            if (snazzyTripLink) line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _wouter.Link), {
                href: `/journeys/${item.journey_id}`,
                children: line_name
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 74,
                columnNumber: 11
            }, this);
            else line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                href: `/journeys/${item.journey_id}`,
                children: line_name
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 77,
                columnNumber: 21
            }, this);
        }
    } else if (item.tfl_code) // if (!activeLink && snazzyTripLink) {
    //   line_name = <Link href={`/vehicles/tfl/${item.tfl_code}`}>{line_name}</Link>;
    // }
    line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
        href: `/vehicles/tfl/${item.tfl_code}`,
        children: line_name
    }, void 0, false, {
        fileName: "frontend/js/VehiclePopup.tsx",
        lineNumber: 84,
        columnNumber: 17
    }, this);
    else if ((_item_service1 = item.service) === null || _item_service1 === void 0 ? void 0 : _item_service1.url) {
        if (item.service.url !== window.location.pathname) line_name = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
            href: item.service.url,
            children: line_name
        }, void 0, false, {
            fileName: "frontend/js/VehiclePopup.tsx",
            lineNumber: 87,
            columnNumber: 19
        }, this);
    }
    let vehicle = (_item_vehicle = item.vehicle) === null || _item_vehicle === void 0 ? void 0 : _item_vehicle.name;
    if ((_item_vehicle1 = item.vehicle) === null || _item_vehicle1 === void 0 ? void 0 : _item_vehicle1.url) vehicle = /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
        href: `${item.vehicle.url}`,
        children: vehicle
    }, void 0, false, {
        fileName: "frontend/js/VehiclePopup.tsx",
        lineNumber: 93,
        columnNumber: 15
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _maplibre.Popup), {
        offset: 8,
        latitude: item.coordinates[1],
        longitude: item.coordinates[0],
        closeOnClick: false,
        onClose: onClose,
        focusAfterOpen: false,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                children: line_name
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            vehicle,
            ((_item_vehicle2 = item.vehicle) === null || _item_vehicle2 === void 0 ? void 0 : _item_vehicle2.features) && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                children: item.vehicle.features.replace("<br>", ", ")
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this),
            item.seats && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("svg", {
                        role: "img",
                        width: "14",
                        height: "14",
                        viewBox: "0 0 118 177",
                        xmlns: "http://www.w3.org/2000/svg",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: "1.5",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("title", {
                                children: "Seats"
                            }, void 0, false, {
                                fileName: "frontend/js/VehiclePopup.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("path", {
                                d: "M108 9l-19 99-80-1 48 1v59",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "18"
                            }, void 0, false, {
                                fileName: "frontend/js/VehiclePopup.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "frontend/js/VehiclePopup.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    " ",
                    item.seats
                ]
            }, void 0, true, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            item.wheelchair && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("svg", {
                        role: "img",
                        width: "14",
                        height: "14",
                        viewBox: "0 0 506 647",
                        xmlns: "http://www.w3.org/2000/svg",
                        strokeLinejoin: "round",
                        strokeMiterlimit: "2",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("title", {
                                children: "Wheelchair space"
                            }, void 0, false, {
                                fileName: "frontend/js/VehiclePopup.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("path", {
                                fill: "currentColor",
                                d: "M494.28 293.25a38.5 38.5 0 00-29.66-11.55l-133.98 7.46 73.74-83.97a45.03 45.03 0 009.44-42.16 38.26 38.26 0 00-17.14-24.32c-.28-.2-176.25-102.43-176.25-102.43a38.42 38.42 0 00-44.87 4.56L89.6 117.5a38.43 38.43 0 1051.16 57.35l65.17-58.13 53.87 31.29-95.1 108.3a195.94 195.94 0 00-102.76 50.8l49.66 49.66a125.86 125.86 0 0184.92-32.87c69.66 0 126.34 56.68 126.34 126.35 0 32.66-12.46 62.47-32.87 84.92l49.66 49.65a195.76 195.76 0 0053.38-134.57c0-31.04-7.2-60.39-20.01-86.48l51.86-2.9-12.62 154.76a38.43 38.43 0 0076.6 6.24l16.2-198.68a38.42 38.42 0 00-10.78-29.95zM423.1 128.65A64.32 64.32 0 10423.1 0a64.32 64.32 0 000 128.65zM196.52 576.6c-69.67 0-126.35-56.67-126.35-126.34 0-26.26 8.06-50.66 21.82-70.89l-50.2-50.2A195.62 195.62 0 000 450.27c0 108.53 87.98 196.51 196.52 196.51 45.69 0 87.7-15.63 121.08-41.79l-50.2-50.19a125.64 125.64 0 01-70.88 21.82z"
                            }, void 0, false, {
                                fileName: "frontend/js/VehiclePopup.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "frontend/js/VehiclePopup.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    " ",
                    item.wheelchair
                ]
            }, void 0, true, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Delay, {
                item: item
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactTimeagoDefault.default), {
                    date: item.datetime
                }, item.datetime, false, {
                    fileName: "frontend/js/VehiclePopup.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "frontend/js/VehiclePopup.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "frontend/js/VehiclePopup.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c1 = VehiclePopup;
var _c, _c1;
$RefreshReg$(_c, "Delay");
$RefreshReg$(_c1, "VehiclePopup");

  $parcel$ReactRefreshHelpers$ff95.postlude(module);
} finally {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"1lwMp","react":"gYgqf","react-map-gl/maplibre":"g334S","react-timeago":"1qx1M","wouter":"4hYSv","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"kUjAa"}],"1qx1M":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>TimeAgo);
var _react = require("react");
var _dateParser = require("./dateParser");
var _dateParserDefault = parcelHelpers.interopDefault(_dateParser);
var _defaultFormatter = require("./defaultFormatter");
var _defaultFormatterDefault = parcelHelpers.interopDefault(_defaultFormatter);
function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
// Just some simple constants for readability
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const defaultNow = ()=>Date.now();
function TimeAgo({ date, formatter = (0, _defaultFormatterDefault.default), component = 'time', live = true, minPeriod = 0, maxPeriod = WEEK, title, now = defaultNow, ...passDownProps }) {
    const [timeNow, setTimeNow] = (0, _react.useState)(now());
    (0, _react.useEffect)(()=>{
        if (!live) return;
        const tick = ()=>{
            const then = (0, _dateParserDefault.default)(date).valueOf();
            if (!then) {
                console.warn('[react-timeago] Invalid Date provided');
                return 0;
            }
            const seconds = Math.round(Math.abs(timeNow - then) / 1000);
            const unboundPeriod = seconds < MINUTE ? 1000 : seconds < HOUR ? 1000 * MINUTE : seconds < DAY ? 1000 * HOUR : 1000 * WEEK;
            const period = Math.min(Math.max(unboundPeriod, minPeriod * 1000), maxPeriod * 1000);
            if (period) return setTimeout(()=>{
                setTimeNow(now());
            }, period);
            return 0;
        };
        const timeoutId = tick();
        return ()=>{
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [
        date,
        live,
        maxPeriod,
        minPeriod,
        now,
        timeNow
    ]);
    const Komponent = component;
    const then = (0, _dateParserDefault.default)(date).valueOf();
    if (!then) return null;
    const seconds = Math.round(Math.abs(timeNow - then) / 1000);
    const suffix = then < timeNow ? 'ago' : 'from now';
    const [value, unit] = seconds < MINUTE ? [
        Math.round(seconds),
        'second'
    ] : seconds < HOUR ? [
        Math.round(seconds / MINUTE),
        'minute'
    ] : seconds < DAY ? [
        Math.round(seconds / HOUR),
        'hour'
    ] : seconds < WEEK ? [
        Math.round(seconds / DAY),
        'day'
    ] : seconds < MONTH ? [
        Math.round(seconds / WEEK),
        'week'
    ] : seconds < YEAR ? [
        Math.round(seconds / MONTH),
        'month'
    ] : [
        Math.round(seconds / YEAR),
        'year'
    ];
    const passDownTitle = typeof title === 'undefined' ? typeof date === 'string' ? date : (0, _dateParserDefault.default)(date).toISOString().substr(0, 16).replace('T', ' ') : title;
    const spreadProps = Komponent === 'time' ? {
        ...passDownProps,
        dateTime: (0, _dateParserDefault.default)(date).toISOString()
    } : passDownProps;
    const nextFormatter = (0, _defaultFormatterDefault.default).bind(null, value, unit, suffix);
    return /*#__PURE__*/ _react.createElement(Komponent, _extends({}, spreadProps, {
        title: passDownTitle
    }), formatter(value, unit, suffix, then, nextFormatter, now));
}

},{"react":"gYgqf","./dateParser":"8nZCi","./defaultFormatter":"gd7x4","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"8nZCi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>dateParser);
function dateParser(date) {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.valueOf())) return parsed;
    const parts = String(date).match(/\d+/g);
    if (parts == null || parts.length <= 2) return parsed;
    else {
        const [firstP, secondP, ...restPs] = parts.map((x)=>parseInt(x));
        const correctedParts = [
            firstP,
            secondP - 1,
            ...restPs
        ];
        const isoDate = new Date(Date.UTC(...correctedParts));
        return isoDate;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"gd7x4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>defaultFormatter);
function defaultFormatter(value, _unit, suffix) {
    const unit = value !== 1 ? _unit + 's' : _unit;
    return value + ' ' + unit + ' ' + suffix;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"4hYSv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Link", ()=>Link);
parcelHelpers.export(exports, "Redirect", ()=>Redirect);
parcelHelpers.export(exports, "Route", ()=>Route);
parcelHelpers.export(exports, "Router", ()=>Router);
parcelHelpers.export(exports, "Switch", ()=>Switch);
parcelHelpers.export(exports, "matchRoute", ()=>matchRoute);
parcelHelpers.export(exports, "useLocation", ()=>useLocation);
parcelHelpers.export(exports, "useParams", ()=>useParams);
parcelHelpers.export(exports, "useRoute", ()=>useRoute);
parcelHelpers.export(exports, "useRouter", ()=>useRouter);
parcelHelpers.export(exports, "useSearch", ()=>useSearch);
parcelHelpers.export(exports, "useSearchParams", ()=>useSearchParams);
var _regexparam = require("regexparam");
var _useBrowserLocationJs = require("./use-browser-location.js");
var _reactDepsJs = require("./react-deps.js");
/*
 * Transforms `path` into its relative `base` version
 * If base isn't part of the path provided returns absolute path e.g. `~/app`
 */ const _relativePath = (base, path)=>!path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || "/" : "~" + path;
/**
 * When basepath is `undefined` or '/' it is ignored (we assume it's empty string)
 */ const baseDefaults = (base = "")=>base === "/" ? "" : base;
const absolutePath = (to, base)=>to[0] === "~" ? to.slice(1) : baseDefaults(base) + to;
const relativePath = (base = "", path)=>_relativePath(unescape(baseDefaults(base)), unescape(path));
/*
 * Removes leading question mark
 */ const stripQm = (str)=>str[0] === "?" ? str.slice(1) : str;
/*
 * decodes escape sequences such as %20
 */ const unescape = (str)=>{
    try {
        return decodeURI(str);
    } catch (_e) {
        // fail-safe mode: if string can't be decoded do nothing
        return str;
    }
};
const sanitizeSearch = (search)=>unescape(stripQm(search));
/*
 * Router and router context. Router is a lightweight object that represents the current
 * routing options: how location is managed, base path etc.
 *
 * There is a default router present for most of the use cases, however it can be overridden
 * via the <Router /> component.
 */ const defaultRouter = {
    hook: (0, _useBrowserLocationJs.useBrowserLocation),
    searchHook: (0, _useBrowserLocationJs.useSearch),
    parser: (0, _regexparam.parse),
    base: "",
    // this option is used to override the current location during SSR
    ssrPath: undefined,
    ssrSearch: undefined,
    // optional context to track render state during SSR
    ssrContext: undefined,
    // customizes how `href` props are transformed for <Link />
    hrefs: (x)=>x
};
const RouterCtx = (0, _reactDepsJs.createContext)(defaultRouter);
// gets the closest parent router from the context
const useRouter = ()=>(0, _reactDepsJs.useContext)(RouterCtx);
/**
 * Parameters context. Used by `useParams()` to get the
 * matched params from the innermost `Route` component.
 */ const Params0 = {}, ParamsCtx = (0, _reactDepsJs.createContext)(Params0);
const useParams = ()=>(0, _reactDepsJs.useContext)(ParamsCtx);
/*
 * Part 1, Hooks API: useRoute and useLocation
 */ // Internal version of useLocation to avoid redundant useRouter calls
const useLocationFromRouter = (router)=>{
    const [location, navigate] = router.hook(router);
    // the function reference should stay the same between re-renders, so that
    // it can be passed down as an element prop without any performance concerns.
    // (This is achieved via `useEvent`.)
    return [
        relativePath(router.base, location),
        (0, _reactDepsJs.useEvent)((to, navOpts)=>navigate(absolutePath(to, router.base), navOpts))
    ];
};
const useLocation = ()=>useLocationFromRouter(useRouter());
const useSearch = ()=>{
    const router = useRouter();
    return sanitizeSearch(router.searchHook(router));
};
const matchRoute = (parser, route, path, loose)=>{
    // if the input is a regexp, skip parsing
    const { pattern, keys } = route instanceof RegExp ? {
        keys: false,
        pattern: route
    } : parser(route || "*", loose);
    // array destructuring loses keys, so this is done in two steps
    const result = pattern.exec(path) || [];
    // when parser is in "loose" mode, `$base` is equal to the
    // first part of the route that matches the pattern
    // (e.g. for pattern `/a/:b` and path `/a/1/2/3` the `$base` is `a/1`)
    // we use this for route nesting
    const [$base, ...matches] = result;
    return $base !== undefined ? [
        true,
        (()=>{
            // for regex paths, `keys` will always be false
            // an object with parameters matched, e.g. { foo: "bar" } for "/:foo"
            // we "zip" two arrays here to construct the object
            // ["foo"], ["bar"] → { foo: "bar" }
            const groups = keys !== false ? Object.fromEntries(keys.map((key, i)=>[
                    key,
                    matches[i]
                ])) : result.groups;
            // convert the array to an instance of object
            // this makes it easier to integrate with the existing param implementation
            let obj = {
                ...matches
            };
            // merge named capture groups with matches array
            groups && Object.assign(obj, groups);
            return obj;
        })(),
        // the third value if only present when parser is in "loose" mode,
        // so that we can extract the base path for nested routes
        ...loose ? [
            $base
        ] : []
    ] : [
        false,
        null
    ];
};
const useRoute = (pattern)=>matchRoute(useRouter().parser, pattern, useLocation()[0]);
/*
 * Part 2, Low Carb Router API: Router, Route, Link, Switch
 */ const Router = ({ children, ...props })=>{
    var _props_ssrPath, _props_hook;
    // the router we will inherit from - it is the closest router in the tree,
    // unless the custom `hook` is provided (in that case it's the default one)
    const parent_ = useRouter();
    const parent = props.hook ? defaultRouter : parent_;
    // holds to the context value: the router object
    let value = parent;
    var _props_ssrPath_split;
    // when `ssrPath` contains a `?` character, we can extract the search from it
    const [path, search] = (_props_ssrPath_split = (_props_ssrPath = props.ssrPath) === null || _props_ssrPath === void 0 ? void 0 : _props_ssrPath.split("?")) !== null && _props_ssrPath_split !== void 0 ? _props_ssrPath_split : [];
    if (search) props.ssrSearch = search, props.ssrPath = path;
    var _props_hrefs;
    // hooks can define their own `href` formatter (e.g. for hash location)
    props.hrefs = (_props_hrefs = props.hrefs) !== null && _props_hrefs !== void 0 ? _props_hrefs : (_props_hook = props.hook) === null || _props_hook === void 0 ? void 0 : _props_hook.hrefs;
    // what is happening below: to avoid unnecessary rerenders in child components,
    // we ensure that the router object reference is stable, unless there are any
    // changes that require reload (e.g. `base` prop changes -> all components that
    // get the router from the context should rerender, even if the component is memoized).
    // the expected behaviour is:
    //
    //   1) when the resulted router is no different from the parent, use parent
    //   2) if the custom `hook` prop is provided, we always inherit from the
    //      default router instead. this resets all previously overridden options.
    //   3) when the router is customized here, it should stay stable between renders
    let ref = (0, _reactDepsJs.useRef)({}), prev = ref.current, next = prev;
    for(let k in parent){
        const option = k === "base" ? /* base is special case, it is appended to the parent's base */ parent[k] + (props[k] || "") : props[k] || parent[k];
        if (prev === next && option !== next[k]) ref.current = next = {
            ...next
        };
        next[k] = option;
        // the new router is no different from the parent, use parent
        if (option !== parent[k]) value = next;
    }
    return (0, _reactDepsJs.createElement)(RouterCtx.Provider, {
        value,
        children
    });
};
const h_route = ({ children, component }, params)=>{
    // React-Router style `component` prop
    if (component) return (0, _reactDepsJs.createElement)(component, {
        params
    });
    // support render prop or plain children
    return typeof children === "function" ? children(params) : children;
};
// Cache params object between renders if values are shallow equal
const useCachedParams = (value)=>{
    let prev = (0, _reactDepsJs.useRef)(Params0);
    const curr = prev.current;
    return prev.current = // Update cache if number of params changed or any value changed
    Object.keys(value).length !== Object.keys(curr).length || Object.entries(value).some(([k, v])=>v !== curr[k]) ? value // Return new value if there are changes
     : curr; // Return cached value if nothing changed
};
function useSearchParams() {
    const [location, navigate] = useLocation();
    const search = useSearch();
    const searchParams = (0, _reactDepsJs.useMemo)(()=>new URLSearchParams(search), [
        search
    ]);
    // cached value before next render, so you can call setSearchParams multiple times
    let tempSearchParams = searchParams;
    const setSearchParams = (0, _reactDepsJs.useEvent)((nextInit, options)=>{
        tempSearchParams = new URLSearchParams(typeof nextInit === "function" ? nextInit(tempSearchParams) : nextInit);
        navigate(location + "?" + tempSearchParams, options);
    });
    return [
        searchParams,
        setSearchParams
    ];
}
const Route = ({ path, nest, match, ...renderProps })=>{
    const router = useRouter();
    const [location] = useLocationFromRouter(router);
    const [matches, routeParams, base] = // `match` is a special prop to give up control to the parent,
    // it is used by the `Switch` to avoid double matching
    match !== null && match !== void 0 ? match : matchRoute(router.parser, path, location, nest);
    // when `routeParams` is `null` (there was no match), the argument
    // below becomes {...null} = {}, see the Object Spread specs
    // https://tc39.es/proposal-object-rest-spread/#AbstractOperations-CopyDataProperties
    const params = useCachedParams({
        ...useParams(),
        ...routeParams
    });
    if (!matches) return null;
    const children = base ? (0, _reactDepsJs.createElement)(Router, {
        base
    }, h_route(renderProps, params)) : h_route(renderProps, params);
    return (0, _reactDepsJs.createElement)(ParamsCtx.Provider, {
        value: params,
        children
    });
};
const Link = (0, _reactDepsJs.forwardRef)((props, ref)=>{
    const router = useRouter();
    const [currentPath, navigate] = useLocationFromRouter(router);
    const { to = "", href: targetPath = to, onClick: _onClick, asChild, children, className: cls, /* eslint-disable no-unused-vars */ replace/* ignore nav props */ , state/* ignore nav props */ , /* eslint-enable no-unused-vars */ ...restProps } = props;
    const onClick = (0, _reactDepsJs.useEvent)((event)=>{
        // ignores the navigation when clicked using right mouse button or
        // by holding a special modifier key: ctrl, command, win, alt, shift
        if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) return;
        _onClick === null || _onClick === void 0 ? void 0 : _onClick(event);
        if (!event.defaultPrevented) {
            event.preventDefault();
            navigate(targetPath, props);
        }
    });
    // handle nested routers and absolute paths
    const href = router.hrefs(targetPath[0] === "~" ? targetPath.slice(1) : router.base + targetPath, router // pass router as a second argument for convinience
    );
    return asChild && (0, _reactDepsJs.isValidElement)(children) ? (0, _reactDepsJs.cloneElement)(children, {
        onClick,
        href
    }) : (0, _reactDepsJs.createElement)("a", {
        ...restProps,
        onClick,
        href,
        // `className` can be a function to apply the class if this link is active
        className: (cls === null || cls === void 0 ? void 0 : cls.call) ? cls(currentPath === targetPath) : cls,
        children,
        ref
    });
});
const flattenChildren = (children)=>Array.isArray(children) ? children.flatMap((c)=>flattenChildren(c && c.type === (0, _reactDepsJs.Fragment) ? c.props.children : c)) : [
        children
    ];
const Switch = ({ children, location })=>{
    const router = useRouter();
    const [originalLocation] = useLocationFromRouter(router);
    for (const element of flattenChildren(children)){
        let match = 0;
        if ((0, _reactDepsJs.isValidElement)(element) && // we don't require an element to be of type Route,
        // but we do require it to contain a truthy `path` prop.
        // this allows to use different components that wrap Route
        // inside of a switch, for example <AnimatedRoute />.
        (match = matchRoute(router.parser, element.props.path, location || originalLocation, element.props.nest))[0]) return (0, _reactDepsJs.cloneElement)(element, {
            match
        });
    }
    return null;
};
const Redirect = (props)=>{
    const { to, href = to } = props;
    const router = useRouter();
    const [, navigate] = useLocationFromRouter(router);
    const redirect = (0, _reactDepsJs.useEvent)(()=>navigate(to || href, props));
    const { ssrContext } = router;
    // redirect is guaranteed to be stable since it is returned from useEvent
    (0, _reactDepsJs.useIsomorphicLayoutEffect)(()=>{
        redirect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if (ssrContext) ssrContext.redirectTo = to;
    return null;
};

},{"regexparam":"RveTp","./use-browser-location.js":"2mg8O","./react-deps.js":"jSs0p","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"RveTp":[function(require,module,exports,__globalThis) {
/**
 * @param {string|RegExp} input The route pattern
 * @param {boolean} [loose] Allow open-ended matching. Ignored with `RegExp` input.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parse", ()=>parse);
// error if key missing?
parcelHelpers.export(exports, "inject", ()=>inject);
function parse(input, loose) {
    if (input instanceof RegExp) return {
        keys: false,
        pattern: input
    };
    var c, o, tmp, ext, keys = [], pattern = '', arr = input.split('/');
    arr[0] || arr.shift();
    while(tmp = arr.shift()){
        c = tmp[0];
        if (c === '*') {
            keys.push(c);
            pattern += tmp[1] === '?' ? '(?:/(.*))?' : '/(.*)';
        } else if (c === ':') {
            o = tmp.indexOf('?', 1);
            ext = tmp.indexOf('.', 1);
            keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
            pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
            if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
        } else pattern += '/' + tmp;
    }
    return {
        keys: keys,
        pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    };
}
var RGX = /(\/|^)([:*][^/]*?)(\?)?(?=[/.]|$)/g;
function inject(route, values) {
    return route.replace(RGX, (x, lead, key, optional)=>{
        x = values[key == '*' ? key : key.substring(1)];
        return x ? '/' + x : optional || key == '*' ? '' : '/' + key;
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"2mg8O":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "navigate", ()=>navigate);
parcelHelpers.export(exports, "useBrowserLocation", ()=>useBrowserLocation);
parcelHelpers.export(exports, "useHistoryState", ()=>useHistoryState);
parcelHelpers.export(exports, "useLocationProperty", ()=>useLocationProperty);
parcelHelpers.export(exports, "usePathname", ()=>usePathname);
parcelHelpers.export(exports, "useSearch", ()=>useSearch);
var _reactDepsJs = require("./react-deps.js");
/**
 * History API docs @see https://developer.mozilla.org/en-US/docs/Web/API/History
 */ const eventPopstate = "popstate";
const eventPushState = "pushState";
const eventReplaceState = "replaceState";
const eventHashchange = "hashchange";
const events = [
    eventPopstate,
    eventPushState,
    eventReplaceState,
    eventHashchange
];
const subscribeToLocationUpdates = (callback)=>{
    for (const event of events)addEventListener(event, callback);
    return ()=>{
        for (const event of events)removeEventListener(event, callback);
    };
};
const useLocationProperty = (fn, ssrFn)=>(0, _reactDepsJs.useSyncExternalStore)(subscribeToLocationUpdates, fn, ssrFn);
const currentSearch = ()=>location.search;
const useSearch = ({ ssrSearch = "" } = {})=>useLocationProperty(currentSearch, ()=>ssrSearch);
const currentPathname = ()=>location.pathname;
const usePathname = ({ ssrPath } = {})=>useLocationProperty(currentPathname, ssrPath ? ()=>ssrPath : currentPathname);
const currentHistoryState = ()=>history.state;
const useHistoryState = ()=>useLocationProperty(currentHistoryState, ()=>null);
const navigate = (to, { replace = false, state = null } = {})=>history[replace ? eventReplaceState : eventPushState](state, "", to);
// the 2nd argument of the `useBrowserLocation` return value is a function
// that allows to perform a navigation.
const useBrowserLocation = (opts = {})=>[
        usePathname(opts),
        navigate
    ];
const patchKey = Symbol.for("wouter_v3");
// While History API does have `popstate` event, the only
// proper way to listen to changes via `push/replaceState`
// is to monkey-patch these methods.
//
// See https://stackoverflow.com/a/4585031
if (typeof history !== "undefined" && typeof window[patchKey] === "undefined") {
    for (const type of [
        eventPushState,
        eventReplaceState
    ]){
        const original = history[type];
        // TODO: we should be using unstable_batchedUpdates to avoid multiple re-renders,
        // however that will require an additional peer dependency on react-dom.
        // See: https://github.com/reactwg/react-18/discussions/86#discussioncomment-1567149
        history[type] = function() {
            const result = original.apply(this, arguments);
            const event = new Event(type);
            event.arguments = arguments;
            dispatchEvent(event);
            return result;
        };
    }
    // patch history object only once
    // See: https://github.com/molefrog/wouter/issues/167
    Object.defineProperty(window, patchKey, {
        value: true
    });
}

},{"./react-deps.js":"jSs0p","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"jSs0p":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Fragment", ()=>(0, _react.Fragment));
parcelHelpers.export(exports, "cloneElement", ()=>(0, _react.cloneElement));
parcelHelpers.export(exports, "createContext", ()=>(0, _react.createContext));
parcelHelpers.export(exports, "createElement", ()=>(0, _react.createElement));
parcelHelpers.export(exports, "forwardRef", ()=>(0, _react.forwardRef));
parcelHelpers.export(exports, "isValidElement", ()=>(0, _react.isValidElement));
parcelHelpers.export(exports, "useContext", ()=>(0, _react.useContext));
parcelHelpers.export(exports, "useMemo", ()=>(0, _react.useMemo));
parcelHelpers.export(exports, "useRef", ()=>(0, _react.useRef));
parcelHelpers.export(exports, "useState", ()=>(0, _react.useState));
parcelHelpers.export(exports, "useSyncExternalStore", ()=>(0, _indexJs.useSyncExternalStore));
parcelHelpers.export(exports, "useEvent", ()=>useEvent);
parcelHelpers.export(exports, "useInsertionEffect", ()=>useInsertionEffect);
parcelHelpers.export(exports, "useIsomorphicLayoutEffect", ()=>useIsomorphicLayoutEffect);
var _react = require("react");
var _indexJs = require("use-sync-external-store/shim/index.js");
// React.useInsertionEffect is not available in React <18
// This hack fixes a transpilation issue on some apps
const useBuiltinInsertionEffect = _react["useInsertionEffect"];
// Copied from:
// https://github.com/facebook/react/blob/main/packages/shared/ExecutionEnvironment.js
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
// Copied from:
// https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.ts
// "React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser."
const useIsomorphicLayoutEffect = canUseDOM ? _react.useLayoutEffect : _react.useEffect;
// useInsertionEffect is already a noop on the server.
// See: https://github.com/facebook/react/blob/main/packages/react-server/src/ReactFizzHooks.js
const useInsertionEffect = useBuiltinInsertionEffect || useIsomorphicLayoutEffect;
// Userland polyfill while we wait for the forthcoming
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
// Note: "A high-fidelity polyfill for useEvent is not possible because
// there is no lifecycle or Hook in React that we can use to switch
// .current at the right timing."
// So we will have to make do with this "close enough" approach for now.
const useEvent = (fn)=>{
    const ref = _react.useRef([
        fn,
        (...args)=>ref[0](...args)
    ]).current;
    // Per Dan Abramov: useInsertionEffect executes marginally closer to the
    // correct timing for ref synchronization than useLayoutEffect on React 18.
    // See: https://github.com/facebook/react/pull/25881#issuecomment-1356244360
    useInsertionEffect(()=>{
        ref[0] = fn;
    });
    return ref[1];
};

},{"react":"gYgqf","use-sync-external-store/shim/index.js":"4yBsl","@parcel/transformer-js/src/esmodule-helpers.js":"6zCTp"}],"4yBsl":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = require("5ab7799a565bbe74");

},{"5ab7799a565bbe74":"5rmpN"}],"5rmpN":[function(require,module,exports,__globalThis) {
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
(function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({
                inst: inst
            });
        }, [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({
                inst: inst
            });
            return subscribe(function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            });
        }, [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = require("d49206e28a986e9f"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
})();

},{"d49206e28a986e9f":"gYgqf"}]},["cRCuN"], null, "parcelRequire94c2")

//# sourceMappingURL=ServiceMapMap.4a21ea78.js.map
