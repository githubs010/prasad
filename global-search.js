document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  if (!header) return;

  // Avoid duplicate insertion
  if (document.getElementById('global-search-container')) return;

  // Create container for search input and suggestions
  const container = document.createElement('div');
  container.id = 'global-search-container';
  container.style.cssText = 'flex:1; max-width:500px; margin-left:1rem; position:relative;';
  container.innerHTML = `
    <input
      type="text"
      id="global-search-input"
      placeholder="Search modules..."
      autocomplete="off"
      style="padding:0.5rem 1rem; width:100%; border-radius:10px; border:1px solid var(--blue); font-size:1rem;"
    />
    <div id="global-search-suggestions" style="
      position:absolute; top:100%; left:0; right:0; background:var(--card-bg-light);
      border:1px solid var(--blue); border-top:none; max-height:200px;
      overflow-y:auto; z-index:1000; display:none; border-radius:0 0 10px 10px;"></div>
  `;

  const headerActions = header.querySelector('.header-actions');
  header.insertBefore(container, headerActions);

  // Modules/pages list for search
  const modules = [
    { name: 'Home', url: 'index.html' },
    { name: 'Business Profile', url: 'register.html' },
    { name: 'Invoice', url: 'sales.html' },
    { name: 'Stock In/Out', url: 'purchase.html' },
    { name: 'Stock Update', url: 'products.html' },
    { name: 'Products', url: 'products.html' },
    { name: 'Product List', url: 'products-list.html' },
    { name: 'Sales', url: 'sales.html' },
    { name: 'Purchase', url: 'purchase.html' },
    { name: 'Load Customers', url: 'customers.html' },
    { name: 'Suppliers', url: 'suppliers.html' },
    { name: 'Report Generate', url: 'reports.html' },
    { name: 'MIS Report', url: 'reports.html' },
    { name: 'Settings', url: 'settings.html' },
    { name: 'User Management', url: 'users.html' }
  ];

  const searchInput = document.getElementById('global-search-input');
  const suggestionsBox = document.getElementById('global-search-suggestions');
  let selectedIndex = -1;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = '';
    selectedIndex = -1;

    if (!query) {
      suggestionsBox.style.display = 'none';
      return;
    }

    const filtered = modules.filter(m => m.name.toLowerCase().includes(query));
    if (filtered.length === 0) {
      suggestionsBox.style.display = 'none';
      return;
    }

    filtered.forEach((mod, i) => {
      const div = document.createElement('div');
      div.textContent = mod.name;
      div.dataset.url = mod.url;
      div.style.padding = '0.5rem 1rem';
      div.style.cursor = 'pointer';
      if (i === 0) {
        div.classList.add('selected');
        div.style.background = 'var(--blue)';
        div.style.color = '#fff';
        selectedIndex = 0;
      }
      div.addEventListener('click', () => {
        window.location.href = mod.url;
      });
      suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = 'block';
  });

  searchInput.addEventListener('keydown', e => {
    const items = suggestionsBox.querySelectorAll('div');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < items.length - 1) {
        items[selectedIndex].classList.remove('selected');
        items[selectedIndex].style.background = '';
        items[selectedIndex].style.color = '';
        selectedIndex++;
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].style.background = 'var(--blue)';
        items[selectedIndex].style.color = '#fff';
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        items[selectedIndex].classList.remove('selected');
        items[selectedIndex].style.background = '';
        items[selectedIndex].style.color = '';
        selectedIndex--;
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].style.background = 'var(--blue)';
        items[selectedIndex].style.color = '#fff';
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        window.location.href = items[selectedIndex].dataset.url;
      }
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      suggestionsBox.style.display = 'none';
    }, 150);
  });
});
