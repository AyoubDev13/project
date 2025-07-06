  const products = [
    { id: 1, img: "shopproduct/5.png", title: "Nike Sport", sizes: ["38", "40", "42"], price: 300 },
    { id: 2, img: "shopproduct/1.png", title: "Nike Air Force 1", sizes: ["38", "40", "42"], price: 300 },
    { id: 3, img: "shopproduct/2.png", title: "Nike Air Jordan 1", sizes: ["38", "40", "42"], price: 300 }
  ];

  const container = document.getElementById("productContainer");

  function renderProducts(list = products) {
    container.innerHTML = "";
    list.forEach(product => {
      const sizeSpans = product.sizes.map(size => `<span>${size}</span>`).join("");
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="imgBx">
          <img src="${product.img}" alt="${product.title}">
        </div>
        <div class="contentBx">
          <h2>${product.title}</h2>
          <div class="size"><h3>Size:</h3>${sizeSpans}</div>
          <div class="color"><h3>Color:</h3><span></span><span></span><span></span></div>
          <h1 style="color: white; margin-top:5px; font-size: 20px">${product.price} DA</h1>
          <button class="add-to-cart" onclick="addToCart(${product.id})">إضافة إلى السلة 🛒</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function filterProducts() {
    const type = document.getElementById("typeFilter").value;
    const size = document.getElementById("sizeFilter").value;

    const filtered = products.filter(p => {
      const matchType = type === "all" || (type === "shoes" && p.sizes);
      const matchSize = size === "all" || p.sizes.includes(size);
      return matchType && matchSize;
    });

    renderProducts(filtered);
  }

  function ToggleEvent() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  document.addEventListener("click", function (e) {
    const toggleBtns = document.querySelectorAll(".dropdown-togg");
    const menu = document.getElementById("dropdownMenu");
    if (![...toggleBtns].some(btn => btn.contains(e.target)) && !menu.contains(e.target)) {
      menu.style.display = "none";
    }
  });

  const iconCart = document.querySelector(".iconCart");
  const cart = document.querySelector(".cartshop");
  const closeBtn = document.querySelector(".close");
  const nav = document.querySelector(".nav1");

  iconCart.addEventListener("click", () => {
    cart.style.right = cart.style.right === "0px" ? "-100%" : "0";
    nav.style.transform = cart.style.right === "0px" ? "translateX(-400px)" : "translateX(0)";
  });

  closeBtn.addEventListener("click", () => {
    cart.style.right = "-100%";
    nav.style.transform = "translateX(0)";
  });

  const cartItems = JSON.parse(localStorage.getItem("listCart")) || [];

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cartItems.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.title,       // ← تعديل الاسم
        image: product.img,        // ← تعديل الصورة
        price: product.price,
        quantity: 1
      });
    }
    updateCartDisplay();
    localStorage.setItem("listCart", JSON.stringify(cartItems));
  }

  function removeFromCart(id) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index > -1) {
      cartItems.splice(index, 1);
    }
    updateCartDisplay();
    localStorage.setItem("listCart", JSON.stringify(cartItems));
  }

  function updateCartDisplay() {
    const listCart = document.querySelector(".listCart");
    const totalQty = document.querySelector(".totalQuantity");
    listCart.innerHTML = "";

    cartItems.forEach(item => {
      listCart.innerHTML += `
        <div class="item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${item.price} DA</p>
            <p>Qty: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" style="background:red;color:white;border:none;padding:2px 16px;margin-top:5px;cursor:pointer; margin-left:150px; font-size:16px;">🗑 Del</button>
          </div>
        </div>
      `;
    });

    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    totalQty.textContent = total;
  }

  // Initial Load
  renderProducts();
  updateCartDisplay();
  function removeFromCart(id) {
  const index = cartItems.findIndex(item => item.id === id);
  if (index !== -1) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1; // إنقاص الكمية
    } else {
      cartItems.splice(index, 1); // حذف المنتج كليًا إذا كانت الكمية = 1
    }
    localStorage.setItem("listCart", JSON.stringify(cartItems));
    updateCartDisplay();
  }
}