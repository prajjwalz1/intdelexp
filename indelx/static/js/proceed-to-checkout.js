 console.log('{{csrf_token}}');

    window.onload = function() {
  // Code that runs after the page has loaded

    checkout_amount=document.querySelector('.checkoutamount').textContent;
    console.log(checkout_amount);

    function checkout() {



     var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     console.log(cartItems);

  // Send AJAX request to checkout view
       $.ajax({
        url: '/validate_user/',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({cartItems: cartItems}),
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



const deliveryForm = document.getElementById("deliveryForm");
const deliveryBtn = document.getElementById("deliveryBtn");

deliveryForm.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting

  // get form values
  const firstName = document.getElementById("FullName").value;
  const country = document.getElementById("input-country").value;
  const city = document.getElementById("inputCity").value;
  const zip = document.getElementById("inputZip").value;
  const address1 = document.getElementById("inputAddress").value;
  const phone = document.getElementById("Phonenumber").value;

  // create an object to store form details
  const formDetails = {
    firstName: firstName,
    lastName: lastName,
    country: country,
    city: city,
    zip: zip,
    address1: address1,
    address2: address2,
    phone: phone
  };

  // convert the object to JSON
  const formDetailsJSON = JSON.stringify(formDetails);

  // store the JSON in local storage
  localStorage.setItem("formDetails", formDetailsJSON);

  // update the button's text content and class
  deliveryBtn.innerHTML = '<i class="fas fa-check"></i> Delivery address added!';
  deliveryBtn.classList.remove("btn-primary");
  deliveryBtn.classList.add("btn-success");
});
}