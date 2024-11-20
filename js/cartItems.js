async function loadCartItems() {
  const response = await fetch('./assets/data.json')
  const myData = await response.json()
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const cartItemsContainer = document.getElementById('cart-items')

  if(cart.length === 0) {
    const emptyCart = document.createElement('div')
    emptyCart.classList.add('cart-empty')
    emptyCart.innerHTML = `<h4>No hay productos en el carrito</h4>`
    cartItemsContainer.appendChild(emptyCart)
  }

  cart.forEach((productId) => {
    const item = myData.find((product) => product.id === productId)

    if (item) {
      const cartItem = document.createElement('div')
      cartItem.classList.add('cart-item')

      cartItem.innerHTML = `
      <div class="cart-item__details">
        <img src="${item.img}" alt="product picture" class="cart-item__img">
        <p class="cart-item__name">${item.name}</p>
      </div>
      <span class="cart-item__price">${item.price}</span>
      <div class="cart-item__controls">
        <div class="cart-item__quantity-selector">
          <a href="#" class="cart-item__button cart-item__button--decrease">-</a><span>1</span><a href="#" class="cart-item__button cart-item__button--increase">+</a>
        </div>
        <span class="cart-item__total-price">${item.price}</span>
      </div>
      <button class="button cart-item__delete-button" data-id=${item.id}><img src="assets/icons/off_outline_close.svg" alt=""> Eliminar</button>
      `

      cartItemsContainer.appendChild(cartItem)
    }
  })

  document.querySelectorAll('.cart-item__button--decrease').forEach((btn) => {
    btn.addEventListener('click', decreaseQuantity)
  })
  document.querySelectorAll('.cart-item__button--increase').forEach((btn) => {
    btn.addEventListener('click', increaseQuantity)
  })
  document.querySelectorAll('.cart-item__delete-button').forEach((btn) => {
    btn.addEventListener('click', deleteItem)
  })
}

function increaseQuantity(event) {
  event.preventDefault()
  const quantityElement = event.currentTarget.closest('.cart-item')

  let quantity = parseInt(
    quantityElement.querySelector('.cart-item__quantity-selector span')
      .textContent
  )
  quantity += 1

  quantityElement.querySelector(
    '.cart-item__quantity-selector span'
  ).textContent = quantity

  updateTotalPrice(event.currentTarget.closest('.cart-item'), quantity)
}

function decreaseQuantity(event) {
  event.preventDefault()
  const quantityElement = event.currentTarget.closest('.cart-item')

  let quantity = parseInt(
    quantityElement.querySelector('.cart-item__quantity-selector span')
      .textContent
  )
  if (quantity > 1) {
    quantity -= 1
    quantityElement.querySelector(
      '.cart-item__quantity-selector span'
    ).textContent = quantity
    updateTotalPrice(event.currentTarget.closest('.cart-item'), quantity)
  }
}

function updateTotalPrice(cartItemElement, quantity) {
  const priceElement = cartItemElement.querySelector('.cart-item__price')
  const totalPriceElement = cartItemElement.querySelector(
    '.cart-item__total-price'
  )
  const price = parseFloat(
    priceElement.textContent.replace('$', '').replace('.', '')
  )
  totalPriceElement.textContent = `$${(price * quantity).toLocaleString()}`
}

function deleteItem(event) {
  event.preventDefault()
  const productId = event.currentTarget.dataset.id
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log(cart)
  const updatedCart = cart.filter(cartItem =>
    cartItem !== productId)
  console.log(updatedCart)

  localStorage.setItem('cart', JSON.stringify(updatedCart));

  location.reload();
}

window.onload = loadCartItems
