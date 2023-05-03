
//const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.onload {
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
            'X-CSRFToken': csrfToken
        },
          success: function(response) {
            if (response.authenticated) {
              window.location.href = '/place_order';
            } else {
                window.location.href = '/login';
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {

          }
          });
    }
    }