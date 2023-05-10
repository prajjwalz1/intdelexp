from django.shortcuts import render,redirect
from django.http import JsonResponse,HttpResponse
from.models import slide,featbanner,product_model,CartItem,Customer,Order,OrderItem,PendingOrder,product_category
from.serializers import productserializer
from rest_framework.renderers import JSONRenderer

from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.db.models import Sum
import requests
from django.contrib import messages
from .models import MyUser
import json
from django.urls import reverse

from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_POST
# Create your views here.
def get_token(request):
    csrf_token = request.META.get("CSRF_COOKIE", None)
    return csrf_token


@ensure_csrf_cookie
def home(request):
    # cart_product = cart_model.objects.get(session_key=request.session.session_key)
    # cart_product.quantity += 1
    # cart_product.save()
    # context = {"csrf_token": get_token(request)}
    # cart = CartItem.objects.filter(session_id=request.session.session_key)
    login_message = messages.get_messages(request)
    user_email = request.session.get('user_email')


    # cart_items = cart.objects.all()
    slides=slide.objects.all()
    featbanners=featbanner.objects.all()
    productdetails = product_model.objects.all()
    category=product_category.objects.all()
    return render(request, 'index.html', {'user_email': user_email,'login_message': login_message,'slide':slides,'featbanner':featbanners,'product':productdetails,"csrf_token": get_token(request),'category':category } )


def quickview(request, product_id):
    products=product_model.objects.get(id= product_id)
    print('we are inside quickview django view')
    data = {
        'name': products.pname,
        'description': products.description,
        'selling_price': products.selling_price,
        'discounted_price': products.discounted_price,
        'image': str(products.image.url)
        # 'product_id':products.product_id
    }

    return JsonResponse(data)


from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


def productdetails(request, product_id):
    productdetails1=product_model.objects.get(id=product_id)
    serializer=productserializer(productdetails1)
    json_data=json.dumps(serializer.data)
    print(json_data)

    return render(request,'product-details.html',{'product':productdetails1})




@csrf_protect
def checkout(request):
    # cart_items = CartItem.objects.filter(session_id=request.session.session_key)
    return render(request, 'cart.html', )


from django.contrib.auth import authenticate,login


import uuid
def payment(request):
    if request.method == 'POST':
        cart_items_json = request.body.decode('utf-8')
        cart_items = json.loads(cart_items_json)['cartItems']
        delivery_details = json.loads(cart_items_json)['deliveryDetails']

        # get the data from the request
        customer_name = delivery_details.get('name', 'default_name')
        payment_option = delivery_details.get('payment_option', 'eSEWA')
        location = delivery_details.get('address', 'default_location')
        phone_number = delivery_details.get('phone', 'default_phone')
        country = delivery_details.get('country', 'default_name')
        zipcode = delivery_details.get('zip', 'default_name')


        # create the order
        order = Order.objects.create(
            customer_name=customer_name,
            location=location,
            phone_number=phone_number,
            zipcode=zipcode,
            country=country,

        )

        total_price = 0

        # create an OrderItem for each product in the cart
        for item in cart_items:
            product = product_model.objects.get(id=item['id'])
            order_item = OrderItem.objects.create(
                order=order,

                quantity=item['quantity'],
                price=item['price'],
                image=item['image'],
                name=item['name'],
            )
            total_price += int(item['price']) * int(item['quantity'])

        # update the total price of the order and save it
        order.total_price = total_price
        order.save()

        # return a JSON response with the order details
        data = {
            'order_id': str(order.order_id),
            'total_price': total_price,
            'payment_option': payment_option,
            'status':'success'
        }
        return JsonResponse(data)

    else:
        products = product_model.objects.all()
        return render(request, 'placeorder2.html', {'products': products})

        # return render(request, 'order_created.html', {'order': order})



        # access the values

        # print the data to the console



    # if request.method == 'POST':
        # print("payment request not post")
        # print('POST request received')


def payment_method(request):
    order_id = request.GET.get('order_id')
    print(order_id)
    orders = OrderItem.objects.filter(order_id=order_id)
    print(orders)
    return render(request,'paymentmethod.html',{'orders':orders,'order_id':order_id})
