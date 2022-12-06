from django.urls import path
from aramaq import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cadastro', views.cadastro, name='cadastro'),
    path('login', views.login, name='login'),
]
