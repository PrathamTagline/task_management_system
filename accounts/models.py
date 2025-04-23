import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.files.storage import default_storage

def user_profile_upload_path(instance, filename):
    return f"user_media/{instance.id}/profile/{filename}"

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('username', 'admin')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    profile_image = models.ImageField(upload_to=user_profile_upload_path, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        profile_img = self.profile_image if self.profile_image else None

        # Temporarily clear image to avoid issues
        if profile_img and is_new:
            self.profile_image = None

        super().save(*args, **kwargs)

        # If new and profile image exists, now save it
        if profile_img and is_new and not default_storage.exists(profile_img.name):
            self.profile_image = profile_img
            self.save(update_fields=['profile_image'])