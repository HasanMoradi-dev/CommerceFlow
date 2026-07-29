from rest_framework import serializers
from products.models import Product ,Category , ProductImage, ProductVariant



class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ["id","image"]



class ProductVariantSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(many=True , read_only=True)


    class Meta:
        model = ProductVariant
        fields = ["id","sku","color","size" , "price" , "stock" , "images"]


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()




    class Meta:
        model = Product
        fields = ["id","name" , "description" , "variants" , "image"]


    def get_image(self, obj):
        variant = obj.variants.first()
        if variant:
            image = variant.images.first()
            if image:
                return image.image.url

        return None

