from django.db import models

from products.models import  ProductVariant
from users.models import User

class Order(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='orders')

    status_choices = [
        ('pending','Pending'),
        ('paid','Paid'),
        ('shipped','Shipped'),
        ('completed','Completed'),
    ]

    status = models.CharField(choices=status_choices,default='pending',max_length=20)

    total_price = models.DecimalField(max_digits=10,decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"


class OrderItem(models.Model):

    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')

    variant = models.ForeignKey(ProductVariant,on_delete=models.CASCADE,related_name='order_items')

    quantity = models.PositiveIntegerField(default=1)

    price = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f'{self.variant.product.name} x {self.quantity}'