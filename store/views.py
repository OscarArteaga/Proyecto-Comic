from django.shortcuts import render, redirect
from .forms import UserRegisterForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.

def index(request):
    return render(request, 'index.html')

@login_required
def boleta(request):
    return render(request, 'boleta.html')

def registro(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            messages.success(request, f'Usuario {username} creado')
            return redirect('index')
    else:
        form = UserRegisterForm()
    context = { 'form' : form }
    return render(request, 'reg.html', context)

def inicio(request):
    return render(request, 'login.html')

@login_required
def detallesComics(request):
    return render(request, 'comic-details.html')

def contacto(request):
    return render(request, 'contac.html')

@login_required
def reclamos(request):
    return render(request, 'reclamo.html')

def sobreNosotros(request):
    return render(request, 'sobnos.html')

def EmailSucess(request):
    return render(request, 'email-sucess.html')
@login_required
def Home(request):
    return render(request, 'home.html')