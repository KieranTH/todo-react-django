from django.db import models
from django.urls import reverse

# Create your models here.

# Todo List Model
class ToDoList(models.Model):
    # Title of the List
    title = models.CharField(max_length=200)
    # Description of List
    description = models.TextField(null=True)
    # We can either derive the completed state from each item in the list or store it directly in the list
    completed = models.BooleanField(default=False)

    # This is the string representation of the model
    def __str__(self):
        return self.title


# Item Model
class Item(models.Model):
    # List Foreign Key
    list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    # Text for the item
    text = models.CharField(max_length=300)
    # Created At Date
    createdAt = models.DateTimeField(auto_now_add=True)
    # Due Date (Optional)
    dueDate = models.DateTimeField(null=True, blank=True)
    # Completed State
    completed = models.BooleanField(default=False)

    # This is the string representation of the model 
    def __str__(self):
        return self.text
