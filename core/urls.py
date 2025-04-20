from django.urls import path
from django.conf.urls.static import static
from task_manager_webapp import settings
from . import views

urlpatterns = [
    path('', views.home_view, name='home_page'),
    path('dashboard/', views.dashboard_view, name='dashboard_page'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)