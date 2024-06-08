from django.shortcuts import render, redirect
from .models import Record
import time

# Create your views here.
def home(request):
    return render(request,'home.html')

def name(request):
    if request.method == 'POST':
        player_name = request.POST.get('player_name')
        # Handle the player's name here (e.g., save to database, pass to game, etc.)
        return redirect('game')
    return render(request,'name.html')

def game(request):
    return render(request,'game.html')

def gameover(request):
    return render(request, 'gameover.html')