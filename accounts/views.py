from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView,TokenVerifyView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer,ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveUpdateAPIView
# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response({"message": "Token is valid"}, status=status.HTTP_200_OK)
        return response
    
# Auto-login Register view
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)

# Profile view
class ProfileView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

    

def signin_page_view(request):
   return render(request, 'accounts/signin_page.html')

def signup_page_view(request):
   return render(request, 'accounts/signup_page.html')       

def profile_page_view(request):
   return render(request, 'accounts/profile_page.html')