from django.contrib.auth import authenticate, login
import logging

logger = logging.getLogger(__name__)
logger = logging.getLogger(__name__)
@csrf_protect
def login_view(request):
    logger.debug('Login view called')
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        MyUser = authenticate(request, email=email, password=password)
        print(MyUser)
        if MyUser is not None and MyUser.is_active:
            login(request, MyUser)
            request.session['user_email'] = MyUser.email
            # login_message = [str(message) for message in messages.get_messages(request)]
            return JsonResponse({'status': 'success', 'redirect': '/'})
            logger.info('User logged in successfully!')
            messages.success(request, 'You have successfully logged in!')

            return redirect(request,'home')
        else:
            return JsonResponse({'status': 'invalid credentials'})
            return JsonResponse({'status': 'invalid credentials'})
            error = 'Invalid email or password'
            messages.error(request, error)
            return render('login.html', {'messages': error})
    else:
        return render(request, 'login.html')

def register_view(request):
    if request.method == 'POST':

        # Get the form data from the request
        email = request.POST.get('email')
        print(email)
        first_name = request.POST.get('first_name')
        print(first_name)
        last_name = request.POST.get('last_name')
        address = request.POST.get('address1')
        print(address)
        phone = request.POST.get('phone')
        print(phone)

        password = request.POST.get('password')

        # Create a new User object
        user = MyUser.objects.create_user(
            phone=phone,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            address=address
        )

        # Set additional user information
        # user.profile.address = address
        # user.profile.phone = phone
        # user.save()

        # Log the user in
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)

        # Return a JSON response with a success message
        # return JsonResponse({'message': 'Registration successful!'})
        return render(request,'registeredsuccess.html')
    else:
        return render(request, 'register.html')
from django.contrib.auth import logout
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'success', 'redirect': '/'})


import json
from decimal import Decimal
from django.utils import timezone
def validate_user(request):
    if request.method == 'POST':
        if  request.user.is_authenticated:
            cart_items_json = request.body.decode('utf-8')
            cart_items = json.loads(cart_items_json)['cartItems']
            print(cart_items)
            user = request.user
            for item in cart_items:
                product_id = item['id']
                quantity = item['quantity']
                existing_order = PendingOrder.objects.filter(user__email=user, product_id=product_id).first()
                if existing_order:
                    existing_order.quantity += quantity
                    existing_order.save()
                else:
                    product_name = item['name']
                    order_date = timezone.now()
                    pending_order = PendingOrder(user=request.user, product_name=product_name, product_id=product_id,
                                                 quantity=quantity, order_date=order_date)
                    pending_order.save()




            # Add each item from the shopping cart to the order
            return JsonResponse({'authenticated': True})
        else:
            return JsonResponse({'authenticated': False})
            # User is authenticated, return success response

    else: return JsonResponse({'authenticated': False})


from django.shortcuts import render
from .models import Order, product_model

import uuid
def create_order(request):
    if request.method == 'POST':
        # Retrieve the form data from the request
        customer_name = request.POST.get('customer_name',default='prajjwal')
        location = request.POST.get('location',default='lalbandi')
        phone_number = request.POST.get('phone_number',default='009800000')
        data = json.loads(request.body)
        cart_items = data['cartItems']





        # Create a new order object
        order = Order.objects.create(
            customer_name=customer_name,
            location=location,
            phone_number=phone_number,

        )

        # Add each product to the order and calculate the total price
        total_price = 0
        for item in cart_items :
            product = product_model.objects.get(id=item['id'])
            # print(product)

            order_item = OrderItem(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=item['price'],
                image=item['image'],
                name=item['name'],

                # Add more attributes as needed
            )
            print(order_item)
            order_item.save()
            total_price += int(item['price']) * int(item['quantity'])

        # Set the total price of the order and save it
        order.total_price = total_price
        order.save()
        return HttpResponse("order created succesfuly")
        # return render(request, 'order_created.html', {'order': order})
    else:
        products = product_model.objects.all()
        return render(request, 'create_order.html', {'products': products})


