const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const cursorLight = document.querySelector(".cursor-light");
const themeToggle = document.querySelector(".theme-toggle");
const revealTargets = document.querySelectorAll(
  ".intro, .signature .section-head, .signature-console, .signature-cards article, .work .section-head, .project-tabs, .project-stage, .stack .section-head, .stack-grid article, .journey > div, .timeline article, .contact"
);

const projects = {
  codeflow: {
    type: "Real-time collaboration",
    stack: "React / Node / Socket.IO / Yjs",
    name: "CodeFlow",
    description:
      "A collaborative code editor where users join private rooms and code together with live synchronization, compiler output sharing, CodeMirror editing, and Yjs conflict-free state.",
    impact: ["Room-based sessions", "Live editor state", "Compiler output sharing"],
  },
  wanderlust: {
    type: "Full-stack travel platform",
    stack: "MERN / JWT / Stripe / Socket.io",
    name: "Wanderlust",
    description:
      "An Airbnb-style travel and listing platform with authentication, property listings, bookings, messaging, reviews, secure payments, host controls, and availability calendars.",
    impact: ["Secure auth", "Host listing tools", "Booking and payments"],
  },
  rental: {
    type: "Java OOP system",
    stack: "Java / OOP / Collections",
    name: "Car Rental",
    description:
      "A menu-driven Java application using encapsulation, inheritance, abstraction, and polymorphism to manage cars, customers, rental records, returns, and pricing.",
    impact: ["Rental lifecycle", "Pricing logic", "Exception handling"],
  },
};

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll(".project-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const project = projects[tab.dataset.project];
    const stage = document.querySelector(".project-stage");

    document.querySelectorAll(".project-tab").forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });

    document.querySelector("#project-type").textContent = project.type;
    document.querySelector("#project-stack").textContent = project.stack;
    document.querySelector("#project-name").textContent = project.name;
    document.querySelector("#project-description").textContent = project.description;
    document.querySelector("#project-impact").innerHTML = project.impact
      .map((item) => `<span>${item}</span>`)
      .join("");

    stage.classList.remove("is-swapping");
    requestAnimationFrame(() => stage.classList.add("is-swapping"));
  });
});

if (cursorLight && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorLight.style.opacity = "1";
    cursorLight.style.transform = `translate(${event.clientX - 130}px, ${event.clientY - 130}px)`;
  });

  window.addEventListener("pointerleave", () => {
    cursorLight.style.opacity = "0";
  });
}

const setThemeButtonLabel = () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
};

setThemeButtonLabel();

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // Theme still changes for the current page even if storage is blocked.
  }
  setThemeButtonLabel();
});

if (revealTargets.length) {
  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}
