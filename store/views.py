from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def boleta(request):
    return render(request, 'boleta.html')

def registro(request):
    return render(request, 'reg.html')

def inicio(request):
    return render(request, 'inises.html')

def detallesComics(request):
    return render(request, 'comic-details.html')

def contacto(request):
    return render(request, 'contac.html')

def reclamos(request):
    return render(request, 'reclamo.html')

def sobreNosotros(request):
    return render(request, 'sobnos.html')

def EmailSucess(request):
    return render(request, 'email-sucess.html')

def Home(request):
    return render(request, 'home.html')