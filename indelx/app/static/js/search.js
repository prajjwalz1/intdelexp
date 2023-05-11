$(document).ready(function() {
    $('#search_buton').click(function() {
      // Get the search term from the input field
      var searchTerm = $('#search_field').val();

      // Send an AJAX request to your Django view
      $.ajax({
        url: '/product_search/',
        data: {
          'search_term': searchTerm
        },
      });
    });
  });
