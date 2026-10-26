import pytest
from pydantic import ValidationError

from app.schemas import OrderCreate, ProductCreate, ProductOut


def test_product_requires_positive_price_and_non_negative_stock():
    with pytest.raises(ValidationError):
        ProductCreate(
            name="Teclado",
            description="Teclado mecánico",
            price=0,
            stock=5,
            category="Accesorios",
        )

    with pytest.raises(ValidationError):
        ProductCreate(
            name="Teclado",
            description="Teclado mecánico",
            price=12.5,
            stock=-1,
            category="Accesorios",
        )


def test_product_rejects_unexpected_fields():
    with pytest.raises(ValidationError):
        ProductCreate(
            name="Teclado",
            description="Teclado mecánico",
            price=12.5,
            stock=5,
            category="Accesorios",
            internal_note="should not be accepted",
        )


def test_order_requires_at_least_one_positive_quantity():
    with pytest.raises(ValidationError):
        OrderCreate(items=[])

    with pytest.raises(ValidationError):
        OrderCreate(items=[{"product_id": "keyboard-id", "quantity": 0}])


def test_product_output_accepts_mongo_id_alias():
    product = ProductOut.model_validate(
        {
            "_id": "product-123",
            "name": "Teclado",
            "description": "Teclado mecánico",
            "price": 12.5,
            "stock": 5,
            "category": "Accesorios",
            "image_url": None,
            "active": True,
        }
    )

    assert product.id == "product-123"
