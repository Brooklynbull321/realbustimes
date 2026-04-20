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
      // WebGL disabled or blocked
    }
  }
  return false;
}

// Wait for page load to ensure window.loadjs exists
document.addEventListener("DOMContentLoaded", () => {
  if (!window.loadjs) {
    console.error("LoadJS not found. Add CDN script to base template.");
    return;
  }

  if (typeof window.fetch !== "undefined" && isWebglSupported()) {
    window.loadjs(window.NEW_JS, { async: false });
  } else {
    window.loadjs(window.OLD_JS, { async: false });
  }
});