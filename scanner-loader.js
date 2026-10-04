(() => {
  let loading;

  window.loadHtml5Qrcode = function () {
    if (window.Html5Qrcode) return Promise.resolve();
    if (loading) return loading;

    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";
      script.onload = () => {
        if (window.Html5Qrcode) {
          resolve();
        } else {
          loading = null;
          reject(new Error("QR scanner library loaded without its API."));
        }
      };
      script.onerror = () => {
        loading = null;
        reject(new Error("QR scanner library could not be loaded."));
      };
      document.head.append(script);
    });

    return loading;
  };
})();
