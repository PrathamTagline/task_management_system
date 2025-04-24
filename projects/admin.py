from django.contrib import admin
from .models import Project

# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'key','description', 'created_at',)
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ('-created_at',) 