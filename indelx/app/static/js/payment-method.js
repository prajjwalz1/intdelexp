window.onload = function() {
const order_id = document.querySelector('meta[name="order_id"]').getAttribute('content');
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    console.log(order_id);
      paypal.Buttons({
        // Order is created on the server and the order id is returned
        createOrder() {
          return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
              cart: [
                {
                  sku: "11",
                  quantity: "1",
                },
              ],
              order_id: order_id
            }),
          })
          .then((response) => response.json())
          .then((order) => order.id);
        },
        // Finalize the transaction on the server after payer approval
        onApprove(data) {
        console.log(data);
          return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              order_id: order_id
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
            // Successful capture! For dev/demo purposes:
            console.log('payment succesfull');
<!--            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));-->
            const transaction = orderData.purchase_units[0].payments.captures[0];
            if (transaction.status === 'COMPLETED') {
              window.location.href = '/paymentsuccess/?order_id=' + order_id;
            } else {
              alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            }

            // When ready to go live, remove the alert and show a success message within this page. For example:
             const element = document.getElementById('paypal-button-container');
             element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  window.location.href = 'thank_you.html';
          });
        }
      }).render('#paypal-button-container');
      }