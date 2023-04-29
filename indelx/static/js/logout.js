 const logoutButton = document.getElementById('logout-button');

    // Add Click Event Listener to Logout Button
    logoutButton.addEventListener('click', function() {
      // Clear the Current Session
      fetch('/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Redirect to the Login Page
            window.location.href = '/login';
          }
        })
        .catch(error => console.log(error));
    });