// Número de WhatsApp (Colombia +57) que recibe los pedidos.
const WHATSAPP = "573004090852";

// Para editar el catálogo, modifica esta lista.
const PRODUCTS = [
  { id: "sab-algodon-doble", name: "Juego de sábanas algodón", category: "Sábanas", desc: "Doble · 200 hilos · incluye 2 fundas.", price: 129900, look: ["#f3ece1", "#e7dccb", "stripes"] },
  { id: "sab-microfibra-queen", name: "Sábanas microfibra premium", category: "Sábanas", desc: "Queen · tacto suave, no se arrugan.", price: 109900, look: ["#c9d3cf", "#b6c2bd", "plain"] },
  { id: "sab-lino-king", name: "Juego de sábanas lino lavado", category: "Sábanas", desc: "King · frescas y transpirables.", price: 219900, look: ["#e2d3bf", "#d4c1a8", "weave"] },
  { id: "edredon-reversible", name: "Edredón reversible", category: "Cobijas", desc: "Doble · relleno hipoalergénico.", price: 189900, look: ["#b9886a", "#a7775a", "quilt"] },
  { id: "cobija-sherpa", name: "Cobija sherpa", category: "Cobijas", desc: "150 × 200 cm · extra abrigada.", price: 99900, look: ["#efe7dc", "#e2d8ca", "dots"] },
  { id: "pie-cama-tejido", name: "Pie de cama tejido", category: "Cobijas", desc: "Tejido grueso con flecos.", price: 79900, look: ["#8f9a8a", "#7f8a7a", "weave"] },
  { id: "toallas-set", name: "Set de toallas x3", category: "Toallas", desc: "Cuerpo, manos y rostro · 500 g/m².", price: 89900, look: ["#ffffff", "#ece6dc", "terry"] },
  { id: "toalla-playa", name: "Toalla de baño grande", category: "Toallas", desc: "90 × 160 cm · algodón absorbente.", price: 54900, look: ["#d7b7a3", "#c9a690", "terry"] },
  { id: "bata-bano", name: "Bata de baño", category: "Toallas", desc: "Talla única · felpa suave.", price: 119900, look: ["#e9e1d4", "#dcd1c0", "terry"] },
  { id: "cojin-lino", name: "Funda de cojín lino", category: "Decoración", desc: "45 × 45 cm · cierre invisible.", price: 34900, look: ["#cdb79c", "#bfa686", "weave"] },
  { id: "camino-mesa", name: "Camino de mesa", category: "Decoración", desc: "35 × 180 cm · bordes deshilachados.", price: 44900, look: ["#f1e9dc", "#e3d7c5", "stripes"] },
  { id: "mantel-antifluido", name: "Mantel antifluido", category: "Decoración", desc: "6 puestos · fácil de limpiar.", price: 69900, look: ["#dfe4dc", "#cfd6cb", "check"] },
];

const money = (n) => "$" + n.toLocaleString("es-CO");
const waLink = (text) => `https://wa.me/${WHATSAPP}${text ? "?text=" + encodeURIComponent(text) : ""}`;

function swatchStyle([a, b, kind]) {
  const patterns = {
    plain: `linear-gradient(160deg, ${a}, ${b})`,
    stripes: `repeating-linear-gradient(90deg, ${a} 0 22px, ${b} 22px 24px)`,
    weave: `repeating-linear-gradient(0deg, ${a} 0 3px, ${b} 3px 6px), repeating-linear-gradient(90deg, ${a} 0 3px, ${b} 3px 6px)`,
    quilt: `repeating-linear-gradient(45deg, transparent 0 28px, rgba(255,255,255,.25) 28px 30px), repeating-linear-gradient(-45deg, ${a} 0 28px, ${b} 28px 30px)`,
    dots: `radial-gradient(${b} 2px, transparent 2.5px) 0 0 / 14px 14px, ${a}`,
    terry: `radial-gradient(${b} 1.5px, transparent 2px) 0 0 / 6px 6px, ${a}`,
    check: `repeating-linear-gradient(0deg, transparent 0 20px, ${b} 20px 30px), repeating-linear-gradient(90deg, ${a} 0 20px, ${b} 20px 30px)`,
  };
  return `background:${patterns[kind] || patterns.plain}; background-blend-mode: multiply;`;
}

// ---- Catálogo ----
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
let activeCategory = "Todos";

function renderFilters() {
  const cats = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))];
  filters.innerHTML = cats
    .map((c) => `<button data-cat="${c}" class="${c === activeCategory ? "active" : ""}">${c}</button>`)
    .join("");
}

function renderGrid() {
  const list = activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
  grid.innerHTML = list
    .map(
      (p) => `
      <article class="card">
        <div class="swatch" style="${swatchStyle(p.look)}"><span class="tag">${p.category}</span></div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="card-foot">
            <span class="price">${money(p.price)}</span>
            <button class="add" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

filters.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  activeCategory = btn.dataset.cat;
  renderFilters();
  renderGrid();
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  changeQty(btn.dataset.id, 1);
  btn.textContent = "Agregado ✓";
  btn.classList.add("done");
  setTimeout(() => {
    btn.textContent = "Agregar";
    btn.classList.remove("done");
  }, 1200);
});

// ---- Pedido (guardado en el navegador) ----
let cart = JSON.parse(localStorage.getItem("cye-cart") || "{}");
const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  localStorage.setItem("cye-cart", JSON.stringify(cart));
  renderCart();
}

function cartEntries() {
  return Object.entries(cart).filter(([id]) => byId[id]).map(([id, qty]) => ({ ...byId[id], qty }));
}

function renderCart() {
  const items = cartEntries();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("sendOrder").disabled = items.length === 0;
  document.getElementById("cartItems").innerHTML = items.length
    ? items
        .map(
          (i) => `
        <li class="cart-item">
          <div class="mini" style="${swatchStyle(i.look)}"></div>
          <div><div class="name">${i.name}</div><div class="sub">${money(i.price)} c/u</div></div>
          <div class="qty">
            <button data-id="${i.id}" data-d="-1" aria-label="Quitar">−</button>
            <span>${i.qty}</span>
            <button data-id="${i.id}" data-d="1" aria-label="Agregar">+</button>
          </div>
        </li>`
        )
        .join("")
    : `<li class="empty">Aún no has agregado productos.</li>`;
}

document.getElementById("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (btn) changeQty(btn.dataset.id, Number(btn.dataset.d));
});

const drawer = document.getElementById("drawer");
const setDrawer = (open) => {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
};
document.getElementById("openCart").addEventListener("click", () => setDrawer(true));
document.getElementById("closeCart").addEventListener("click", () => setDrawer(false));
drawer.addEventListener("click", (e) => e.target === drawer && setDrawer(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && setDrawer(false));

document.getElementById("sendOrder").addEventListener("click", () => {
  const items = cartEntries();
  if (!items.length) return;
  const lines = items.map((i) => `• ${i.qty} × ${i.name} — ${money(i.qty * i.price)}`);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const text = `¡Hola Casa y Estilo! Quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}`;
  window.open(waLink(text), "_blank");
});

// ---- Init ----
const greeting = "¡Hola Casa y Estilo! Quiero información sobre sus productos.";
document.getElementById("waFloat").href = waLink(greeting);
document.getElementById("footerWa").href = waLink(greeting);
document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderGrid();
renderCart();
