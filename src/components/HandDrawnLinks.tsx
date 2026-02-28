"use client";
import { useEffect } from "react";

export default function HandDrawnLinks() {
  useEffect(() => {
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

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
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

    return () => {
      links.forEach((link) => {
        const s = link.querySelector("svg.line-drawn");
        if (s) s.remove();
      });
    };
  }, []);

  return null;
}
