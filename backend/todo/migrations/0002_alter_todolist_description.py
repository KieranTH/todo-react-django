# Generated by Django 5.1.3 on 2024-11-30 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todo", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="todolist",
            name="description",
            field=models.TextField(null=True),
        ),
    ]
