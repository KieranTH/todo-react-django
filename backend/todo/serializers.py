from rest_framework import serializers

from .models import Item, ToDoList

# Serializer for Item
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

# Serializer for List
class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = '__all__'
