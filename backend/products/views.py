from products.models import Product
from products.serializer import ProductSerializer
from rest_framework import viewsets
from products.permissions import IsAdminOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name"]
    filterset_fields = ["category"]
    ordering_fields = ["price" ,"create_at" , "stock"]

