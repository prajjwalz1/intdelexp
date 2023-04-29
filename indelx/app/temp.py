def validate_user(request):
    if request.method == 'POST':
        if  request.user.is_authenticated:
            cart_items_json = request.body.decode('utf-8')
            cart_items = json.loads(cart_items_json)['cartItems']