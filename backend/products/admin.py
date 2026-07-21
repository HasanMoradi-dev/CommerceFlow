from django.contrib import admin
from products.models import Product , Category


class ProductAdmin(admin.ModelAdmin):

    list_display = ('name' ,'category','price','stock' )
    search_fields = ('name',)
    list_filter = ('category',)
    ordering = ('-created_at',)
    list_select_related = ('category',)
    list_per_page = 20

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name' ,)
    search_fields = ('name',)



admin.site.register(Product, ProductAdmin)
admin.site.register(Category , CategoryAdmin)