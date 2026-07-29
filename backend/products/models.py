from django.db import models


class Category(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT ,  related_name='products')

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product,on_delete=models.PROTECT, related_name='variants')
    sku = models.CharField(max_length=100,unique=True)
    color = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    size = models.CharField(max_length=20 , blank=True, null=True)
    def __str__(self):
        return f"{self.product.name} - {self.color} - {self.size}"


class ProductImage(models.Model):

    variant = models.ForeignKey(ProductVariant,on_delete=models.CASCADE , related_name='images')
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.variant.sku