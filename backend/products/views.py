from django.db.models import Min
from django_filters.rest_framework import DjangoFilterBackend
from products.models import Product, Category
from products.serializer import ProductSerializer, CategorySerializer
from rest_framework import viewsets, generics
from products.permissions import IsAdminOrReadOnly
from rest_framework import filters

class ProductViewSet(viewsets.ModelViewSet):


    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name"]
    filterset_fields = ["category"]
    ordering_fields = ["price" ,"create_at" , "stock"]
    filter_backends = [DjangoFilterBackend , filters.SearchFilter]

    def get_queryset(self):

        queryset = Product.objects.annotate(min_price=Min("variants__price"))


        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)

        ordering = self.request.query_params.get('ordering', None)
        if ordering == "price" :
            queryset = queryset.order_by('min_price')
        elif ordering == "-price":
            queryset = queryset.order_by('-min_price')
        else :
            queryset = queryset.order_by('-created_at')
        return queryset



class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None