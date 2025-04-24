from django.urls import path
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenRefreshView
from . import views

from task_manager_webapp import settings


urlpatterns = [
    #Authentication
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', views.CustomTokenVerifyView.as_view(), name='token_verify'),
    path('api/register/', views.RegisterView.as_view(), name='auth_register'),

    #Profile
    path('api/profile/', views.ProfileView.as_view(), name='get_profile'),

    #Login Page
    path('signin/', views.signin_page_view, name='signin_page'),
    path('signup/', views.signup_page_view, name='signup_page'),
    path('signout/', views.signout_view, name='signout'),
    path('profile/', views.profile_page_view, name='profile_page'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)