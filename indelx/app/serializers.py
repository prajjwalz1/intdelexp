from rest_framework import serializers
from .models import product_model
class Productserializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    class Meta:
       model = product_model
       fields = ['id', 'pname', 'selling_price', 'discounted_price', 'description', 'brand', 'category', 'category_name', 'image', 'image_2', 'image_3', 'quantity', 'deal', 'deal_date', 'image_thumbnail']