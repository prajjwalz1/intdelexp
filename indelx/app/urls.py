from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers
from django.urls import  re_path
# from app import views
from django.urls import path, include
# app_name = 'app'
from .views import productdetails

urlpatterns = [
    path('', views.home, name='home'),

    # path('', views.prodview, name='prodview'),
    path('quickview/<int:product_id>/', views.quickview, name='product_details'),
    path('productdetails/<int:product_id>',views.productdetails,name='productdetails'),
    path('productapi/',views.productapi,name='productapi'),
    path('productapi/<int:id>',views.productapiid,name='productapi'),
    # path('cart/<int:id>',views.Cart, name='cart'),
    # path('add-to-cart/<int:product_id>', views.update_cart, name='add_to_cart'),
    path('checkout/',views.checkout,name='checkout'),
    path('create_order/',views.create_order,name='create_order'),
    path('login/', views.login_view, name='login'),
    path('register_view/', views.register_view, name='register_view'),
    path('validate_user/', views.validate_user, name='validate_user'),
    path('logout', views.logout_view, name='logout'),
    path('place_order/',views.placeOrder,name='placeOrder'),
    path('payments/',views.payment,name='payment'),
    path('esewa/',views.esewa,name='esewa'),
    path('payment/success/', views.esewa_payment_success, name='esewa_success'),
    path('paypal/',views.paypal,name='paypal'),
    path('my-server/create-paypal-order', views.create_paypal_order, name='create_paypal_order'),
    path('my-server/capture-paypal-order', views.capture_payment, name='capture_payment'),
    path('paymentsuccess/',views.payment_success,name='payment_success'),
    path('paymentmethod/',views.payment_method,name='payment_method'),
    path('product_search/',views.product_search,name='product_search'),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
