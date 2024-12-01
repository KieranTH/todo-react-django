from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ItemSerializer, ListSerializer
from .models import ToDoList, Item

# API Route for listing available routes
@api_view(['GET'])
def apiOverview(_):
    api_urls = {
        'Lists': '/lists/',
        'Create List': '/list/create/',
        'Read List': '/list/<str:pk>/',
        'Update List': '/list/update/<str:pk>/',
        'Delete List': '/list/<str:pk>/',

        'Create Item': '/item/create',
        'Read Item': '/item/<str:pk>/',
        'Update Item': '/item/update/<str:pk>/',
        'Delete Item': '/item/<str:pk>/',
    }
    return Response(api_urls)

# API Route for listing all lists
@api_view(['GET'])
def getLists(_):
    lists = ToDoList.objects.all()
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)

# API Route for listing a single list by it's ID
@api_view(['GET'])
def getList(_, pk):
    list = ToDoList.objects.get(id=pk)
    serializer = ListSerializer(list, many=False)
    return Response(serializer.data)

# API Route for creating a new list
@api_view(['POST'])
def listCreate(request):
    serializer = ListSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# API Route for updating a list by it's ID
@api_view(['POST'])
def listUpdate(request, pk):
    list = ToDoList.objects.get(id=pk)
    serializer = ListSerializer(instance=list, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# API Route for deleting a list by it's ID
@api_view(['DELETE'])
def listDel(_, pk):
    list = ToDoList.objects.get(id=pk)
    list.delete()
    return Response("List deleted successfully.")

# API Route for setting an list as completed
@api_view(['POST'])
def listComplete(_, pk):
    # This Try - Catch logic should be implemented for all routes
    try:
        list = ToDoList.objects.get(id=pk)
        list.completed = True
        list.save()
        serializer = ListSerializer(list)
        return Response(serializer.data)
    except ToDoList.DoesNotExist:
        return Response(status=404)


# API Route for getting items by list ID
@api_view(['GET'])
def getListItems(_, pk):
    items = Item.objects.filter(list=pk)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

# API Route for getting items by list ID
@api_view(['GET'])
def getItem(_, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)

# API Route for creating a new item in a list
@api_view(['POST'])
def itemCreate(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# API Route for updating an item by it's ID
@api_view(['POST'])
def itemUpdate(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(instance=item, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# API Route for setting an item as completed
@api_view(['POST'])
def itemComplete(_, pk):
    try:
        item = Item.objects.get(id=pk)
        item.completed = True
        item.save()
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    except Item.DoesNotExist:
        return Response(status=404)

# API Route for setting an item as incompleted
@api_view(['POST'])
def itemIncomplete(_, pk):
    try:
        item = Item.objects.get(id=pk)
        item.completed = False
        item.save()
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    except Item.DoesNotExist:
        return Response(status=404)


# API Route for deleting a list by it's ID
@api_view(['DELETE'])
def itemDel(_, pk):
    item = Item.objects.get(id=pk)
    item.delete()
    return Response("Item deleted successfully.")
