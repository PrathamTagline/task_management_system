from rest_framework import viewsets, permissions
from .models import Task, SubTask
from django.db.models import Q
from .serializers import TaskSerializer, SubTaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing tasks.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'key'
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filter tasks based on the project key provided in the query parameters.
        """
        queryset = Task.objects.all()
        project_key = self.request.query_params.get('project')  # Get the project key from query params
        if project_key:
            queryset = queryset.filter(project__key=project_key)  # Filter tasks by project key
        return queryset

class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer
    lookup_field = 'key'
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        """
        Show only subtasks the user created or is assigned to.
        """
        user = self.request.user
        return SubTask.objects.filter(Q(created_by=user) | Q(assigned_users=user)).distinct()
