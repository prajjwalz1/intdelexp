# Generated by Django 4.1.6 on 2023-05-13 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_product_category_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product_model',
            name='image_thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to='projects/thumbnails/'),
        ),
    ]
