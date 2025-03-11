document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
  
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        localStorage.removeItem('cart');
        displayCartItems();
        if (typeof updateCartCount === 'function') {
          updateCartCount();
        }
      });
    }
  
    const checkoutBtn = document.getElementById('checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        // Здесь можно добавить логику оформления заказа
        alert('Заказ оформлен! Спасибо за покупку.');
        localStorage.removeItem('cart');
        displayCartItems();
        if (typeof updateCartCount === 'function') {
          updateCartCount();
        }
      });
    }
  });
  
  function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Ваша корзина пуста.</p>';
      document.getElementById('total-price').textContent = 'Итого: 0 ₸';
      return;
    }
  
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-price">Цена: ${item.price} ₸</span>
          <span class="item-quantity">Кол-во: ${item.quantity}</span>
          <span class="item-total">Итого: ${itemTotal} ₸</span>
        </div>
        <button class="remove-item" data-index="${index}">Удалить</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
    document.getElementById('total-price').textContent = 'Итого: ' + total + ' ₸';
  
    // Добавляем обработчики для кнопок удаления
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = this.getAttribute('data-index');
        removeCartItem(idx);
      });
    });
  }
  
  function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  }
  