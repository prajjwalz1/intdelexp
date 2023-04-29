const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log(cartItems);
const cartList = document.getElementById("cart-list");
console.log(cartList);


// Get the cart list element



// Loop through each cart item and create its HTML representation
cartItems.forEach((item) => {
  // Create the HTML elements for the cart item
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td class="product-thumbnail"><img src="../${item.image}" alt="cart-image"/></td>
    <td class="product-name"><a href="product-details.html" id="${item.id}">${item.name} </a></td>
    <td class="product-price" value="${item.price}"><span class="amount">Npr.${item.price}</span></td>
    <td class="product-quantity">
      <div class="quantity-input">
        <button class="decrement-quantity-button">-</button>
        <input type="text" class="item-quantity" value="${item.quantity}">
        <button class="increment-quantity-button">+</button>
      </div>
    </td>
    <td class="product-subtotal">Npr.${item.quantity * item.price}</td>
    <td class="product-remove"><a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></td>
  `;

  // Add the cart item to the cart list
  cartList.appendChild(tr);

  // Get the quantity input, decrement button, and increment button for the current cart item
  const quantityInput = tr.querySelector(".item-quantity");
  const decrementButton = tr.querySelector(".decrement-quantity-button");
  const incrementButton = tr.querySelector(".increment-quantity-button");

  // Add event listeners to the decrement and increment buttons
  decrementButton.addEventListener("click", () => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      quantityInput.value = item.quantity;
      updateCartItemInLocalStorage(item.id, item.quantity);
    }
  });

  incrementButton.addEventListener("click", () => {
    item.quantity += 1;
    quantityInput.value = item.quantity;
    updateCartItemInLocalStorage(item.id, item.quantity);
  });
});

// Function to update a cart item's quantity in local storage
function updateCartItemInLocalStorage(itemId, quantity) {
  // Get the cart object from local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Find the cart item with the matching ID and update its quantity
  const item = cartItems.find((item) => item.id === itemId);
  item.quantity = quantity;

  // Save the updated cart object back to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
