from rest_framework import serializers
class productserializer(serializers.Serializer):
    pname = serializers.CharField(max_length=100)
    selling_price = serializers.FloatField()
    discounted_price = serializers.FloatField()
    description = serializers.CharField()
    brand = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField(default=1)