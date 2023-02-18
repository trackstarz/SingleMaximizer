# Generated by Django 2.2.3 on 2022-06-01 03:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MessageTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('templatename', models.CharField(blank=True, max_length=40, null=True)),
                ('subject', models.CharField(blank=True, max_length=40, null=True)),
                ('message', models.TextField(blank=True, null=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Outlet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=40, null=True)),
                ('contactFirstName', models.CharField(blank=True, max_length=40, null=True)),
                ('contactLastName', models.CharField(blank=True, max_length=40, null=True)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('messagetemplate', models.TextField(blank=True, null=True)),
                ('genre', models.CharField(blank=True, choices=[('Hip Hop', 'hip hop'), ('CHH', 'chh'), ('R&B', 'randb'), ('Pop', 'pop'), ('Rock', 'rock'), ('CCM', 'ccm'), ('Gospel', 'gospel'), ('Country', 'country')], max_length=30, null=True)),
                ('medium', models.CharField(blank=True, choices=[('Audio', 'audio'), ('Video', 'video'), ('Instrumental', 'instrumental')], max_length=30, null=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('type', models.CharField(blank=True, max_length=40, null=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('displayname', models.CharField(max_length=40)),
                ('startdate', models.DateField(default=django.utils.timezone.now)),
                ('coverphoto', models.ImageField(blank=True, default='New-Logo-Youtube-2.png', upload_to='cover_images/%Y/%m/%d')),
                ('about', models.TextField(blank=True, null=True)),
                ('youtube', models.URLField(blank=True, null=True)),
                ('twitter', models.URLField(blank=True, null=True)),
                ('instagram', models.URLField(blank=True, null=True)),
                ('pinterest', models.URLField(blank=True, null=True)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('website', models.URLField(blank=True)),
                ('picture', models.ImageField(blank=True, default='New-Trackstarz-App-logo.png', upload_to='profile_images/%Y/%m/%d')),
                ('slug', models.SlugField()),
                ('friends', models.ManyToManyField(blank=True, to='api.UserProfile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Single',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(blank=True, default='', null=True)),
                ('songname', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('artist', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('firstname', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('lastname', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('email', models.EmailField(blank=True, default='', max_length=254)),
                ('website', models.URLField(blank=True, default='')),
                ('features', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('genres', models.CharField(blank=True, default='none', max_length=40, null=True)),
                ('producer', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('albumtitle', models.CharField(blank=True, default='', max_length=40, null=True)),
                ('albumreleasedate', models.DateTimeField(auto_now=True)),
                ('bio', models.TextField(blank=True, default='', null=True)),
                ('twitter', models.URLField(blank=True, default='')),
                ('facebook', models.URLField(blank=True, default='')),
                ('spotify', models.URLField(blank=True, default='')),
                ('itunes', models.URLField(blank=True, default='')),
                ('soundcloud', models.URLField(blank=True, default='')),
                ('youtube', models.URLField(blank=True, default='')),
                ('coverart', models.ImageField(blank=True, default='New-Trackstarz-App-logo.png', null=True, upload_to='cover_art/%Y/%m/%d/')),
                ('mp3', models.FileField(blank=True, default='Good_Enough_Performance_Track.mp3', null=True, upload_to='mp3s/%Y/%m/%d')),
                ('press', models.ImageField(blank=True, default='New-Trackstarz-App-logo.png', null=True, upload_to='press/%Y/%m/%d')),
                ('label', models.CharField(blank=True, max_length=40, null=True)),
                ('pitch', models.TextField(blank=True, default='', null=True)),
                ('paid', models.BooleanField(blank=True, default=False, null=True)),
                ('sent', models.BooleanField(blank=True, default=False, null=True)),
                ('amount', models.IntegerField(default=50)),
                ('state', models.CharField(blank=True, choices=[('Pending', 'Pending'), ('Scheduled', 'Scheduled'), ('Delivered', 'Delivered')], default='Pending', max_length=30, null=True)),
                ('scheduled', models.DateTimeField(auto_now=True)),
                ('sentdate', models.DateTimeField(auto_now=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]