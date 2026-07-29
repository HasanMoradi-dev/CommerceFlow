from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    email = models.EmailField(max_length = 200 , unique = True , null= True , blank= True)


    def __str__(self):
        return self.email