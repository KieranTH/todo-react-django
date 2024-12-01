from django.urls import path

from . import views

# API ROUTES
urlpatterns = [
    path("api/", views.apiOverview, name="api-overview"),
    # Fetch all Lists
    path("lists/", views.getLists, name="get-lists"),
    # Fetch List by ID
    path("list/<str:pk>/", views.getList, name="get-list"),
    # Create List
    path("create/list/", views.listCreate, name="list-create"),
    # Updtae List
    path("list/<str:pk>/update", views.listUpdate, name="list-update"),
    # Delete List
    path("list/<str:pk>/delete", views.listDel, name="list-delete"),
    # Fetch all List Items
    path("list/<str:pk>/items", views.getListItems, name="list-items"),
    # Set List as Complete
    path("list/<str:pk>/complete", views.listComplete, name="list-complete"),
    # Create Item
    path("create/item", views.itemCreate, name="item-create"),
    # Fetch Item by ID
    path("item/<str:pk>/", views.getItem, name="get-item"),
    # Update Item
    path("item/<str:pk>/update", views.itemUpdate, name="item-update"),
    # Delete Item
    path("item/<str:pk>/delete", views.itemDel, name="item-delete"),
    # Set Item as Complete
    path("item/<str:pk>/complete", views.itemComplete, name="item-complete"),
    # Set Item as Incomplete
    path("item/<str:pk>/incomplete", views.itemIncomplete, name="item-incomplete"),
]
