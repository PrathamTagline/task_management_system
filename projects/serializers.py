from rest_framework import serializers
from .models import Project, ProjectMembership
from accounts.models import User

# User serializer (for nested output)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']

# Membership serializer for reading (GET)
class ProjectMembershipReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProjectMembership
        fields = ['user', 'role', 'joined_at']

# Membership serializer for writing (POST/PUT)
class ProjectMembershipWriteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ProjectMembership
        fields = ['user', 'role']

# Project serializer
class ProjectSerializer(serializers.ModelSerializer):
    memberships = ProjectMembershipReadSerializer(many=True, read_only=True)
    memberships_input = ProjectMembershipWriteSerializer(many=True, write_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'key', 'type',
            'image', 'created_by', 'created_at',
            'memberships', 'memberships_input'
        ]
        read_only_fields = ['created_by', 'created_at']

    def create(self, validated_data):
        memberships_data = validated_data.pop('memberships_input', [])
        project = Project.objects.create(**validated_data)

        for membership in memberships_data:
            ProjectMembership.objects.create(project=project, **membership)

        return project
