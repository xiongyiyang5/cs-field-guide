# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-12-20 01:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0028_auto_20181017_0346'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='introduction_es',
            field=models.TextField(default='', null=True),
        ),
        migrations.AddField(
            model_name='chapter',
            name='name_es',
            field=models.CharField(default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='chaptersection',
            name='content_es',
            field=models.TextField(default='', null=True),
        ),
        migrations.AddField(
            model_name='chaptersection',
            name='name_es',
            field=models.CharField(default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='glossaryterm',
            name='definition_es',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='glossaryterm',
            name='term_es',
            field=models.CharField(max_length=200, null=True, unique=True),
        ),
    ]
