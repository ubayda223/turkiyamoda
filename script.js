const products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Турецкая рубашка",
    category: "Одежда",
    price: 150,
    image: "https://via.placeholder.com/200x160?text=Рубашка",
  },
  {
    name: "Смарт-часы",
    category: "Техника",
    price: 320,
    image: "https://via.placeholder.com/200x160?text=Часы",
  }
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>💵 ${p.price} сомони</p>
      <button onclick="order(${i})">📲 Заказать</button>
    `;
    list.appendChild(card);
  });
}

function order(i) {
  const product = products[i];
  const msg = `Здравствуйте! Я хочу заказать: ${product.name} (${product.price} сомони)`;
  const telegram = `https://t.me/Ubayda_1507?text=${encodeURIComponent(msg)}`;
  const whatsapp = `https://wa.me/992905746633?text=${encodeURIComponent(msg)}`;
  window.open(confirm("Оформить заказ через Telegram?") ? telegram : whatsapp, "_blank");
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

document.getElementById("adminToggle").onclick = () => {
  const pass = prompt("Введите пароль админа:");
  if (pass === "admin123") {
    document.getElementById("admin-panel").style.display = "block";
  } else {
    alert("Неверный пароль!");
  }
};

document.getElementById("product-form").onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  products.push({ name, category, price, image });
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  e.target.reset();
};

(function init() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  renderProducts();
})();
