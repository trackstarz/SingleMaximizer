from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Single, Outlet, MessageTemplate, UserProfile
from .serializers import SingleSerializer
from .utils import deleteSingle, getSingleDetail, updateSingle, deleteSingle, getSinglesList, createSingle
from django.http import JsonResponse
from rest_framework import permissions

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/singles/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of singles'
        },
        {
            'Endpoint': '/singles/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single single'
        },
        {
            'Endpoint': '/singles/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates an existing single with data sent in post request'
        },
        {
            'Endpoint': '/singles/id/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an exiting single with data sent in post request'
        },
        {
            'Endpoint': '/singles/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes an existing single'
        },
        {
            '/api/token',
        },
        {
            '/api/token/refresh',
        }
            
            
        
    ]
    
    
    return Response(routes) 




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 
    



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getSingles(request):
    if request.method == 'GET':
        return getSinglesList(request)
    if request.method == 'POST':
        return createSingle(request)




@api_view(['GET', 'PUT', 'DELETE'])
def getSingle(request, pk):
        if request.method == 'GET':
            return getSingleDetail(pk)
    
        if request.method == 'PUT':
            return updateSingle(request, pk)

        if request.method == 'DELETE':
            return deleteSingle(pk) 