from django.contrib import admin
from.models import slide,featbanner,product_model,CartItem,MyUser,Customer,product_category
from django.forms import ModelForm
from image_cropping import ImageCroppingMixin
from image_cropping import ImageCropWidget

# Register your models here.
admin.site.register(slide)
admin.site.register(featbanner)
admin.site.register(MyUser)
admin.site.register(product_category)


admin.site.register(Customer)
# admin.site.register(CartItem)



admin.site.register(product_model)









admin.site.register(CartItem)



