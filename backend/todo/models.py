from django.db import models
from django.urls import reverse

# Create your models here.


class ToDoList(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True)
    # We can either derive the completed state from each item in the list or store it directly in the list
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Item(models.Model):
    list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    createdAt = models.DateTimeField(auto_now_add=True)
    dueDate = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.text
