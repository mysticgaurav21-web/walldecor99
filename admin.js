// ===== Walldecor99 Admin =====
// NOTE: this is a simple client-side gate meant to keep casual visitors out
// of the admin screen — it is not bank-grade security. Don't reuse this
// password anywhere sensitive.
const ADMIN_EMAIL = "mysticgaurav@gmail.com";
const ADMIN_PASSWORD = "1122334455";

const CATEGORIES = window.CATEGORIES || [];

function getWorkingProducts() {
  try {
    const saved = localStorage.getItem("wd99_products");
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(window.PRODUCTS || []));
}
function saveWorkingProducts(list) {
  localStorage.setItem("wd99_products", JSON.stringify(list));
}

let PRODUCTS = [];
let editingId = null;

// ---------- Login ----------
function checkLogin() {
  return sessionStorage.getItem("wd99_admin") === "yes";
}
function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value;
  const err = document.getElementById("loginError");
  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("wd99_admin", "yes");
    showDashboard();
  } else {
    err.textContent = "Incorrect email or password.";
  }
}
function doLogout() {
  sessionStorage.removeItem("wd99_admin");
  location.reload();
}

function showDashboard() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  PRODUCTS = getWorkingProducts();
  populateCategorySelect();
  renderTable();
}

// ---------- Table ----------
function catName(slug) {
  const c = CATEGORIES.find(c => c.slug === slug);
  return c ? c.name : slug;
}

function renderTable() {
  const tbody = document.getElementById("productTable");
  if (!PRODUCTS.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-note">No products yet. Add your first one above.</td></tr>`;
    return;
  }
  tbody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td><img src="${p.image}" alt="" style="width:52px;height:40px;object-fit:cover;border-radius:2px;"></td>
      <td>
        <strong>${p.name}</strong><br>
        <span class="muted">${catName(p.category)}${p.subcategory ? " · " + p.subcategory : ""}</span>
      </td>
      <td>Rs.${p.price}/${p.unit}</td>
      <td>${p.tag || "—"}</td>
      <td class="row-actions">
        <button class="mini-btn" data-edit="${p.id}">Edit</button>
        <button class="mini-btn danger" data-del="${p.id}">Delete</button>
      </td>
    </tr>
  `).join("");
  tbody.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => editProduct(b.dataset.edit)));
  tbody.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => deleteProduct(b.dataset.del)));
}

// ---------- Form ----------
function populateCategorySelect() {
  const sel = document.getElementById("f_category");
  sel.innerHTML = CATEGORIES.map(c => `<option value="${c.slug}">${c.name}</option>`).join("");
  updateSubDatalist();
  sel.addEventListener("change", updateSubDatalist);
}
function updateSubDatalist() {
  const cat = CATEGORIES.find(c => c.slug === document.getElementById("f_category").value);
  const dl = document.getElementById("subOptions");
  dl.innerHTML = (cat ? cat.subcategories : []).map(s => `<option value="${s}">`).join("");
}

function resetForm() {
  editingId = null;
  document.getElementById("productForm").reset();
  document.getElementById("formTitle").textContent = "Add Product";
  document.getElementById("submitBtn").textContent = "Add Product";
  updateSubDatalist();
}

function editProduct(id) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById("f_name").value = p.name;
  document.getElementById("f_category").value = p.category;
  updateSubDatalist();
  document.getElementById("f_subcategory").value = p.subcategory || "";
  document.getElementById("f_price").value = p.price;
  document.getElementById("f_unit").value = p.unit;
  document.getElementById("f_image").value = p.image;
  document.getElementById("f_tag").value = p.tag || "";
  document.getElementById("f_description").value = p.description || "";
  document.getElementById("formTitle").textContent = "Edit Product";
  document.getElementById("submitBtn").textContent = "Save Changes";
  window.scrollTo({ top: document.getElementById("productForm").offsetTop - 20, behavior: "smooth" });
}

function deleteProduct(id) {
  if (!confirm("Delete this product? This only affects your preview until you export & re-upload.")) return;
  PRODUCTS = PRODUCTS.filter(p => p.id !== id);
  saveWorkingProducts(PRODUCTS);
  renderTable();
}

function submitForm(e) {
  e.preventDefault();
  const data = {
    id: editingId || ("p" + Date.now()),
    name: document.getElementById("f_name").value.trim(),
    category: document.getElementById("f_category").value,
    subcategory: document.getElementById("f_subcategory").value.trim(),
    price: Number(document.getElementById("f_price").value) || 0,
    unit: document.getElementById("f_unit").value.trim() || "sq.ft",
    image: document.getElementById("f_image").value.trim() || "https://picsum.photos/seed/" + Date.now() + "/600/450",
    tag: document.getElementById("f_tag").value.trim(),
    description: document.getElementById("f_description").value.trim()
  };
  if (!data.name) return;

  if (editingId) {
    const idx = PRODUCTS.findIndex(p => p.id === editingId);
    PRODUCTS[idx] = data;
  } else {
    PRODUCTS.push(data);
  }
  saveWorkingProducts(PRODUCTS);
  renderTable();
  resetForm();
  flashSaved();
}

function flashSaved() {
  const el = document.getElementById("saveNote");
  el.style.opacity = "1";
  setTimeout(() => { el.style.opacity = "0"; }, 2200);
}

// ---------- Export / Import / Reset ----------
function exportProducts() {
  const catBlock = `window.CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\n\n`;
  const prodBlock = `window.PRODUCTS = ${JSON.stringify(PRODUCTS, null, 2)};\n`;
  const content = `// Walldecor99 — Product & Category data (exported from Admin Panel)\n\n${catBlock}${prodBlock}`;
  const blob = new Blob([content], { type: "text/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "products.js";
  a.click();
}

function importProducts(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = reader.result;
      const match = text.match(/window\.PRODUCTS\s*=\s*(\[[\s\S]*?\]);/);
      if (!match) throw new Error("Couldn't find PRODUCTS in file");
      const parsed = JSON.parse(match[1]);
      PRODUCTS = parsed;
      saveWorkingProducts(PRODUCTS);
      renderTable();
      alert("Products imported into this browser's preview.");
    } catch (err) {
      alert("Couldn't read that file. Please upload a products.js exported from this admin panel.");
    }
  };
  reader.readAsText(file);
}

function resetToDefault() {
  if (!confirm("Discard preview changes and reload the original products.js?")) return;
  localStorage.removeItem("wd99_products");
  PRODUCTS = JSON.parse(JSON.stringify(window.PRODUCTS || []));
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", doLogin);
  document.getElementById("logoutBtn").addEventListener("click", doLogout);
  document.getElementById("productForm").addEventListener("submit", submitForm);
  document.getElementById("cancelEdit").addEventListener("click", resetForm);
  document.getElementById("exportBtn").addEventListener("click", exportProducts);
  document.getElementById("resetBtn").addEventListener("click", resetToDefault);
  document.getElementById("importFile").addEventListener("change", (e) => {
    if (e.target.files[0]) importProducts(e.target.files[0]);
  });

  if (checkLogin()) showDashboard();
});
