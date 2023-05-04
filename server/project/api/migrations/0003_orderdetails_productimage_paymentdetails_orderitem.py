# Generated by Django 4.2 on 2023-05-04 18:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_discount_giftcard_cartitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderDetails',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order_date', models.DateField(auto_now_add=True)),
                ('order_number', models.CharField(max_length=12)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('color_name', models.CharField(max_length=20)),
                ('hexacode', models.CharField(max_length=6)),
                ('image_url', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.product')),
            ],
        ),
        migrations.CreateModel(
            name='PaymentDetails',
            fields=[
                ('payment_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('provider', models.CharField(max_length=20)),
                ('payment_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order_details', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.orderdetails')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('order_details', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.orderdetails')),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.product')),
            ],
        ),
    ]
