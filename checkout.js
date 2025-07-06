const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const ul = document.getElementById("cart-items");
let total = 0;

cart.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} - ${item.price} DZD`;
  ul.appendChild(li);
  total += Number(item.price);
});

document.getElementById("total-price").textContent = `Total: ${total.toFixed(2)} DZD`;
