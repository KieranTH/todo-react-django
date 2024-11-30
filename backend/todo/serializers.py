from rest_framework import serializers

from .models import Item, ToDoList


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = '__all__'
