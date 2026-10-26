from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("username", "email")


class ProductForm(forms.Form):
    name = forms.CharField(max_length=160)
    description = forms.CharField(widget=forms.Textarea)
    price = forms.DecimalField(min_value=0.01, max_digits=10, decimal_places=2)
    stock = forms.IntegerField(min_value=0)
    category = forms.CharField(max_length=100)
    image_url = forms.URLField(required=False)
    active = forms.BooleanField(required=False, initial=True)


class OrderForm(forms.Form):
    quantity = forms.IntegerField(min_value=1, initial=1)
