from tokenize import Single
from rest_framework.serializers import ModelSerializer
from .models import Single, Outlet, MessageTemplate, UserProfile

class SingleSerializer(ModelSerializer):
    class Meta:
        model = Single
        fields = '__all__'

class OutletSerializer(ModelSerializer):
    class Meta:
        model = Outlet
        fields = '__all__'

class MessageTemplateSerializer(ModelSerializer):
    class Meta:
        model = MessageTemplate
        fields = '__all__'

class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'