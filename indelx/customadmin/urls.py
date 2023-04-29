from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.admin_login, name="admin_login"),
    path('order_detail/<int:order_id>' , views.order_detail, name="order_detail"),
    path('orderlist/', views.order_list, name="order_list")




] +static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)