/* ============================================================
   Cozy Threads — Product Data & Dynamic Rendering
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Blush Bloom Cardigan",
    category: "clothing",
    price: 68.0,
    oldPrice: 85.0,
    description:
      "Hand-crocheted oversized cardigan in soft blush yarn with delicate floral motifs. Perfect for layering over cozy outfits.",
    image: "image/cardigan1.png",
    rating: 5,
    reviews: 124,
    badge: "bestseller",
    colors: ["Blush Pink", "Cream", "Dusty Rose"],
    material: "100% Merino Wool",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Sage Dreams Tote Bag",
    category: "bags",
    price: 42.0,
    oldPrice: null,
    description:
      "Sturdy yet elegant hand-crocheted tote in sage green. Spacious enough for everyday essentials with a charming boho vibe.",
    image: "image/greenBag.png",
    rating: 4,
    reviews: 89,
    badge: "new",
    colors: ["Sage Green", "Natural", "Terracotta"],
    material: "Cotton Blend",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Lavender Cloud Throw",
    category: "home",
    price: 95.0,
    oldPrice: 115.0,
    description:
      "Luxuriously soft crochet throw blanket in lavender hues. Draped over a sofa or used as a cozy wrap — pure comfort.",
    image: "image/Blanket.png",
    rating: 5,
    reviews: 201,
    badge: "bestseller",
    colors: ["Lavender", "Lilac", "Soft Purple"],
    material: "Chunky Chenille",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Caramel Latte Bucket Hat",
    category: "accessories",
    price: 34.0,
    oldPrice: null,
    description:
      "Trendy crochet bucket hat in warm caramel tones. Sun-protective, breathable and totally adorable for summer days.",
    image: "image/bukethat.png",
    rating: 4,
    reviews: 67,
    badge: "new",
    colors: ["Caramel", "Warm Brown", "Tan"],
    material: "Raffia Cotton",
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    name: "Dusty Rose Crop Top",
    category: "clothing",
    price: 52.0,
    oldPrice: 65.0,
    description:
      "Delicate crochet crop top in dusty rose. Features intricate shell stitch detailing, perfect for beach days or boho looks.",
    image: "image/croptop.png",
    rating: 5,
    reviews: 156,
    badge: "bestseller",
    colors: ["Dusty Rose", "White", "Peach"],
    material: "100% Cotton",
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    name: "Cream Bohemian Wall Art",
    category: "home",
    price: 78.0,
    oldPrice: null,
    description:
      "Handcrafted macramé-crochet wall hanging in natural cream. A statement piece that adds warmth and texture to any room.",
    image: "image/wall.png",
    rating: 5,
    reviews: 93,
    badge: "new",
    colors: ["Cream", "Natural"],
    material: "Cotton Rope",
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Petal Stitch Beanie",
    category: "accessories",
    price: 28.0,
    oldPrice: null,
    description:
      "Cozy crochet beanie featuring a beautiful petal stitch pattern. Keeps you warm while looking absolutely charming.",
    image: "image/beanie.png",
    rating: 4,
    reviews: 44,
    badge: null,
    colors: ["Dusty Pink", "Cream", "Sage", "Lavender"],
    material: "Soft Acrylic Blend",
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "Boho Mini Shoulder Bag",
    category: "bags",
    price: 56.0,
    oldPrice: 70.0,
    description:
      "Chic mini shoulder bag with intricate crochet work and leather strap. The perfect festival or everyday accessory.",
    image: "image/smallBag.png",
    rating: 5,
    reviews: 178,
    badge: "bestseller",
    colors: ["Natural", "Brown", "Black"],
    material: "Jute & Leather",
    inStock: true,
    featured: true,
  },
  {
    id: 9,
    name: "Wildflower Coasters Set",
    category: "home",
    price: 22.0,
    oldPrice: null,
    description:
      "Set of 4 hand-crocheted wildflower coasters in mixed pastels. Functional art that adds a cozy touch to your table.",
    image: "image/wildflower.png",
    rating: 4,
    reviews: 55,
    badge: null,
    colors: ["Mixed Pastels"],
    material: "100% Cotton",
    inStock: true,
    featured: false,
  },
  {
    id: 10,
    name: "Sage Green Wrap Skirt",
    category: "clothing",
    price: 74.0,
    oldPrice: 90.0,
    description:
      "Flowing crochet wrap skirt in sage green. Features a beautiful open-weave pattern that lets breezes pass through.",
    image: "image/skirt.png",
    rating: 5,
    reviews: 112,
    badge: "sale",
    colors: ["Sage Green", "Olive", "Moss"],
    material: "Cotton Yarn",
    inStock: true,
    featured: false,
  },
  {
    id: 11,
    name: "Sunrise Fringe Scarf",
    category: "accessories",
    price: 38.0,
    oldPrice: null,
    description:
      "Long crochet scarf with gorgeous fringe ends in warm sunrise tones. Wrap it around for warmth or wear as a sarong.",
    image: "image/scarf.png",
    rating: 4,
    reviews: 38,
    badge: "new",
    colors: ["Terracotta", "Ochre", "Cream"],
    material: "Wool Blend",
    inStock: true,
    featured: false,
  },
  {
    id: 12,
    name: "Vintage Lace Cushion Cover",
    category: "home",
    price: 45.0,
    oldPrice: null,
    description:
      "Exquisite vintage-style crochet cushion cover with delicate lace patterns. Adds an heirloom touch to your living space.",
    image: "image/cover.png",
    rating: 5,
    reviews: 76,
    badge: "bestseller",
    colors: ["Cream", "White", "Ivory"],
    material: "Cotton Lace Yarn",
    inStock: true,
    featured: false,
  },
];

const CATEGORIES = [
  {
    id: "clothing",
    name: "Clothing",
    description: "Cardigans, tops & skirts",
    count: 3,
    icon: "fa-tshirt",
    image: "image/cardigan1.png",
    gradient: "var(--gradient-pink)",
  },
  {
    id: "bags",
    name: "Bags & Totes",
    description: "Totes, shoulder bags & clutches",
    count: 3,
    icon: "fa-shopping-bag",
    image: "image/greenBag.png",
    gradient: "var(--gradient-sage)",
  },
  {
    id: "home",
    name: "Home & Decor",
    description: "Throws, pillows & wall art",
    count: 4,
    icon: "fa-home",
    image: "image/cover.png",
    gradient: "var(--gradient-lavender)",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Hats, scarves & beanies",
    count: 3,
    icon: "fa-hat-cowboy",
    image: "image/beanie.png",
    gradient: "var(--gradient-brown)",
  },
];

/* ---- Star rating helper ---- */
function renderStars(rating, max = 5) {
  let html = "";
  for (let i = 1; i <= max; i++) {
    if (i <= rating) html += '<i class="fas fa-star"></i>';
    else if (i - 0.5 <= rating) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}

/* ---- Badge helper ---- */
function renderBadge(badge) {
  if (!badge) return "";
  const map = {
    bestseller: ["badge-bestseller", "⭐ Best Seller"],
    new: ["badge-new", "✨ New"],
    sale: ["badge-sale", "🏷️ Sale"],
  };
  const [cls, label] = map[badge] || [];
  return `<span class="badge-tag ${cls}">${label}</span>`;
}

/* ---- Build a single product card HTML ---- */
function buildProductCard(product, delay = 0) {
  const isWishlisted = getWishlist().includes(product.id);
  return `
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3 fade-up fade-up-delay-${Math.min(delay, 4)}" 
       data-category="${product.category}" data-id="${product.id}">
    <div class="product-card h-100" role="article" aria-label="${product.name}">
      <div class="product-img-wrap">
        <img src="${product.image}" 
             alt="${product.name} — handmade crochet ${product.category}" 
             class="product-img" loading="lazy">
        <div class="product-overlay" role="group" aria-label="Product actions">
          <button class="product-overlay-btn ${isWishlisted ? "wishlisted" : ""}"
                  title="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}"
                  onclick="toggleWishlist(${product.id}, this)"
                  aria-label="${isWishlisted ? "Remove from wishlist" : "Add to wishlist"}">
            <i class="${isWishlisted ? "fas" : "far"} fa-heart"></i>
          </button>
          <button class="product-overlay-btn"
                  title="Quick view"
                  onclick="openQuickView(${product.id})"
                  aria-label="Quick view ${product.name}">
            <i class="far fa-eye"></i>
          </button>
          <button class="product-overlay-btn"
                  title="Add to cart"
                  onclick="addToCartById(${product.id})"
                  aria-label="Add ${product.name} to cart">
            <i class="fas fa-shopping-bag"></i>
          </button>
        </div>
        <div class="product-badges" aria-label="Product badges">
          ${renderBadge(product.badge)}
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description.substring(0, 80)}…</p>
        <div class="product-rating" aria-label="Rating: ${product.rating} out of 5 stars">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">$${product.price.toFixed(2)}</span>
            ${product.oldPrice ? `<span class="product-price-old">$${product.oldPrice.toFixed(2)}</span>` : ""}
          </div>
          <button class="btn-add-cart" 
                  onclick="addToCartById(${product.id})"
                  aria-label="Add ${product.name} to cart">
            <i class="fas fa-plus"></i> Cart
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---- Render featured products on home page ---- */
function renderFeaturedProducts() {
  const container = document.getElementById("featuredProductsGrid");
  if (!container) return;
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  container.innerHTML = featured
    .map((p, i) => buildProductCard(p, i + 1))
    .join("");
  initScrollAnimations();
}

/* ---- Render all products on shop page with filter/search ---- */
let activeCategory = "all";
let searchQuery = "";
let sortOrder = "default";

function renderShopProducts() {
  const container = document.getElementById("shopProductsGrid");
  const countEl = document.getElementById("productCount");
  if (!container) return;

  // Skeleton loading
  container.innerHTML = Array(8)
    .fill(0)
    .map(
      () => `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div style="border-radius:16px;overflow:hidden;background:var(--bg-card);box-shadow:var(--shadow-soft);">
        <div class="skeleton" style="height:240px;"></div>
        <div style="padding:1.2rem;">
          <div class="skeleton" style="height:14px;width:60%;margin-bottom:8px;"></div>
          <div class="skeleton" style="height:18px;width:80%;margin-bottom:8px;"></div>
          <div class="skeleton" style="height:12px;width:100%;margin-bottom:6px;"></div>
          <div class="skeleton" style="height:12px;width:75%;margin-bottom:12px;"></div>
          <div class="skeleton" style="height:36px;border-radius:999px;"></div>
        </div>
      </div>
    </div>`,
    )
    .join("");

  setTimeout(() => {
    let filtered = [...PRODUCTS];

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // Sort
    if (sortOrder === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sortOrder === "rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sortOrder === "newest")
      filtered.sort((a, b) => (b.badge === "new") - (a.badge === "new"));

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="no-results">
            <i class="far fa-frown-open"></i>
            <h4 class="fw-display mb-2">No products found</h4>
            <p>Try a different search term or category filter.</p>
            <button class="btn-primary-custom mt-3" onclick="resetFilters()">
              <i class="fas fa-redo-alt"></i> Reset Filters
            </button>
          </div>
        </div>`;
      return;
    }

    container.innerHTML = filtered
      .map((p, i) => buildProductCard(p, (i % 4) + 1))
      .join("");
    initScrollAnimations();
  }, 600);
}

