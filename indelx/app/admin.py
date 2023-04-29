from django.contrib import admin
from.models import slide,featbanner,product_model,CartItem,MyUser,Customer,OrderItem,Order,PendingOrder
# Register your models here.
admin.site.register(slide)
admin.site.register(featbanner)
admin.site.register(MyUser)


admin.site.register(Customer)
# admin.site.register(CartItem)


admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(product_model)









admin.site.register(CartItem)