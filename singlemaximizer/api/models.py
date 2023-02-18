from __future__ import unicode_literals
from statistics import mode
from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.


GENRES = (
	('Hip Hop', 'hip hop'),
	('CHH', 'chh'),
    ('R&B', 'randb'),
	('Pop', 'pop'),
    ('Rock', 'rock'),
    ('CCM', 'ccm'),
    ('Gospel', 'gospel'),
    ('Country', 'country')
)

STATES = (
	('Pending', 'Pending'),
	('Scheduled', 'Scheduled'),
	('Delivered', 'Delivered')
)

MEDIUMS = (
	('Audio', 'audio'),
	('Video', 'video'),
	('Instrumental', 'instrumental')
)

def coverartupload_path(instance, filename):
    return 'cover_art/%Y/%m/%d/{filename}'.format(filename=filename)


class Single(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField(null=True, blank=True, default='')
    songname = models.CharField(max_length=40, null=True, blank=True, default='')
    artist = models.CharField(max_length=40, null=True, blank=True, default='')
    firstname = models.CharField(max_length=40, null=True, blank=True, default='')
    lastname = models.CharField(max_length=40, null=True, blank=True, default='')
    email = models.EmailField(max_length=254, blank=True, default='')
    website = models.URLField(blank=True, default='')
    features = models.CharField(max_length=40, null=True, blank=True, default='')
    genres = models.CharField(max_length=40, null=True, default='none', blank=True)
    producer = models.CharField(max_length=40, null=True, blank=True, default='')
    albumtitle = models.CharField(max_length=40, null=True, blank=True, default='')
    albumreleasedate = models.DateTimeField(auto_now=True)
    bio = models.TextField(null=True, blank=True, default='')
    twitter = models.URLField(blank=True, default='')
    facebook = models.URLField(blank=True, default='')
    spotify = models.URLField(blank=True, default='')
    itunes = models.URLField(blank=True, default='')
    soundcloud = models.URLField(blank=True, default='')
    youtube = models.URLField(blank=True, default='')
    coverart = models.ImageField(upload_to='cover_art/%Y/%m/%d/', null=True, blank=True, default='New-Trackstarz-App-logo.png')
    mp3 = models.FileField(upload_to='mp3s/%Y/%m/%d', null=True, blank=True, default='Good_Enough_Performance_Track.mp3')
    press = models.ImageField(upload_to='press/%Y/%m/%d', null=True, blank=True, default='New-Trackstarz-App-logo.png')
    label = models.CharField(max_length=40, null=True, blank=True)
    pitch = models.TextField(null=True, blank=True, default='')
    paid = models.BooleanField(null=True, blank=True, default=False)
    sent = models.BooleanField(null=True, blank=True, default=False)
    amount = models.IntegerField(default=50)
    state = models.CharField(
		choices=STATES,
		max_length=30, null=True, blank=True, default="Pending")
    scheduled = models.DateTimeField(auto_now=True)
    sentdate = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]




class Outlet(models.Model):
    name = models.CharField(max_length=40, null=True, blank=True)
    contactFirstName = models.CharField(max_length=40, null=True, blank=True)
    contactLastName = models.CharField(max_length=40, null=True, blank=True)
    email = models.EmailField(max_length=254, blank=True)
    messagetemplate = models.TextField(null=True, blank=True)
    genre = models.CharField(
		choices=GENRES,
		max_length=30, null=True, blank=True)
    medium = models.CharField(
		choices=MEDIUMS,
		max_length=30, null=True, blank=True)
    website = models.URLField(max_length = 200, null=True, blank=True)
    type = models.CharField(max_length=40, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name




class MessageTemplate(models.Model):
    templatename = models.CharField(max_length=40, null=True, blank=True)
    subject = models.CharField(max_length=40, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.templatename




class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    displayname = models.CharField(max_length=40)
    startdate = models.DateField(default = timezone.now)
    coverphoto = models.ImageField(upload_to='cover_images/%Y/%m/%d', blank=True, default='New-Logo-Youtube-2.png')
    about = models.TextField(null=True, blank=True)
    youtube = models.URLField(max_length = 200, null=True, blank=True)
    twitter = models.URLField(max_length = 200, null=True, blank=True)
    instagram = models.URLField(max_length = 200, null=True, blank=True)
    pinterest = models.URLField(max_length = 200, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    website = models.URLField(blank=True)
    picture = models.ImageField(upload_to='profile_images/%Y/%m/%d', blank=True, default='New-Trackstarz-App-logo.png')
    slug = models.SlugField()
    friends = models.ManyToManyField("userprofile", blank=True)
    
    def __unicode__(self):
        return self.user.username

    def __str__(self):
        return self.user.username

    def save(self, *args,  **kwargs):
        if not self.id:
            self.slug = slugify(self.user.username)
        super(UserProfile, self).save(*args, **kwargs)
