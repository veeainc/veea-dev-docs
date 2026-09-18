/* Privacy-gated DocsBot AI launcher.
   The third-party widget is not requested until a visitor explicitly opens it. */
(function () {
  var botId = "mKkgwKayKOO9NkuUXRQw/Vv50n3ruhlDeIeye0L3j";
  var widgetUrl = "https://widget.docsbot.ai/chat.js";
  var loading = false;

  function labelVendorButton() {
    var root = document.querySelector("#docsbotai-root");
    var button = root && root.shadowRoot && root.shadowRoot.querySelector("button.floating-button");
    if (!button) {
      window.setTimeout(labelVendorButton, 400);
      return;
    }
    button.setAttribute("aria-label", "Question? Ask Veea AI");
    button.setAttribute("title", "Question? Ask Veea AI");

    if (!root.shadowRoot.querySelector("#veea-docsbot-credit-style")) {
      var style = document.createElement("style");
      style.id = "veea-docsbot-credit-style";
      style.textContent =
        ".docsbot-chat-credits { display: none !important; }" +
        "button.floating-button { min-height: 50px !important; height: 50px !important; padding: 11px 18px !important; border-radius: 999px !important; font-size: 13.8px !important; box-shadow: rgba(0,0,0,.05) 0 0 0 1px, rgba(0,0,0,.1) 0 3px 5px, rgba(0,0,0,.05) 0 3px 3px !important; }" +
        ".floating-button-icon { width: 24px !important; height: 24px !important; }";
      root.shadowRoot.appendChild(style);
    }
  }

  function loadWidget(launcher, dialog) {
    if (loading) {
      return;
    }
    loading = true;
    launcher.disabled = true;
    launcher.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i><span>Loading Veea AI</span>';
    dialog.close();

    window.DocsBotAI = window.DocsBotAI || {};
    window.DocsBotAI.init = function (options) {
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = widgetUrl;
        script.addEventListener("load", function () {
          window.DocsBotAI.mount(Object.assign({}, options)).then(resolve).catch(reject);
        });
        script.addEventListener("error", function () {
          reject(new Error("The AI assistant could not be loaded."));
        });
        document.head.appendChild(script);
      });
    };

    window.DocsBotAI.init({ id: botId }).then(function () {
      launcher.remove();
      labelVendorButton();
      document.dispatchEvent(new CustomEvent("veea-docsbot-ready"));
    }).catch(function () {
      loading = false;
      launcher.disabled = false;
      launcher.innerHTML = '<img src="/assets/brand/veea-logo-white.svg" alt=""><span><strong>QUESTION?</strong> Ask Veea AI</span>';
      launcher.setAttribute("aria-live", "polite");
      launcher.querySelector("span").textContent = "Assistant unavailable. Try again";
    });
  }

  function initializeLauncher() {
    if (document.querySelector(".veea-ai-launcher")) {
      return;
    }

    var launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "veea-ai-launcher";
    launcher.setAttribute("aria-haspopup", "dialog");
    launcher.setAttribute("aria-label", "Question? Ask Veea AI");
    launcher.innerHTML = '<img src="/assets/brand/veea-logo-white.svg" alt=""><span><strong>QUESTION?</strong> Ask Veea AI</span>';

    var dialog = document.createElement("dialog");
    dialog.className = "veea-ai-consent";
    dialog.setAttribute("aria-labelledby", "veea-ai-consent-title");
    dialog.innerHTML =
      '<div class="veea-ai-consent__body">' +
      '<p class="veea-ai-consent__eyebrow"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> AI documentation assistant</p>' +
      '<h2 id="veea-ai-consent-title">Before you open the assistant</h2>' +
      '<p>Your questions and chat messages will be sent to DocsBot AI to generate answers. Do not enter confidential information, personal data, credentials, or customer information.</p>' +
      '<div class="veea-ai-consent__links">' +
      '<a href="https://www.veea.com/legal/privacy" target="_blank" rel="noopener noreferrer">Veea privacy policy</a>' +
      '<a href="https://docsbot.ai/legal/privacy-policy" target="_blank" rel="noopener noreferrer">DocsBot privacy policy</a>' +
      '</div>' +
      '<div class="veea-ai-consent__actions">' +
      '<button type="button" data-ai-cancel autofocus>Not now</button>' +
      '<button type="button" data-ai-consent>Open AI assistant</button>' +
      '</div>' +
      '</div>';

    launcher.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
    dialog.querySelector("[data-ai-cancel]").addEventListener("click", function () {
      dialog.close();
    });
    dialog.querySelector("[data-ai-consent]").addEventListener("click", function () {
      loadWidget(launcher, dialog);
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    document.body.appendChild(launcher);
    document.body.appendChild(dialog);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLauncher);
  } else {
    initializeLauncher();
  }
})();
