from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.db.models import Q
from django.contrib.auth import get_user_model
from .models import Project, ProjectMembership
from .serializers import ProjectSerializer

User = get_user_model()

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
        Returns the list of projects that the current user is associated with,
        either as a creator or a member.
        """
        user = self.request.user
        return Project.objects.filter(  
            Q(created_by=user) | Q(memberships__user=user)
        ).distinct()

    def perform_create(self, serializer):
        """
        Automatically set the current user as the creator of the project.
        Add the creator as an Admin member.
        Add other selected members with their specified roles.
        """
        # Save the project
        project = serializer.save(created_by=self.request.user)

        # Add creator as Admin (set explicitly here)
        ProjectMembership.objects.create(
            user=self.request.user,
            project=project,
            role='Admin'
        )

        # Add other members with their specified roles
        members_data = self.request.data.get('members', [])
        for member in members_data:
            user_id = member.get('user_id')
            role = member.get('role')

            # Skip the creator (they are already added as Admin)
            if str(user_id) != str(self.request.user.id):
                try:
                    user = User.objects.get(id=user_id)
                    ProjectMembership.objects.create(
                        user=user,
                        project=project,
                        role=role  # Add the specified role for each member
                    )
                except User.DoesNotExist:
                    continue  # skip invalid users


def create_project(request):
    return render(request, 'projects/create_project_page.html')


def search_view(request):
    return render(request, 'projects/search_bar.html')

def boarding_view(request):
    """
    View to display the onboarding page for new users.
    """
    return render(request, 'projects/boarding_page.html')

def project_detail_view(request, key):
    """
    View to display the details of a specific project.
    """
    try:
        project = Project.objects.get(key=key)
    except Project.DoesNotExist:
        return render(request, '404.html', status=404)

    context = {
        'project': project,
    }
    return render(request, 'projects/project_page.html', context)
