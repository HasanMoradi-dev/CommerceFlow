from django.db import transaction
from rest_framework import serializers
from orders.models import Order, OrderItem
from products.models import ProductVariant
from products.serializer import ProductImageSerializer

class OrderItemVariantSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = ProductVariant
        fields = ["id", "color", "size", "price", "images", "product", "product_name"]


class OrderItemSerializer(serializers.ModelSerializer):

    variant = OrderItemVariantSerializer(read_only=True)


    variant_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductVariant.objects.all(), source="variant", write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ["id", "variant", "variant_id", "quantity", "price"]
        read_only_fields = ["price"]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "status", "total_price", "created_at", "items"]
        read_only_fields = ["total_price", "status", "created_at"]

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Order must contain at least one item.")
        return items

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user

        with transaction.atomic():

            variant_ids = [item["variant"].id for item in items_data]
            variants = {
                v.id: v
                for v in ProductVariant.objects.select_for_update().filter(id__in=variant_ids)
            }

            order = Order.objects.create(user=user, total_price=0)
            total = 0
            order_items = []

            for item in items_data:
                variant = variants[item["variant"].id]
                quantity = item["quantity"]

                if variant.stock < quantity:
                    raise serializers.ValidationError(
                        f"Not enough stock for {variant.product.name} ({variant.size})."
                    )

                variant.stock -= quantity
                variant.save(update_fields=["stock"])

                order_items.append(
                    OrderItem(order=order, variant=variant, quantity=quantity, price=variant.price)
                )
                total += variant.price * quantity

            OrderItem.objects.bulk_create(order_items)

            order.total_price = total
            order.save(update_fields=["total_price"])

        return order