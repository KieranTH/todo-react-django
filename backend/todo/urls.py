from django.urls import path

from . import views

urlpatterns = [
    path("api/", views.apiOverview, name="api-overview"),
    path("lists/", views.getLists, name="get-lists"),
    path("list/<str:pk>/", views.getList, name="get-list"),
    path("create/list/", views.listCreate, name="list-create"),
    path("list/<str:pk>/update", views.listUpdate, name="list-update"),
    path("list/<str:pk>/delete", views.listDel, name="list-delete"),
    path("list/<str:pk>/items", views.getListItems, name="list-items"),
    path("list/<str:pk>/complete", views.listComplete, name="list-complete"),
    path("create/item", views.itemCreate, name="item-create"),
    path("item/<str:pk>/", views.getItem, name="get-item"),
    path("item/<str:pk>/update", views.itemUpdate, name="item-update"),
    path("item/<str:pk>/delete", views.itemDel, name="item-delete"),
    path("item/<str:pk>/complete", views.itemComplete, name="item-complete"),
    path("item/<str:pk>/incomplete", views.itemIncomplete, name="item-incomplete"),
]
