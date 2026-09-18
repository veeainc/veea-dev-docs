(function () {
  function addDeveloperCta() {
    if (document.querySelector(".vht-header-actions")) {
      return;
    }

    var search = document.querySelector(".md-header .md-search");
    var searchToggle = document.querySelector(".md-header label[for='__search']");
    var inner = document.querySelector(".md-header__inner");

    if (!search || !searchToggle || !inner) {
      return;
    }

    var actions = document.createElement("div");
    actions.className = "vht-header-actions";

    var cta = document.createElement("a");
    cta.className = "vht-header-cta";
    cta.href = "https://www.veea.com/developers-kit-sign-up";
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    cta.dataset.hover = "Become a developer";
    cta.setAttribute("aria-label", "Become a Veea developer");

    var ctaLabel = document.createElement("span");
    ctaLabel.textContent = "Become a developer";
    cta.appendChild(ctaLabel);

    inner.insertBefore(actions, searchToggle);
    actions.appendChild(searchToggle);
    actions.appendChild(search);
    actions.appendChild(cta);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addDeveloperCta);
  } else {
    addDeveloperCta();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.document$ && typeof window.document$.subscribe === "function") {
      window.document$.subscribe(addDeveloperCta);
    }
  });
})();

(function () {
  function addHeaderTrademark() {
    document.querySelectorAll(".md-header__topic .md-ellipsis").forEach(function (title) {
      if (!title.querySelector(".vht-header-trademark") && title.textContent.trim() === "VeeaONE Developer Docs") {
        title.innerHTML = 'VeeaONE<sup class="vht-header-trademark">TM</sup> Developer Docs';
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addHeaderTrademark);
  } else {
    addHeaderTrademark();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(addHeaderTrademark);
  }
})();

(function () {
  function navLabel(href, fallback) {
    if (!href) {
      return fallback;
    }
    var target = new URL(href, window.location.href);
    var match = Array.from(document.querySelectorAll(".md-nav__link[href]")).find(function (link) {
      return new URL(link.href, window.location.href).pathname === target.pathname;
    });
    return match ? match.textContent.replace(/\s+/g, " ").trim() : fallback;
  }

  function navCard(direction, relation) {
    var metadata = document.querySelector('link[rel="' + relation + '"]');
    if (!metadata) {
      return "";
    }
    var href = metadata.href;
    var label = navLabel(href, direction === "Previous" ? "Previous page" : "Next page");
    var icon = direction === "Previous" ? "fa-arrow-left" : "fa-arrow-right";
    return (
      '<a class="veea-footer-nav__link veea-footer-nav__link--' + relation + '" href="' + href + '">' +
      '<i class="fa-solid ' + icon + '" aria-hidden="true"></i>' +
      '<span><small>' + direction + '</small><strong>' + label + "</strong></span>" +
      "</a>"
    );
  }

  function buildFooter() {
    var footer = document.querySelector(".md-footer");
    if (!footer || footer.dataset.veeaReady === "true") {
      return;
    }
    footer.dataset.veeaReady = "true";

    if (!document.querySelector(".docs-home")) {
      var navigation = document.createElement("nav");
      navigation.className = "veea-footer-nav md-grid";
      navigation.setAttribute("aria-label", "Documentation page navigation");
      navigation.innerHTML = navCard("Previous", "prev") + navCard("Next", "next");
      if (navigation.children.length) {
        footer.insertBefore(navigation, footer.firstChild);
      }
    }

    var inner = footer.querySelector(".md-footer-meta__inner");
    if (!inner) {
      return;
    }
    inner.innerHTML =
      '<div class="veea-footer-brand">' +
      '<a href="/" aria-label="VeeaONE Developer Docs home"><img src="/assets/brand/veea-logo-red.svg" alt="" /><span>VeeaONE Developer Docs</span></a>' +
      '<p>Build and run software across the Veea edge.</p>' +
      "</div>" +
      '<div class="veea-footer-links" aria-label="Developer resources">' +
      '<strong>Developer resources</strong>' +
      '<a href="/platform/veeone-runtime/">VeeaONE Runtime</a>' +
      '<a href="/vht-2.0/quickstart/">VHT 2.0 Quickstart</a>' +
      '<a href="https://www.veea.com/developers-kit-sign-up" target="_blank" rel="noopener noreferrer">Become a developer</a>' +
      '<a href="https://support.veea.com/hc/en-us" target="_blank" rel="noopener noreferrer">Support</a>' +
      "</div>" +
      '<div class="veea-footer-links" aria-label="Site utilities">' +
      '<strong>Site</strong>' +
      '<a href="/llms.txt">llms.txt</a>' +
      '<a href="/sitemap.xml">Sitemap</a>' +
      '<a href="https://www.veea.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>' +
      '<a href="https://www.veea.com/legal/terms-of-use" target="_blank" rel="noopener noreferrer">Terms</a>' +
      "</div>" +
      '<div class="veea-footer-connect">' +
      '<strong>Connect</strong>' +
      '<div><a href="https://www.linkedin.com/company/veea" target="_blank" rel="noopener noreferrer" aria-label="Veea on LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
      '<a href="https://www.youtube.com/@veea-inc" target="_blank" rel="noopener noreferrer" aria-label="Veea on YouTube"><i class="fa-brands fa-youtube"></i></a></div>' +
      '<button type="button" data-footer-top><i class="fa-solid fa-arrow-up" aria-hidden="true"></i> Back to top</button>' +
      "</div>" +
      '<div class="veea-footer-legal">© 2026 Veea Inc. All rights reserved.</div>';

    inner.querySelector("[data-footer-top]").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildFooter);
  } else {
    buildFooter();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      var footer = document.querySelector(".md-footer");
      if (footer) {
        footer.dataset.veeaReady = "false";
        footer.querySelector(".veea-footer-nav")?.remove();
      }
      buildFooter();
    });
  }
})();

