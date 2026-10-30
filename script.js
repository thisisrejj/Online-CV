/* ---------- Content: edit this object to update the whole site ---------- */
const DATA = {
  summary:
    "Senior Shopify and E-Commerce Developer with 11+ years of experience building, customizing and maintaining e-commerce and content-managed websites. I turn design requirements into maintainable, user-friendly experiences and work closely with design, marketing and development teams.",
  stats: [
    { n: 11, suffix: "+", label: "years in web development" },
    { n: 7, suffix: "", label: "teams and companies" },
    { n: 14, suffix: "", label: "selected live sites" },
  ],
  roles: [
    {
      title: "Senior Shopify Developer", co: "The Walking Company", dates: "Apr 2024 – Present",
      tags: ["Shopify", "Liquid", "APIs"],
      lead: "Develop and enhance Shopify storefronts that support brand requirements, merchandising needs and e-commerce functionality.",
      more: [
        "Build custom Shopify themes and customize existing templates to match design systems and brand standards.",
        "Partner with UX/UI designers to turn mockups into responsive, polished front-end experiences.",
        "Integrate marketing tools, Shopify apps and platform APIs to extend storefront functionality.",
        "Test, debug and refine features across devices and browsers, with attention to performance and usability.",
        "Ship storefront enhancements that reduce customer friction and support conversion-focused shopping journeys.",
      ],
      sites: [["thewalkingcompany.com"], ["abeofootwear.com"], ["bigdogs.com"]],
    },
    {
      title: "Shopify Developer", co: "Digital Offshoring", dates: "Oct 2023 – Mar 2024",
      tags: ["Shopify", "WordPress", "Neto", "APIs"],
      lead: "Developed and maintained Shopify, WordPress and Neto websites for client projects.",
      more: [
        "Built responsive interfaces using CSS preprocessors and modular front-end practices.",
        "Implemented API integrations within an Agile delivery process.",
        "Used Git-based version control and shared technical knowledge with colleagues.",
      ],
      sites: [["310nutrition.com"]],
    },
    {
      title: "WordPress / Shopify Developer (Contractor)", co: "Impremis Marketing", dates: "Mar 2022 – Oct 2023",
      tags: ["WordPress", "Shopify", "Neto", "APIs"],
      lead: "Delivered website development and enhancements across WordPress, Shopify and Neto projects.",
      more: [
        "Implemented responsive layouts and modular front-end components using CSS preprocessors.",
        "Worked with APIs, third-party integrations, version control and Agile workflows to deliver client requirements.",
      ],
      sites: [],
    },
    {
      title: "Mid Software Developer", co: "Nowcom Global Services", dates: "May 2021 – Mar 2022",
      tags: ["WordPress", "Shopify", "Neto", "APIs"],
      lead: "Developed and maintained client websites across WordPress, Shopify and Neto.",
      more: [
        "Created responsive front-end components and supported API integrations.",
        "Collaborated in an Agile environment and used version control to manage code changes.",
      ],
      sites: [],
    },
    {
      title: "Senior Web Developer", co: "Offshorly", dates: "Jun 2019 – May 2021",
      tags: ["WordPress", "APIs"],
      lead: "Developed WordPress websites using Twig, Bedrock and modular front-end practices.",
      more: [
        "Set up projects with Lando and Docker and supported API integrations and responsive implementation.",
        "Worked with version control and cross-functional teammates in an Agile environment.",
      ],
      sites: [["wpscanly.com"], ["wpsupportly.com/pagespeed"], ["aegisuk.net"], ["coventryuniversity.cn"]],
    },
    {
      title: "Mid-Level Web Developer", co: "Outsourced Quality Assurance, Inc.", dates: "Sep 2016 – Jun 2019",
      tags: ["Shopify", "Liquid", "APIs"],
      lead: "Developed Shopify websites and responsive front-end experiences using Liquid templating.",
      more: [
        "Worked with CSS preprocessors, version control, APIs and integrations to meet project requirements.",
        "Collaborated with developers and stakeholders in an Agile workflow and shared knowledge with teammates.",
      ],
      sites: [["becandbridge.com.au"], ["bakuswimwear.com.au"], ["ellabache.com.au"]],
    },
    {
      title: "Web Developer", co: "Sourcefit Philippines, Inc.", dates: "Apr 2014 – Sep 2016",
      tags: ["WordPress"],
      lead: "Built WordPress themes from scratch and developed websites for dental practices.",
      more: [
        "Translated Photoshop designs into clean, semantic, responsive markup with close attention to visual accuracy.",
        "Improved usability and compatibility through optimization, cross-browser testing and troubleshooting.",
        "Worked with teams and clients to clarify requirements, document deliverables and meet deadlines.",
      ],
      sites: [["drlauraki.com"], ["infinitesmilesdentistry.com"], ["ardeleandentistry.com"]],
    },
  ],
  skills: {
    "E-commerce & CMS": "Shopify, Shopify Plus, WordPress, WooCommerce, Neto",
    "Languages & templating": "PHP, Liquid, HTML5, CSS3/SCSS, JavaScript, jQuery, JSON, Twig",
    "Front-end & tooling": "Bootstrap, Tailwind CSS, Node.js, Shopify Storefront API, Shopify Admin API, Shopify Slate, ThemeKit, Gulp",
    "DevOps & collaboration": "Git, Bitbucket, SourceTree, Bitbucket Pipelines (CI), Lando, Docker, Jira, Confluence, Trello",
  },
};

