window.onload = function() {

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartList = document.getElementById("cart-list-detail");
const totalPrice = document.getElementById("total-price");
const subtotals = document.getElementById("sub-price");


//console.log(csrf_token);
// Function to calculate the total price and update the UI
updateTotalPrice();
function updateTotalPrice() {
  let total = 0;
  cartItems.forEach((item) => {
    const subtotal = item.quantity * item.price;
    total += subtotal;
  });
  totalPrice.textContent = `$ ${total}`;
  subtotals.textContent = `$ ${total}`;
}
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
    <td class="product-subtotal" id="subtotal_${item.id}">Npr.${item.quantity * item.price}</td>
    <td class="product-remove"><a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></td>
  `;

  // Add the cart item to the cart list
  cartList.appendChild(tr);

  // Get the quantity input, decrement button, and increment button for the current cart item
  const quantityInput = tr.querySelector(".item-quantity");
  const decrementButton = tr.querySelector(".decrement-quantity-button");
  const incrementButton = tr.querySelector(".increment-quantity-button");
  const removeButton = tr.querySelector(".product-remove a");

  // Calculate and update the subtotal for the current cart item
  const updateSubtotal = () => {
    const subtotal = item.quantity * item.price;
    const subtotalElement = document.getElementById(`subtotal_${item.id}`);
    subtotalElement.innerText = `Npr.${subtotal}`;
  };
  updateSubtotal();

  // Add event listeners to the decrement and increment buttons
  decrementButton.addEventListener("click", () => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      quantityInput.value = item.quantity;
      updateCartItemInLocalStorage(item.id, item.quantity);
      updateSubtotal();
      updateTotalPrice();
    }
  });

  incrementButton.addEventListener("click", () => {
    item.quantity += 1;
    quantityInput.value = item.quantity;
    updateCartItemInLocalStorage(item.id, item.quantity);
    updateSubtotal();
    updateTotalPrice();
  });
  removeButton.addEventListener("click", () => {
    // Remove the item from the cartItems array and from local storage
    cartItems.splice(cartItems.indexOf(item), 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Remove the row from the HTML table
    tr.remove();

    // Recalculate the total price and update the HTML
    updateTotalPrice();

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
function checkout() {



     var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     console.log(cartItems);

  // Send AJAX request to checkout view
       $.ajax({
        url: '/validate_user/',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({cartItems: cartItems,checkout_amount:checkout_amount}),
        headers: {
            'X-CSRFToken': '{{csrf_token}}'
        },

    //    noo need because all $ajax request will send csrf token to its header by our code at top

          success: function(response) {
            if (response.authenticated) {
              window.location.href = '/place_order';
            } else {
              // Handle unauthenticated user
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // Handle error
          }
          });
        }

// Function to increment the quantity
function incrementQuantity() {
    var quantity = parseInt($("#item-quantity").val());
    $("#item-quantity").val(quantity + 1);
}

// Function to decrement the quantity
function decrementQuantity() {
    var quantity = parseInt($("#item-quantity").val());
    if (quantity > 1) {
        $("#item-quantity").val(quantity - 1);
    }
}

}

}
