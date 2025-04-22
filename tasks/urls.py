from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task_manager_webapp import settings
from . import views
from django.conf.urls.static import static

# Initialize the router and register the ProjectViewSet
router = DefaultRouter()
router.register(r'api/tasks', views.TaskViewSet, basename='project')

# Define the urlpatterns list
urlpatterns = [
    # Include the router's URLs (for API endpoints)
    path('', include(router.urls)),
]

# Serve media files during development (if DEBUG is True)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
