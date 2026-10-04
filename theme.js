(() => {
  const STORAGE_KEY = "bsis1a_theme";
  const root = document.documentElement;
  let theme = "light";

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
  } catch (error) {
    console.warn("Theme preference could not be read from local storage.", error);
  }

  function applyTheme(nextTheme) {
    theme = nextTheme;
    root.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#111318" : "#f4f7fb";

    const button = document.querySelector(".theme-toggle");
    if (button) {
      const dark = theme === "dark";
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
      button.title = `${dark ? "Dark" : "Light"} mode is active`;
      button.querySelector(".theme-label").textContent = dark ? "Dark" : "Light";
      button.querySelector(".theme-icon").innerHTML = dark
        ? '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4M17 5h4"/>'
        : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
    }
  }

  function addToggle() {
    const topbar = document.querySelector(".topbar");
    if (!topbar || topbar.querySelector(".theme-toggle")) return;

    const datebox = topbar.querySelector(".datebox");
    const liveStatus = document.querySelector(".hero .live");
    if (datebox && liveStatus) {
      topbar.classList.add("has-hero-date");
      const heroMeta = document.createElement("div");
      heroMeta.className = "hero-meta";
      liveStatus.parentNode.insertBefore(heroMeta, liveStatus);
      heroMeta.append(liveStatus, datebox);
      datebox.classList.add("hero-date");
    } else if (datebox) {
      topbar.classList.add("has-header-date");
    }

    let actions = topbar.querySelector(".top-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "top-actions";
      topbar.append(actions);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"></svg><span class="theme-label"></span>';
    button.addEventListener("click", () => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (error) {
        console.warn("Theme preference could not be saved to local storage.", error);
      }
    });
    actions.append(button);
    applyTheme(theme);
  }

  applyTheme(theme);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addToggle, { once: true });
  } else {
    addToggle();
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || (event.newValue !== "light" && event.newValue !== "dark")) return;
    applyTheme(event.newValue);
  });
})();
