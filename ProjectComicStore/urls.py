"""ProjectComicStore URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from store.views import index , boleta, registro, inicio , detallesComics , contacto , reclamos , sobreNosotros , EmailSucess , Home


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('boleta/', boleta, name='boleta'),
    path('reg/', registro, name='registro'),
    path('login/', inicio, name='inicio'),
    path('comic-details/', detallesComics, name='comicsDetalles'),
    path('contac/', contacto, name='contacto'),
    path('reclamo/', reclamos, name='reclamos'),
    path('sobnos/', sobreNosotros, name='sobreNosotros'),
    path('email-sucess/', EmailSucess, name='emailsucess'),
    path('home/', Home, name='home'),

    path("accounts/", include("django.contrib.auth.urls")),
]
