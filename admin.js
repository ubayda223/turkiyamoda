const STORAGE_KEY = 'turkiyaModeProducts';

const addProductForm = document.getElementById('addProductForm');
const clearBtn = document.getElementById('clearProducts');

let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Сохранить товары в localStorage
function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Добавить товар из формы
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const price = document.getElementById('price').value.trim();
  const image = document.getElementById('image').value.trim();

  if (!title || !price || !image) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  // Добавляем новый товар
  products.push({ title, price, image });
  saveProducts();

  alert(`Товар "${title}" добавлен!`);

  addProductForm.reset();
});

// Очистить все товары
clearBtn.addEventListener('click', () => {
  if (confirm('Вы точно хотите удалить все товары? Это действие необратимо.')) {
    products = [];
    saveProducts();
    alert('Все товары удалены.');
  }
});
