"use client";
import { useEffect } from "react";

function attachHandlers(links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[]) {
  links.forEach((link) => {
    if (link.dataset.roughened) return; // prevent double-attaching
    link.dataset.roughened = "true";

    let svg: SVGElement | null = null;

    link.addEventListener("mouseenter", () => {
      const width: number = link.offsetWidth + 8;
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("line-drawn");
      svg.setAttribute("width", `${width}`);
      svg.setAttribute("height", "10");
      svg.setAttribute("viewBox", `0 0 ${width} 10`);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", "0");
      line.setAttribute("y1", "5");
      line.setAttribute("x2", `${width}`);
      line.setAttribute("y2", "6");
      line.setAttribute("filter", "url(#roughen)");
      line.style.strokeDasharray = `${width}`;
      line.style.strokeDashoffset = `${width}`;
      line.style.transition = "stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

      svg.appendChild(line);
      link.appendChild(svg);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          line.style.strokeDashoffset = "0";
        });
      });
    });

    link.addEventListener("mouseleave", () => {
      if (svg) {
        svg.remove();
        svg = null;
      }
    });
  });
}

export default function HandDrawnLinks() {
  useEffect(() => {
    // Inject SVG filter once
    if (!document.getElementById("roughen-filter")) {
      const svgFilter = `
        <svg id="roughen-filter" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute">
          <defs>
            <filter id="roughen">
              <feTurbulence type="turbulence" baseFrequency="0.065" numOctaves="2" result="noise" seed="2"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>`;
      document.body.insertAdjacentHTML("afterbegin", svgFilter);
    }

    // Attach to existing links
    attachHandlers(document.querySelectorAll("a"));

    // Watch for new links added after route changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;

          // Check if the node itself is a link
          if (el.tagName === "A") {
            attachHandlers([el as HTMLAnchorElement]);
          }

          // Check for links nested within the added node
          const nested = el.querySelectorAll?.("a");
          if (nested?.length) attachHandlers(nested);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll("a[data-roughened]").forEach((link) => {
        delete (link as HTMLElement).dataset.roughened;
        link.querySelector("svg.line-drawn")?.remove();
      });
    };
  }, []);

  return null;
}