/* ---- Filter & search handlers ---- */
function setCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderShopProducts();
}

function setSearch(query) {
  searchQuery = query;
  renderShopProducts();
}

function setSort(order) {
  sortOrder = order;
  renderShopProducts();
}

function resetFilters() {
  activeCategory = "all";
  searchQuery = "";
  sortOrder = "default";
  const searchEl = document.getElementById("searchInput");
  const sortEl = document.getElementById("sortSelect");
  if (searchEl) searchEl.value = "";
  if (sortEl) sortEl.value = "default";
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === "all");
  });
  renderShopProducts();
}

/* ---- Quick View Modal ---- */
function openQuickView(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;

  const modal = document.getElementById("quickViewModal");
  if (!modal) return;

  modal.querySelector("#qv-img").src = p.image;
  modal.querySelector("#qv-img").alt = p.name;
  modal.querySelector("#qv-category").textContent = p.category;
  modal.querySelector("#qv-name").textContent = p.name;
  modal.querySelector("#qv-stars").innerHTML = renderStars(p.rating);
  modal.querySelector("#qv-reviews").textContent = `(${p.reviews} reviews)`;
  modal.querySelector("#qv-price").textContent = `$${p.price.toFixed(2)}`;
  modal.querySelector("#qv-old-price").textContent = p.oldPrice
    ? `$${p.oldPrice.toFixed(2)}`
    : "";
  modal.querySelector("#qv-desc").textContent = p.description;
  modal.querySelector("#qv-material").textContent = p.material;
  modal.querySelector("#qv-colors").textContent = p.colors.join(", ");
  modal.querySelector("#qv-badge").innerHTML = renderBadge(p.badge);
  modal.querySelector("#qv-add-cart").onclick = () => {
    addToCartById(id);
  };

  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

/* ---- Wishlist (localStorage) ---- */
function getWishlist() {
  return JSON.parse(localStorage.getItem("ct_wishlist") || "[]");
}
function saveWishlist(list) {
  localStorage.setItem("ct_wishlist", JSON.stringify(list));
}
function toggleWishlist(id, btn) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
    btn.classList.remove("wishlisted");
    btn.querySelector("i").className = "far fa-heart";
    btn.title = "Add to wishlist";
    showToast("Removed from wishlist", "", "info");
  } else {
    list.push(id);
    btn.classList.add("wishlisted");
    btn.querySelector("i").className = "fas fa-heart";
    btn.title = "Remove from wishlist";
    showToast("Added to wishlist", "Your item has been saved! 💕", "success");
  }
  saveWishlist(list);
}

/* ---- Render category cards (home page) ---- */
function renderCategories() {
  const container = document.getElementById("categoriesGrid");
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (cat) => `
    <div class="col-6 col-md-3 scale-in">
      <a href="products.html?category=${cat.id}" 
         class="category-card" 
         aria-label="Browse ${cat.name} — ${cat.count} products"
         onclick="sessionStorage.setItem('filterCat','${cat.id}')">
        <img src="${cat.image}" 
             alt="${cat.name} crochet category" 
             class="category-card-img" loading="lazy">
        <div class="category-card-overlay"></div>
        <div class="category-card-inner">
          <div class="category-card-content">
            <div class="category-card-icon">
              <i class="fas ${cat.icon}"></i>
            </div>
            <div class="category-card-title">${cat.name}</div>
            <div class="category-card-count">${cat.count} handmade pieces</div>
          </div>
        </div>
      </a>
    </div>`,
  ).join("");
  initScrollAnimations();
}

/* ---- Init scroll-based animations ---- */
function initScrollAnimations() {
  const els = document.querySelectorAll(
    ".fade-up:not(.visible), .scale-in:not(.visible)",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach((el) => observer.observe(el));
}
