from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from orders.models import Order
from orders.serializers import OrderSerializer

class OrderListCreateView(ListCreateAPIView):


    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return  Order.objects.filter(user=self.request.user)