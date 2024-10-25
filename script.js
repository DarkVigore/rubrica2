const API_URL = 'https://fakestoreapi.com/products';
const productContainer = document.getElementById('productContainer');
const productFilter = document.getElementById('productFilter');

// Variable para almacenar los productos cargados
let allProducts = [];

// Función para cargar solo los primeros 15 productos desde la API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    allProducts = products.slice(0, 15); // Limitar a los primeros 15 productos
    renderProducts(allProducts);
    loadFilterOptions(allProducts);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

// Función para renderizar productos en el contenedor
function renderProducts(products) {
  productContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="card-img">
      <h3>${product.title}</h3>
      <p>Precio: $${product.price}</p>
    `;
    productContainer.appendChild(card);
  });
}

// Función para cargar las opciones en el filtro
function loadFilterOptions(products) {
  productFilter.innerHTML = '<option value="all">Todos los productos</option>'; // Opción predeterminada
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.title;
    productFilter.appendChild(option);
  });
}

// Evento para filtrar productos
productFilter.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  let filteredProducts = allProducts;

  if (selectedValue !== 'all') {
    filteredProducts = allProducts.filter(product => product.id == selectedValue);
  }

  renderProducts(filteredProducts);
});

// Cargar productos al iniciar
fetchProducts();

// Control de menú en móviles
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});
