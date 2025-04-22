from django.contrib import admin
from .models import Task, SubTask
# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('key', 'title')
   
@admin.register(SubTask)
class SubTaskAdmin(admin.ModelAdmin):
    list_display = ('key', 'title')
   