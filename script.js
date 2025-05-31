// Ключи для localStorage
const STORAGE_KEY = 'turkiyaModeProducts';
const THEME_KEY = 'turkiyaModeTheme';

const productListEl = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('themeToggle');

let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Отобразить товары (с фильтрацией по поиску)
function renderProducts(filter = '') {
  productListEl.innerHTML = '';

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    productListEl.innerHTML = `<p>Товаров не найдено 😞</p>`;
    return;
  }

  filtered.forEach(({title, price, image}) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${image}" alt="${title}" />
      <h3>${title}</h3>
      <p>${price} TJS</p>
      <button onclick="orderProduct('${title}')">Заказать</button>
    `;
    productListEl.appendChild(card);
  });
}

// Функция оформления заказа в Telegram и WhatsApp
function orderProduct(title) {
  const telegramUsername = 'Ubayda_1507';
  const whatsappNumber = '+992905746633';

  const message = encodeURIComponent(`Здравствуйте! Я хочу заказать товар: "${title}"`);

  const telegramLink = `https://t.me/${telegramUsername}?text=${message}`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;

  // Показываем пользователю выбор платформы заказа
  if (confirm('Вы хотите заказать через Telegram? Нажмите "Отмена" для WhatsApp.')) {
    window.open(telegramLink, '_blank');
  } else {
    window.open(whatsappLink, '_blank');
  }
}

// Поиск по товарам в реальном времени
searchInput.addEventListener('input', () => {
  renderProducts(searchInput.value);
});

// Переключение темы
function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Инициализация
loadTheme();
renderProducts();
