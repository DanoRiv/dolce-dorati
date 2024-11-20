async function load() {
  try {
    const response = await fetch('./assets/data.json')
    let myData = await response.json()

    const container = document.getElementById('products-data')

    const basePath = window.location.hostname === "danoriv.github.io"
      ? `/${window.location.pathname.split('/')[1]}`
      : ""; // Empty for local

  
    myData.forEach(item => {
      const productCard = document.createElement('div');
      productCard.classList.add('products--card');


      productCard.innerHTML = `
        <img src="${basePath}/${item.img}" alt="cake picture" class="product-card--picture">
        <p>${item.name}</p>
        <div class="product-card--addBtn">
          <span>${item.price}</span>
          <a href="#" data-id="${item.id}">
            <img src="${basePath}/assets/icons/add btn.svg" alt="add to cart icon">
          </a>
        </div>
      `;

      container.appendChild(productCard);
    });

    document.querySelectorAll('.product-card--addBtn a').forEach(btn=> {
      btn.addEventListener('click', addToCart);
    })
  }catch(err) {
    console.log(err)
  }
}

function addToCart(event){
  event.preventDefault();
  const productId = event.currentTarget.dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if(!cart.includes(productId)){
    cart.push(productId);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

window.onload = ()=> {
  load();
}
