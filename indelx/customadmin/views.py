from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from app.models import Order,OrderItem
from django.http import HttpResponse

def  admin_login(request):
    try:
        if request.user.is_authenticated and request.user.is_staff :
            return redirect('orderlist/')
            if request.method == 'POST':
                username=request.POST.get('username')
                password=request.POST.get('password')
                user_obj=authenticate(request, email=username, password=password)
                if not user_obj.exists():
                    messages.info(request,'Account with the username not found')
                    print("userfound")
                    return redirect(request.META.get('HTTP_REFERER'))
                user_obj=authenticate(username=username,password=password)

                if user_obj and user_obj.is_superuser:
                    login(request,user_obj)
                    return redirect('orderlist/')
                else:
                    messages.info(request, 'invalid Password')


                messages.info(request,'invalid Password')
                return ('/')
            return render(request,'customlogin.html')
        else:
            return HttpResponse('you are not authorized to this page')

    except Exception as e:
        print(e)
from django.shortcuts import render

# Create your views here.
# def dashboard(request):
#     orders=Order.objects.all()
#     return render(request,'order_detail.html',{'orders':orders})


def order_list(request):
    orders = OrderItem.objects.all()
    context = {
        'orders': orders
    }
    return render(request, 'order_list.html', context)

def order_detail(request,order_id):
    orders = OrderItem.objects.filter(order_id=order_id)
    context = {
        'orders': orders
    }
    return render(request, 'order_detail.html', context)
