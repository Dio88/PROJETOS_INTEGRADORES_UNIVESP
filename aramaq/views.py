from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect, render

# Create your views here.

@login_required(login_url="/login")
def index(request):
        return render(request, 'index1.html')
    

def cadastro(request):
    if request.method == "GET":
        return render(request, 'cadastro1.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse("Já existe um usuário cadastrado com esse nome")

        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()

        return HttpResponse ("Usuário cadastrado com sucesso")

def login(request):
    if request.method == "GET":
        return render(request, 'login1.html')
    else:
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        user = authenticate(username=username, password=senha)

    if user:
        login_django(request, user)
        return redirect("/")
        #return HttpResponse("autenticado")
    else:
        return HttpResponse("Usuário ou senha inválidos")