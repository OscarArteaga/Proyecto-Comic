from django.urls import path, views

urlpatterns = [
    path('menu', views.menu, name='menu'),
    path('home', views.home, name='home'),
]
