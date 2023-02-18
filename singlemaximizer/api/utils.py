from rest_framework.response import Response
from .models import Single
from .serializers import SingleSerializer


def getSingleDetail(pk):
    singles = Single.objects.get(id=pk)
    serializer = SingleSerializer(singles, many=False)
    return Response(serializer.data)


def updateSingle(request, pk):
    data = request.data
    single = Single.objects.get(id=pk)
    serializer = SingleSerializer(instance=single, data=data)
    print("data is: ", data)
    print("single is: ", single)
    print("serializer is valid?: ", serializer.is_valid())
    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


def deleteSingle(pk):
    single = Single.objects.get(id=pk)
    single.delete()
    return Response("Single was deleted!")


def getSinglesList(request):
    print('user is: ')
    print(request.user)
    print(request.user.id)
    singles = Single.objects.filter(user=request.user.id).order_by('updated')
    serializer = SingleSerializer(singles, many=True)
    return Response(serializer.data)


def createSingle(request):
    
    serializer = SingleSerializer(data=request.data, many=False)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)