/* ---------- Helpers ---------- */
const $ = (s) => document.querySelector(s);
const el = (tag, props = {}, kids = []) => {
  const n = Object.assign(document.createElement(tag), props);
  [].concat(kids).forEach((k) => n.append(k));
  return n;
};
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Summary and stats (count-up runs once on load) ---------- */
$("#summary").textContent = DATA.summary;
DATA.stats.forEach((s) => {
  const num = el("b", { textContent: reduce ? s.n + s.suffix : "0" });
  $("#stats").append(el("div", { className: "stat" }, [num, s.label]));
  if (reduce) return;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / 1200, 1);
    num.textContent = Math.round(s.n * (1 - Math.pow(1 - p, 3))) + (p === 1 ? s.suffix : "");
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* ---------- Roles + skill filter ---------- */
const cart = new Set();
const cards = DATA.roles.map((r, i) => {
  const add = el("button", { className: "btn add", type: "button", textContent: "Add to cart" });
  add.addEventListener("click", () => toggle(i));
  const sites = r.sites.length
    ? el("p", { className: "sites" }, ["Selected sites: ", ...r.sites.flatMap(([d], k) => [
        k ? " | " : "",
        el("a", { href: "https://" + d, target: "_blank", rel: "noopener", textContent: d }),
      ])])
    : "";
  const card = el("article", { className: "role-card" }, [
    el("div", { className: "role-top" }, [
      el("div", {}, [el("h4", { textContent: r.title }), el("div", { textContent: r.co }), el("span", { className: "dates", textContent: r.dates })]),
      add,
    ]),
    el("div", { className: "tags" }, r.tags.map((t) => el("span", { textContent: t }))),
    el("p", { textContent: r.lead }),
    el("details", {}, [el("summary", { textContent: "See details" }), el("ul", {}, r.more.map((m) => el("li", { textContent: m })))]),
    sites,
  ]);
  $("#roles").append(card);
  return { card, add, r };
});

const allTags = ["All", ...new Set(DATA.roles.flatMap((r) => r.tags))];
allTags.forEach((t, i) => {
  const b = el("button", { className: "chip", type: "button", textContent: t });
  b.setAttribute("aria-pressed", i === 0);
  b.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
    cards.forEach(({ card, r }) => (card.hidden = t !== "All" && !r.tags.includes(t)));
  });
  $("#chips").append(b);
});

/* ---------- Skills ---------- */
Object.entries(DATA.skills).forEach(([k, v]) =>
  $("#skills").append(el("div", { className: "card" }, [el("h4", { textContent: k }), el("p", { textContent: v })]))
);

/* ---------- Cart (a playful "hire me" checkout) ---------- */
function toggle(i) {
  cart.has(i) ? cart.delete(i) : cart.add(i);
  renderCart();
  openCart(true);
}
function renderCart() {
  const list = $("#items");
  list.replaceChildren();
  cards.forEach(({ add }, i) => {
    add.textContent = cart.has(i) ? "Added ✓" : "Add to cart";
    add.classList.toggle("done", cart.has(i));
  });
  [...cart].forEach((i) => {
    const r = DATA.roles[i];
    const rm = el("button", { type: "button", textContent: "✕" });
    rm.setAttribute("aria-label", "Remove " + r.title);
    rm.addEventListener("click", () => toggle(i));
    list.append(el("li", {}, [el("span", {}, [r.title, el("small", { textContent: r.co })]), rm]));
  });
  $("#count").textContent = cart.size;
  $("#empty").hidden = cart.size > 0;
  const lines = [...cart].map((i) => "- " + DATA.roles[i].title + " at " + DATA.roles[i].co);
  const body = "Hi Regina,\n\nI looked through your resume" + (lines.length ? " and liked:\n" + lines.join("\n") : "") + "\n\nLet’s talk.";
  $("#checkout").href = "mailto:rgjpanaligan@gmail.com?subject=" + encodeURIComponent("Let’s work together") + "&body=" + encodeURIComponent(body);
}
function openCart(open) {
  $("#cart").classList.toggle("open", open);
  $("#cart").setAttribute("aria-hidden", !open);
}
$("#cartBtn").addEventListener("click", () => openCart(!$("#cart").classList.contains("open")));
$("#close").addEventListener("click", () => openCart(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && openCart(false));
renderCart();

/* ---------- Print: open all details so nothing is hidden ---------- */
addEventListener("beforeprint", () => document.querySelectorAll("details").forEach((d) => (d.open = true)));
