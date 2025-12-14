window.__DASH_REGION__ = "World";

console.log("[bridge] loaded");

window.addEventListener("message", (event) => {
  const data = event.data;
  if (data && data.type === "SET_REGION") {
    window.__DASH_REGION__ = data.region || "World";
    console.log("[bridge] region set to", window.__DASH_REGION__);
  }
});
