$(document).ready(function() {
    // listen for form submit event
    $('form').on('submit', function(event) {

        // prevent default form submission
        event.preventDefault();
        var csrftoken = getCookie('csrftoken');

        // retrieve user input values
        var socialTitle = $('input[name="id_gender"]:checked').val();
        var firstName = $('#f-name').val();
        var lastName = $('#l-name').val();
        var email = $('#email').val();
        var password = $('#inputPassword').val();
        var birthdate = $('#birth').val();
        var address1 = $('#address1').val();
        var phone =$('#phone').val();

        // create data object to send in POST request
        var data = {
            social_title: socialTitle,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthdate: birthdate,
            address1: address1,
            phone: phone
        };
        console.log(data);

        // send AJAX POST request
        $.ajax({
            url: '',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
                            },
            data: data,
            success: function(response) {
                // handle success response
                console.log(response);
            },
            error: function(xhr, status, error) {
                // handle error response
                console.log(xhr.responseText);
            }
        });
    });
});
