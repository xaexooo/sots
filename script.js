//БУРГЕР МЕНЮ
document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.getElementById('burger');
  let menuContainer = document.createElement('div');
  menuContainer.className = 'menu-container';
  menuContainer.style.display = 'none';
  menuContainer.innerHTML = `
    <div class="menu-items">
      <a href="index.html" class="menu-item">Главная</a>
      <a href="keyboards.html" class="menu-item">Клавиатуры</a>
      <a href="mices.html" class="menu-item">Мыши</a>
      <a href="headphones.html" class="menu-item">Гарнитура</a>
      <a href="games.html" class="menu-item">Игры</a>
      <a href="cart.html" class="menu-item cart-menu-item">
        <span>Корзина</span>
        <span class="cart-count">0</span>
      </a>
    </div>
  `;
  document.querySelector('.holder').appendChild(menuContainer);
  // Обработчик клика по бургер-меню
  burgerMenu.addEventListener('click', function(event) {
    event.stopPropagation(); // предотвращаем всплытие
    if (menuContainer.style.display === 'none' || menuContainer.style.display === '') {
      animateOpen(menuContainer, 300);
      burgerMenu.classList.add('active');
      localStorage.setItem('menuOpen', 'true');
    } else {
      animateClose(menuContainer, 300, function() {
        localStorage.setItem('menuOpen', 'false');
      });
      burgerMenu.classList.remove('active');
    }
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', function(event) {
    if (!menuContainer.contains(event.target) && event.target !== burgerMenu) {
      if (menuContainer.style.display === 'flex') {
        animateClose(menuContainer, 300, function() {
          localStorage.setItem('menuOpen', 'false');
        });
        burgerMenu.classList.remove('active');
      }
    }
  });

  // Обновляем счетчик корзины при загрузке страницы
  updateCartCount();
});

// Функция для плавного открытия элемента с использованием requestAnimationFrame
function animateOpen(element, duration = 300) {
  element.style.display = 'flex';
  const startTime = performance.now();
  function animate(time) {
    let elapsed = time - startTime;
    let progress = Math.min(elapsed / duration, 1);
    element.style.opacity = progress;
    // Смещение от -20px до 0px
    let translateY = -20 + 20 * progress;
    element.style.transform = `translateY(${translateY}px)`;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

// Функция для плавного закрытия элемента с использованием requestAnimationFrame
function animateClose(element, duration = 300, callback) {
  const startTime = performance.now();
  function animate(time) {
    let elapsed = time - startTime;
    let progress = Math.min(elapsed / duration, 1);
    element.style.opacity = 1 - progress;
    // Смещение от 0px до -20px
    let translateY = 0 - 20 * progress;
    element.style.transform = `translateY(${translateY}px)`;
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
      if (callback) callback();
    }
  }
  requestAnimationFrame(animate);
}

// Глобальная функция для добавления товара в корзину
window.addToCart = function(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
};

// Глобальная функция для обновления счетчика корзины
window.updateCartCount = function() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
};
