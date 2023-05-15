from django.db import models
from django.db import models
from django.db import models
import datetime
from PIL import Image
import io
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User


# Create your models here.
class slide(models.Model):
    title = "slide image"
    image = models.ImageField(upload_to='projects/')

    def save(self, *args, **kwargs):
        # Open the image using Pillow
        image = Image.open(self.image)

        # resize the image to the desired dimensions
        image = image.resize((1920, 950))

        # Save the cropped image to a buffer
        buffer = io.BytesIO()
        image.save(buffer, 'JPEG')
        buffer.seek(0)

        # Save the buffer to the ImageField
        self.image.save(self.image.name, buffer, save=False)

        # Save the rest of the model
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title;


class featbanner(models.Model):
    title = "slide image"
    product_id = models.AutoField
    image = models.ImageField(upload_to='projects/')
    pname = models.CharField(max_length=100)
    psubtitle = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        # Open the image using Pillow
        image = Image.open(self.image)

        # resize the image to the desired dimensions
        image = image.resize((570, 283))

        # Save the cropped image to a buffer
        buffer = io.BytesIO()
        image.save(buffer, 'JPEG')
        buffer.seek(0)

        # Save the buffer to the ImageField
        self.image.save(self.image.name, buffer, save=False)

        # Save the rest of the model
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title;


class product_category(models.Model):
    name = models.CharField(max_length=100, default='test')

    def __str__(self):
        return self.name

from image_cropping import ImageRatioField
from io import BytesIO
class product_model(models.Model):
    pname = models.CharField(max_length=100)
    product_id = models.AutoField
    selling_price = models.FloatField()
    discounted_price = models.FloatField()
    description = models.TextField()
    brand = models.CharField(max_length=100)

    # category=models.CharField(choices=CATEGORY_CHOICES,max_length=100,null=True)
    category = models.ForeignKey(product_category, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='projects/')
    image_2 = models.ImageField(upload_to='projects/', blank=True)
    image_3 = models.ImageField(upload_to='projects/', blank=True)
    quantity = models.PositiveIntegerField(default=1)
    deal = models.BooleanField(default=False)
    deal_date = models.DateTimeField(null=True, blank=True)
    image_thumbnail = models.ImageField(upload_to='projects/thumbnails/', null=True, blank=True)
    # image_cropping = ImageRatioField('image', '350x350')

    def save(self, *args, **kwargs):
        # Open the image using Pillow
        image = Image.open(self.image)

        # Crop the image to a square with the longest edge equal to 350 pixels
        width, height = image.size
        if width > height:
            left = (width - height) / 2
            top = 0
            right = left + height
            bottom = height
        else:
            top = (height - width) / 2
            left = 0
            bottom = top + width
            right = width
        image = image.crop((left, top, right, bottom))

        # Resize the cropped image to 350x350 pixels
        thumb_size = (283, 283)
        image = image.resize(thumb_size, Image.ANTIALIAS)

        # Save the thumbnail to a buffer
        thumb_buffer = BytesIO()
        image.save(thumb_buffer, 'JPEG')
        thumb_buffer.seek(0)

        # Save the buffer to the ImageField
        self.image_thumbnail.save(self.image.name, thumb_buffer, save=False)

        # Save the rest of the model
        super().save(*args, **kwargs)
    def __str__(self):
        return str(self.pname)


from django.conf import settings


class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, default='prajjwal', on_delete=models.CASCADE)

    def __str__(self):
        return self.user


import uuid


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255, default='prajjwal')
    location = models.CharField(max_length=255, default='tets')
    zipcode = models.CharField(max_length=255, default='tets')
    country = models.CharField(max_length=255, default='tets')
    phone_number = models.CharField(max_length=20, default='123')

    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    PAYMENT_STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
    )
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Order {self.order_id}: {self.customer_name}"


from django.urls import reverse


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.PROTECT)

    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200, null=True)
    description = models.TextField(blank=True)

    def get_absolute_url(self):
        return reverse('order_detail', args=[self.order.id])

    def __str__(self):
        return str(self.id)

    def __str__(self):
        return f"{self.quantity}x ({self.order.customer_name})"


class CartItem(models.Model):
    name = models.CharField(max_length=255, null=True)
    quantity = models.PositiveIntegerField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    customer = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name


class MyUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, address, phone, password=None):
        if not email:
            raise ValueError('Email address is required')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, address=address, phone=phone)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, address, phone, password=None):
        user = self.create_user(email, first_name, last_name, address, phone, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'address', 'phone']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class PendingOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    product_name = models.CharField(max_length=300)
    product_id = models.IntegerField()
    quantity = models.IntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    # add any other fields you need for the pending order

    def __str__(self):
        return f"{self.user.email}'s order for product {self.product_id}"
