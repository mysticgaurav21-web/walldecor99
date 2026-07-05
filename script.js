// ===== Walldecor99 storefront =====

// TODO: replace with your real WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "919999999999";

// Load products: prefer an admin-edited working copy saved in this browser,
// otherwise fall back to the shipped products.js file.
function loadProducts() {
  try {
    const saved = localStorage.getItem("wd99_products");
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return window.PRODUCTS || [];
}

const CATEGORIES = window.CATEGORIES || [];
let PRODUCTS = loadProducts();

let activeCategory = "all";
let activeSub = "all";

const texClass = {
  "pvc-panel": "tex-pvc",
  "wallpaper": "tex-wallpaper",
  "glass-film": "tex-glass",
  "artificial-grass": "tex-grass",
  "3d-panels": "tex-3d",
  "mosaic-tiles": "tex-mosaic"
};

function catName(slug) {
  const c = CATEGORIES.find(c => c.slug === slug);
  return c ? c.name : slug;
}

function waLink(product) {
  const parts = [
    `Hi Walldecor99, I'd like to enquire about:`,
    `*${product.name}*`,
    `Category: ${catName(product.category)}${product.subcategory ? " > " + product.subcategory : ""}`,
    `Price: Rs.${product.price}/${product.unit}`,
    ``,
    `Please share more details and delivery info.`
  ];
  const text = encodeURIComponent(parts.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function renderSwatches() {
  const el = document.getElementById("swatches");
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c => `
    <a class="swatch ${texClass[c.slug] || ""}" href="#catalog" data-cat="${c.slug}">
      <div class="swatch-label">
        <div class="eyebrow">${c.subcategories.length ? c.subcategories.length + " types" : "Shop"}</div>
        <strong>${c.name}</strong>
      </div>
    </a>
  `).join("");
  el.querySelectorAll(".swatch").forEach(s => {
    s.addEventListener("click", () => {
      setCategory(s.dataset.cat);
    });
  });
}

function renderFilters() {
  const el = document.getElementById("filters");
  const chips = [`<button class="chip ${activeCategory === "all" ? "active" : ""}" data-cat="all">All Products</button>`]
    .concat(CATEGORIES.map(c => `<button class="chip ${activeCategory === c.slug ? "active" : ""}" data-cat="${c.slug}">${c.name}</button>`));
  el.innerHTML = chips.join("");
  el.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => setCategory(btn.dataset.cat));
  });

  const subWrap = document.getElementById("subFilters");
  const cat = CATEGORIES.find(c => c.slug === activeCategory);
  if (!cat || !cat.subcategories.length) {
    subWrap.innerHTML = "";
    return;
  }
  const subChips = [`<button class="chip ${activeSub === "all" ? "active" : ""}" data-sub="all">All ${cat.name}</button>`]
    .concat(cat.subcategories.map(s => `<button class="chip ${activeSub === s ? "active" : ""}" data-sub="${s}">${s}</button>`));
  subWrap.innerHTML = subChips.join("");
  subWrap.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => { activeSub = btn.dataset.sub; renderFilters(); renderGrid(); });
  });
}

function setCategory(slug) {
  activeCategory = slug;
  activeSub = "all";
  renderFilters();
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById("grid");
  let items = PRODUCTS;
  if (activeCategory !== "all") items = items.filter(p => p.category === activeCategory);
  if (activeSub !== "all") items = items.filter(p => p.subcategory === activeSub);

  if (!items.length) {
    grid.innerHTML = `<p class="empty-note">No products in this category yet — enquire on WhatsApp and we'll help you find the right fit.</p>`;
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="card">
      <div class="card-img" data-open="${p.id}">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-cat">${catName(p.category)}${p.subcategory ? " · " + p.subcategory : ""}</div>
        <h3>${p.name}</h3>
        <p class="card-desc">${p.description || ""}</p>
        <div class="card-foot">
          <div class="price">Rs.${p.price} <span>/ ${p.unit}</span></div>
          <a class="wa-btn" target="_blank" rel="noopener" href="${waLink(p)}">Enquire</a>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("[data-open]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.open));
  });
}

function openModal(id) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  const bg = document.getElementById("modalBg");
  bg.innerHTML = `
    <div class="modal">
      <button class="modal-close" id="modalClose">&times;</button>
      <img src="${p.image}" alt="${p.name}">
      <div class="modal-body">
        <div class="card-cat">${catName(p.category)}${p.subcategory ? " · " + p.subcategory : ""}</div>
        <h2>${p.name}</h2>
        <p class="card-desc">${p.description || ""}</p>
        <div class="card-foot">
          <div class="price">Rs.${p.price} <span>/ ${p.unit}</span></div>
          <a class="wa-btn" target="_blank" rel="noopener" href="${waLink(p)}">Enquire on WhatsApp</a>
        </div>
      </div>
    </div>
  `;
  bg.classList.add("open");
  document.getElementById("modalClose").addEventListener("click", closeModal);
  bg.addEventListener("click", (e) => { if (e.target === bg) closeModal(); });
}
function closeModal() {
  document.getElementById("modalBg").classList.remove("open");
}

function setupGlobalWhatsApp() {
  const generic = encodeURIComponent("Hi Walldecor99, I'd like to know more about your wall decor products.");
  document.querySelectorAll(".js-wa-generic").forEach(a => {
    a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${generic}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSwatches();
  renderFilters();
  renderGrid();
  setupGlobalWhatsApp();
});
