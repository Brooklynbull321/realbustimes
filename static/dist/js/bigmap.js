// https://maplibre.org/maplibre-gl-js/docs/examples/check-for-support/

function isWebglSupported() {
  if (window.WebGLRenderingContext) {
    const canvas = document.createElement("canvas");

    try {
      const context =
        canvas.getContext("webgl2") || canvas.getContext("webgl");

      if (
        context &&
        typeof context.getParameter === "function" &&
        !context.isContextLost()
      ) {
        return true;
      }
    } catch (e) {
      // WebGL is supported but disabled
    }
    return false;
  }
  return false;
}

// Make sure LoadJS is available globally (from CDN in index.html)
function loadScript() {
  if (!window.loadjs) {
    console.error("LoadJS is not loaded. Add the CDN script in index.html.");
    return;
  }

  if (typeof window.fetch !== "undefined" && isWebglSupported()) {
    window.loadjs(window.NEW_JS, { async: false });
  } else {
    window.loadjs(window.OLD_JS, { async: false });
  }
}

loadScript();