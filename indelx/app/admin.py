from django.contrib import admin
from.models import slide,featbanner,product_model,CartItem,MyUser,Customer,product_category,MyModel
from image_cropping import ImageCroppingMixin
# Register your models here.
admin.site.register(slide)
admin.site.register(featbanner)
admin.site.register(MyUser)
admin.site.register(product_category)


admin.site.register(Customer)
# admin.site.register(CartItem)



admin.site.register(product_model)




@admin.register(MyModel)
class MyModelAdmin(ImageCroppingMixin, admin.ModelAdmin):
    pass




admin.site.register(CartItem)
class MyModelForm(ModelForm):
    class Meta:
        model = MyModel
        fields = '__all__'
        widgets = {
            'image': ImageCropWidget,
        }

@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    form = MyModelForm