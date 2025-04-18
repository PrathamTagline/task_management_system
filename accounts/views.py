from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer,ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from .models import User
from rest_framework.generics import RetrieveUpdateAPIView
# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

#Register User
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Profile View
class ProfileView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_object(self):
        # Return the currently authenticated user
        return self.request.user
    

def signin_page_view(request):
   return render(request, 'accounts/signin_page.html')

def signup_page_view(request):
   return render(request, 'accounts/signup_page.html')       