const checkout_amount = document.querySelector('.checkoutamount').textContent;
console.log(checkout_amount);

function checkout(event) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  console.log(cartItems);

  // Send AJAX request to checkout view
  $.ajax({
    url: '/validate_user/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({cartItems}),
    headers: {
      'X-CSRFToken': csrfToken
    },
    success: function(response) {
      if (response.authenticated) {
        window.location.href = '/place_order';
      } else {
        window.location.href = '/login';
      }
    }
  });
  return false;
}

window.addEventListener("load", function(){
  // Code that runs after the page has loaded
});
