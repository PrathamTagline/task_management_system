from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from django.db.models import Q


class ProjectViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing projects.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'key'
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Show only projects the user created or is assigned to.
        """
        user = self.request.user
        return Project.objects.filter(Q(created_by=user) | Q(assigned_users=user)).distinct()

    def perform_create(self, serializer):
        """
        Automatically set the current user as the creator of the project.
        """
        serializer.save(created_by=self.request.user)


def create_project(request):
    return render(request, 'projects/create_project_page.html')


def boarding_view(request):
    return render(request, 'projects/boarding_page.html')