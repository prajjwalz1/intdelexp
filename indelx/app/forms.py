from django.contrib import admin
from django.forms import ModelForm
from image_cropping import ImageCropWidget
from .models import MyModel

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
