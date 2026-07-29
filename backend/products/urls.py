from django.urls import path,include
from products.views import ProductViewSet, CategoryListView
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'products', ProductViewSet , basename = "products")


urlpatterns = [
    path("" , include(router.urls)),
    path('categories/', CategoryListView.as_view(), name='category-list'),
]
