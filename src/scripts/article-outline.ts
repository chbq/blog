const initializeArticleOutline = () => {
  document.querySelectorAll<HTMLElement>("[data-article-layout]").forEach((layout) => {
    if (layout.dataset.outlineReady === "true") return;
    layout.dataset.outlineReady = "true";

    const links = Array.from(
      layout.querySelectorAll<HTMLAnchorElement>('.article-toc-link[href^="#"]'),
    );
    if (links.length === 0) return;

    const headingIds = Array.from(
      new Set(
        links.map((link) => {
          try {
            return decodeURIComponent(link.hash.slice(1));
          } catch {
            return link.hash.slice(1);
          }
        }),
      ),
    );
    const pageHeadings = headingIds
      .map((id) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading !== null);

    const openHashTarget = () => {
      if (!window.location.hash) return;

      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // Keep the browser-provided hash when it is not URI encoded.
      }

      const target = document.getElementById(id);
      let section = target?.closest<HTMLDetailsElement>("details.article-section");
      while (section) {
        section.open = true;
        section =
          section.parentElement?.closest<HTMLDetailsElement>("details.article-section") ??
          null;
      }
    };

    const setActiveHeading = (id: string) => {
      links.forEach((link) => {
        const active =
          link.hash === `#${id}` || link.hash === `#${encodeURIComponent(id)}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    let framePending = false;
    const updateActiveHeading = () => {
      framePending = false;
      const threshold = Math.min(window.innerHeight * 0.28, 180);
      let active = pageHeadings[0];

      for (const heading of pageHeadings) {
        if (heading.getBoundingClientRect().top <= threshold) active = heading;
        else break;
      }

      if (active) setActiveHeading(active.id);
    };
    const scheduleUpdate = () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateActiveHeading);
    };

    links.forEach((link) => {
      link.addEventListener("click", () => window.setTimeout(openHashTarget, 0));
    });
    layout.querySelectorAll("details.article-section").forEach((section) => {
      section.addEventListener("toggle", scheduleUpdate);
    });
    window.addEventListener("hashchange", () => {
      openHashTarget();
      scheduleUpdate();
    });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    openHashTarget();
    updateActiveHeading();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeArticleOutline, {
    once: true,
  });
} else {
  initializeArticleOutline();
}