(function () {
  function initializeWelcomeVideo() {
    var video = document.querySelector(".docs-welcome-video video");
    var frame = video && video.closest(".docs-welcome-video__frame");
    if (!video || !frame || video.dataset.welcomeReady === "true") {
      return;
    }

    video.dataset.welcomeReady = "true";
    video.addEventListener("play", function () {
      frame.classList.add("is-playing");
    });
    video.addEventListener("ended", function () {
      frame.classList.remove("is-playing");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWelcomeVideo);
  } else {
    initializeWelcomeVideo();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initializeWelcomeVideo);
  }
})();

(function () {
  function copyText(value) {
    function legacyCopy() {
      var field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).catch(function () {
        legacyCopy();
      });
    }

    legacyCopy();
    return Promise.resolve();
  }

  function showCopied(button, message) {
    var original = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span>' + message + "</span>";
    button.classList.add("is-copied");
    window.setTimeout(function () {
      button.innerHTML = original;
      button.classList.remove("is-copied");
    }, 1600);
  }

  function cleanPageText(content) {
    var clone = content.cloneNode(true);
    clone.querySelectorAll(".docs-page-tools, .headerlink, script, style").forEach(function (node) {
      node.remove();
    });

    var title = document.querySelector("h1");
    var heading = title ? title.textContent.trim() : document.title;
    var body = clone.innerText.replace(/\n{3,}/g, "\n\n").trim();
    return heading + "\n" + window.location.href + "\n\n" + body;
  }

  function addPageTools() {
    if (document.querySelector(".docs-home, .docs-page-tools")) {
      return;
    }

    var content = document.querySelector(".md-content__inner");
    var heading = content && content.querySelector("h1");
    if (!content || !heading) {
      return;
    }

    var tools = document.createElement("div");
    tools.className = "docs-page-tools";
    tools.setAttribute("aria-label", "Page utilities");
    tools.innerHTML =
      '<button type="button" data-action="copy-page"><i class="fa-regular fa-copy" aria-hidden="true"></i><span>Copy page</span></button>' +
      '<button type="button" data-action="copy-link"><i class="fa-solid fa-link" aria-hidden="true"></i><span>Copy link</span></button>';

    heading.insertAdjacentElement("afterend", tools);

    tools.querySelector('[data-action="copy-page"]').addEventListener("click", function () {
      var button = this;
      copyText(cleanPageText(content)).then(function () {
        showCopied(button, "Page copied");
      });
    });

    tools.querySelector('[data-action="copy-link"]').addEventListener("click", function () {
      var button = this;
      copyText(window.location.href).then(function () {
        showCopied(button, "Link copied");
      });
    });
  }

  function identifyDocsBot() {
    var root = document.querySelector("#docsbotai-root");
    var button = root && root.shadowRoot && root.shadowRoot.querySelector("button.floating-button");
    if (!button) return;
    button.setAttribute("aria-label", "Question? Ask Veea AI");
    button.setAttribute("title", "Question? Ask Veea AI");
  }

  function enhanceDocs() {
    addPageTools();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceDocs);
  } else {
    enhanceDocs();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(addPageTools);
  }

  document.addEventListener("veea-docsbot-ready", identifyDocsBot);
})();

