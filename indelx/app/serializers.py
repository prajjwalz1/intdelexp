from rest_framework import serializers
from .models import product_model
class productserializer(serializers.ModelSerializer):
    class Meta:
       model=product_model
       fields = '__all__'