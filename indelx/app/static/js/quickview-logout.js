
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


 $(document).ready(function() {
    $('.btn_quick-view').click(function(e) {
      e.preventDefault();
      var product_id = $(this).data('button_product_id');
      console.log("Button with product id " + product_id + " was clicked");
      $.ajax({
        url: '/quickview/' + product_id,
        type: 'GET',
        dataType: 'json',
        headers: {
        'X-CSRFToken': csrfToken
            },
        success: function(data) {
           console.log(data)
          $('.modal-title').text(data.name);
          $('.modal-description').text(data.description);
          $('.modal-prev-price').text(data.selling_price);
          $('.modal-new-price').text(data.discounted_price);
          $('#quick_view_image').attr('src', data.image);
          $('.modal-body');

          console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        }
      });
    });







    // Add Click Event Listener to Logout Button


function addLogoutListener() {

  const logoutButton = document.getElementById('logout-button');

  // Check if Logout Button Exists
  if (logoutButton) {
    console.log('found ' + logoutButton.id);
    // Add Click Event Listener to Logout Button
    logoutButton.addEventListener('click', function() {
      console.log('logout button clicked');


//      const csrftoken = getCookie('csrftoken');
      // Clear the Current Session
          fetch('/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken

            },

          })
          .then(response => response.json())
              .then(data => {
                if (data.status === 'success') {
                  window.location.href = data.redirect;
                }
              })






    });
  } else {
    console.log('Logout button not found.');
  }
}

// Call the function to add the click event listener to the logout button

addLogoutListener();




});

