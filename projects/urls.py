from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task_manager_webapp import settings
from . import views
from django.conf.urls.static import static

# Initialize the router and register the ProjectViewSet
router = DefaultRouter()
router.register(r'api/projects', views.ProjectViewSet, basename='project')

# Define the urlpatterns list
urlpatterns = [
    # Include the router's URLs (for API endpoints)``
    path('', include(router.urls)),
    path('create/', views.create_project, name='create_project'),
    path('boarding/', views.boarding_view, name='boarding_page'),
    path('search/', views.search_view, name='search_page'),
    path('<str:key>/', views.project_detail_view, name='project_page'),
]

# Serve media files during development (if DEBUG is True)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
