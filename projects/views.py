from django.shortcuts import redirect, render
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from django.db.models import Q
from django.contrib.auth.decorators import login_required
class ProjectViewSet(viewsets.ModelViewSet):
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

def create_project(request):
    return render(request, 'projects/create_project_page.html')



@login_required
# @permissions([permissions.IsAuthenticated])
def crate_project(request):
    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return redirect('project_list')
    else:
        serializer = ProjectSerializer()
    return render(request, 'projects/create_project_page.html', {'serializer': serializer}) 