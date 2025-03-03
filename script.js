// Create a new file named script.js with this content

document.addEventListener('DOMContentLoaded', function() {
  // Get the burger menu element
  const burgerMenu = document.getElementById('burger');
  
  // Create a menu container that will be shown/hidden
  let menuContainer = document.createElement('div');
  menuContainer.className = 'menu-container';
  menuContainer.style.display = 'none';
  
  // Add menu items to the container
  menuContainer.innerHTML = `
    <div class="menu-items">
      <a href="index.html">Главная</a>
      <a href="/sots/keyboards/keyboards.html">Клавиатуры</a>
      <a href="/sots/mices/mices.html">Мыши</a>
      <a href="/sots/headphones/headphones.html">Гарнитура</a>
      <a href="/sots/games/games.html">Игры</a>
      <a href="cart.html">Корзина</a>
    </div>
  `;
  
  // Append the menu container to the body
  document.querySelector('.holder').appendChild(menuContainer);
  
  // Toggle menu when burger is clicked
  burgerMenu.addEventListener('click', function() {
    // Toggle menu visibility
    if (menuContainer.style.display === 'none') {
      menuContainer.style.display = 'flex';
      // Add animation class to burger
      burgerMenu.classList.add('active');
    } else {
      menuContainer.style.display = 'none';
      // Remove animation class from burger
      burgerMenu.classList.remove('active');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!menuContainer.contains(event.target) && event.target !== burgerMenu) {
      menuContainer.style.display = 'none';
      burgerMenu.classList.remove('active');
    }
  });
})