(function () {
  var iconMap = {
    "distributed edge systems should not become distributed operational problems.": "fa-network-wired",
    "bring the environment together": "fa-layer-group",
    "keep critical work local": "fa-location-dot",
    "match the target to the workload": "fa-code-branch",
    "understand what veeaone provides": "fa-diagram-project",
    "veeaone runtime": "fa-server",
    "runtime capabilities": "fa-sliders",
    "go from toolkit to running application": "fa-rocket",
    "run the vht 2.0 quickstart": "fa-terminal",
    "become a veea developer": "fa-user-plus",
    "a managed edge foundation between the cloud and the physical world.": "fa-cloud-arrow-down",
    "heterogeneous compute": "fa-microchip",
    "local intelligence": "fa-brain",
    "distributed operations": "fa-sitemap",
    "veeahubs are the native edge target. qualified nodes extend the runtime.": "fa-server",
    "veeahubs": "fa-server",
    "linux / ubuntu": "fa-laptop-code",
    "nvidia jetson": "fa-microchip",
    "other hardware": "fa-industry",
    "capability profiles": "fa-sliders",
    "which vht workflow should i use?": "fa-code-branch",
    "read the docs today. sign up when you are ready to build on veea.": "fa-book-open",
    "explore publicly": "fa-book-open",
    "become a developer": "fa-user-plus",
    "deploy with confidence": "fa-shield-halved",
    "get from account to deployed app": "fa-route",
    "create your developer account": "fa-user-plus",
    "prepare and enroll a runtime target": "fa-server",
    "install the toolkit": "fa-screwdriver-wrench",
    "run the first app": "fa-rocket",
    "choose a deployment path": "fa-cloud-arrow-up",
    "vht documentation": "fa-book",
    "vht 2.0": "fa-cube",
    "vht 1.x": "fa-box-archive",
    "common developer jobs": "fa-code",
    "manage development hubs": "fa-server",
    "bring targets online": "fa-plug",
    "choose a runtime target": "fa-code-branch",
    "publish images": "fa-box",
    "run upgrade checks": "fa-list-check",
    "maintain a vht 1.x app": "fa-box-archive",
    "add app ui links": "fa-link",
    "inspect hub runtime details": "fa-circle-info"
  };

  function applyHomepageIcons() {
    document.querySelectorAll(".docs-home .docs-icon").forEach(function (icon) {
      var owner = icon.closest("article, a, .docs-heading, li");
      var label = owner && owner.querySelector("h2, strong");
      var key = label ? label.textContent.trim().toLowerCase() : "";
      var iconName = iconMap[key] || "fa-code";
      icon.classList.add("docs-icon--fa");
      icon.replaceChildren();
      var glyph = document.createElement("i");
      glyph.className = "fa-solid " + iconName;
      glyph.setAttribute("aria-hidden", "true");
      icon.appendChild(glyph);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyHomepageIcons);
  } else {
    applyHomepageIcons();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(applyHomepageIcons);
  }
})();
