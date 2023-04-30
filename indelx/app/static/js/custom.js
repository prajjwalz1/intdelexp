// Retrieve cart items from local storage
console.log("owl carosel enabled");
  $("#featured-pro-active").owlCarousel({

    items: 3, // Change this to the number of products you want to show at once
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000, // Change this to adjust the autoplay speed
    responsive: {
      // Change these breakpoints to adjust the number of products shown at different screen sizes
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

$('.add-to-cart-button').click(function(e) {
    e.preventDefault(); // prevent the default behavior of the click event
    // your code to add the item to the cart goes here
});
updatecartlength();
// Add event listener to all add to cart buttons
const addToCartButtons = document.querySelectorAll(".add-cart-button");
addToCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    // Get product details from button data attributes
    const name = event.target.getAttribute("data-name");
    const price = Number(event.target.getAttribute("data-price"));
    const image = event.target.getAttribute("data-image");
    const id=Number(event.target.getAttribute("data-product_id"));

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Check if product is already in cart
    const cartItemIndex = cartItems.findIndex(item => item.id === id);
    if (cartItemIndex === -1) {
      // Add new product to cart
      const newItem = {
        name: name,
        image: image,
        quantity: 1,
        price: price,
        id: id
      };
      cartItems.push(newItem);
//      console.log(newItem)
    } else {
      // Increase quantity of existing product in cart
      cartItems[cartItemIndex].quantity++;
//      console.log( cartItems)
    }

    // Update local storage and UI
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
       // Trigger the storage event to update the UI
    const storageEvent = new StorageEvent("storage", {
      key: "cartItems",
      newValue: JSON.stringify(cartItems)
    });
    window.dispatchEvent(storageEvent);
    console.log(cartItems)
    updatecartlength();
    updateprice();

  });
});





// Retrieve the cart information from local storage


    ///code to delete cart items when cross icon is clicked
    const cartListr = document.getElementById("cart-list");
    cartListr.addEventListener("click", event => {
      if (event.target.classList.contains("del-icone")) {
        // Get the parent li element of the delete button
        const li = event.target.closest("li");

        // Get the index of the cart item in the cartItems array
        const index = Array.from(cartListr.children).indexOf(li);
        console.log('delete button is clicked')

        // Retrieve the current cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Remove the item at the specified index from the cartItems array
        cartItems.splice(index, 1);

        // Update the cartItems array in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log(cartItems);

        // Remove the item from the UI
        li.remove();
        updatecartlength();
        updateprice();
          }
        });


const get_cartItems = JSON.parse(localStorage.getItem("cartItems"));

// Check if the cart is empty
if (get_cartItems && get_cartItems.length > 0) {
  // If the cart is not empty, loop through each item and display it in the UI
  get_cartItems.forEach((cart) => {
    // Create a new <li> element to display the cart item
    const li = document.createElement("li");
    li.classList.add("single-cart-box");

    // Add the cart item's image to the <li> element
    const cartImg = document.createElement("div");
    cartImg.classList.add("cart-img");
    const imgAnchor = document.createElement("a");
    imgAnchor.setAttribute("href", "#");
    const img = document.createElement("img");
    img.setAttribute("src", `${cart.image}`);
    img.setAttribute("alt", "cart-image");
    imgAnchor.appendChild(img);
    cartImg.appendChild(imgAnchor);
    const proQuantity = document.createElement("span");
    proQuantity.classList.add("pro-quantity");
    proQuantity.setAttribute("id", "quantity");
    proQuantity.textContent=cart.quantity;
    cartImg.appendChild(proQuantity);
    li.appendChild(cartImg);

    // Add the cart item's details to the <li> element
    const cartContent = document.createElement("div");
    cartContent.classList.add("cart-content");
    const productName = document.createElement("h6");
    const productNameAnchor = document.createElement("a");
    productNameAnchor.setAttribute("href", "product-details.html");
    productNameAnchor.textContent = cart.name;
    productName.appendChild(productNameAnchor);
    cartContent.appendChild(productName);
    const cartPrice = document.createElement("span");
    cartPrice.classList.add("cart-price");
    cartPrice.textContent = '$'+cart.price ;
    cartContent.appendChild(cartPrice);
    const cartSize = document.createElement("span");
    cartSize.textContent = `Size: ${cart.size}`;
    cartContent.appendChild(cartSize);
    const cartColor = document.createElement("span");
    cartColor.textContent = `Color: ${cart.color}`;
    cartContent.appendChild(cartColor);
    li.appendChild(cartContent);

    //creates delete icon
    const delIcone = document.createElement("a");
    delIcone.id='removeanchor';
    delIcone.classList.add("del-icone");
    const delIconeIcon = document.createElement("i");
    delIconeIcon.classList.add("fa");
    delIconeIcon.classList.add("fa-window-close");
//    delIconeIcon.style.add("color:red;")
    delIcone.appendChild(delIconeIcon);
    li.appendChild(delIcone);
    //this retrieves cart items
    const cartList = document.getElementById("cart-list");
    cartList.appendChild(li);

  });
}
const cartList = document.getElementById("cart-list");

// Add event listener to listen for changes to local storage
window.addEventListener("storage", function(event) {
  // Check if the event relates to the cart items
  if (event.key === "cartItems") {
    // Retrieve the updated cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    // Clear the contents of the cart list
    cartList.innerHTML = "";

    // Loop through the updated cart items and dynamically create new li elements
    cartItems.forEach((cart) => {
      const li = document.createElement("li");
      li.classList.add("single-cart-box");
      li.innerHTML = `
        <div class="cart-img">
          <a href="#"><img src="${cart.image}" alt="cart-image"></a>
          <span class="pro-quantity">${cart.quantity}</span>
        </div>
        <div class="cart-content">
          <h6><a href="product-details.html">${cart.name}</a></h6>
          <span class="cart-price"><span>$ </span>${cart.price}</span>
          <span>Size: ${cart.size}</span>
          <span>Color: ${cart.color}</span>
        </div>
        <a id="removeanchor" class="del-icone" ><i class="fa fa-window-close"></i></a>
      `;
      cartList.appendChild(li);
    
    });
  }
});



function updatecartlength(){
    const get_cartItemslength = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartlength=get_cartItemslength.length;
    console.log("cart length is"+ cartlength);
//sets cart length
    document.getElementById("cart-length").textContent=cartlength;
//    updateCartUI();
};

function updateprice(){
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Calculate the total price of the cart items
let totalPrice = 0;
for (const item of cartItems) {
  totalPrice += item.price * item.quantity;
}

console.log(`Total price: ${totalPrice}`);
document.getElementById("cart-total").textContent="$"+ totalPrice;
document.getElementById("sub-total").textContent="$"+ totalPrice;
}
updateprice();