def placeOrder(request):
    return render(request,'placeorder2.html')



from django.shortcuts import redirect

def esewa(request):
    url = "https://uat.esewa.com.np/epay/main"
    order_id = request.GET.get('order_id')
    orderdetails = OrderItem.objects.filter(order_id=order_id)

    if orderdetails.exists():
        order_id = orderdetails[0].order.order_id
        total_price = orderdetails[0].order.total_price

        data = {
            'amt': total_price,
            'pdc': 0,
            'psc': 0,
            'txAmt': 0,
            'tAmt':total_price,
            'pid': order_id,
            'scd': 'EPAYTEST',
            'su': 'http://prajjwalacharya.pythonanywhere.com/payment/success',
            'fu': 'http://localhost:8000/payment/failure',
        }

        url_with_params = url + "?" + "&".join([f"{k}={v}" for k, v in data.items()])
        return redirect(url_with_params)

def esewa_payment_success(request):
        print("we have reached to esewa success view")
    # Do something with the response, such as check if the payment was successful
        oid = request.GET.get('oid')
        oid_num=str(oid)
        amt = request.GET.get('amt')
        print("order id is retrieved"+oid_num)
        refId = request.GET.get('refId')
        order = Order.objects.get(order_id=oid_num)
        print(order)
        order.payment_status = 'paid'
        order.save()
        return render(request, 'esewa.html', {'oid': oid, 'amt': amt, 'refId': refId})

def esewa_payment_failure(request):

    # Do something with the response, such as display an error message
    return HttpResponse("Payment failed.")
def paypal(request):

    order_id = request.GET.get('order_id')
    print(order_id)

    return render(request,'paypal.html',{'order_id':order_id})

import json
import requests
from django.http import JsonResponse
import requests
import json
from django.conf import settings

BASE_URL = "https://api-m.sandbox.paypal.com"

@csrf_protect
def create_paypal_order(request):
    request.body.decode('utf-8')
    order_id = request.body.decode('utf-8')
    order_id = json.loads(order_id)['order_id']
    print(order_id)
    orderdetails = OrderItem.objects.filter(order_id=order_id)
    print(orderdetails)
    amount = str(orderdetails[0].order.total_price)
    print(amount)
    access_token = generate_access_token()
    print(access_token+"this is my accestoken")



    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
        'PayPal-Request-Id': order_id,
    }
    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": amount
                }
            }
        ]
    }
    response = requests.post(f"{BASE_URL}/v2/checkout/orders", headers=headers, data=json.dumps(payload))

    return HttpResponse(response)



def capture_payment(request):
    print("we are inside payment capture")
    request_body = json.loads(request.body.decode('utf-8'))
    order_id = request_body.get('orderID')

    # Print the orderID for debugging purposes
    print('Order ID:', order_id)
    # print(order_id)
    print(123)
    access_token = generate_access_token()
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.post(f"{BASE_URL}/v2/checkout/orders/{order_id}/capture", headers=headers)
    print(response)
    return HttpResponse(response)
import base64
def generate_access_token():
    client_id = settings.PAYPAL_CLIENT_ID
    print(client_id)
    client_secret = settings.PAYPAL_CLIENT_SECRET
    print(client_secret)
    auth = f"{client_id}:{client_secret}".encode('utf-8')
    auth_b64 = base64.b64encode(auth).decode('utf-8')

    headers = {
        "Authorization": f"Basic {auth_b64}",
    }
    payload = {
        "grant_type": "client_credentials",
    }
    response = requests.post(f"{BASE_URL}/v1/oauth2/token", headers=headers, data=payload)
    print(response)
    json_data = handle_response(response)
    print(json_data)
    return json_data['access_token']

def handle_response(response):
    if response.status_code == 200 or response.status_code == 201:
        return response.json()
    raise ValueError(response.status_code)

def payment_success(request):
    order_id= request.GET.get('order_id')
    order_id_num = int(order_id)
    order = Order.objects.get(order_id=order_id_num)
    order.payment_status = 'paid'
    order.save()
    return render(request,'ordersuccess.html')