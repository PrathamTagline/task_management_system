from django.shortcuts import render

# Create your views here.
def dashboard_view(request):
    return render(request, 'core/dashboard_page.html')