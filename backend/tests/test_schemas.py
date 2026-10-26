import pytest
from pydantic import ValidationError

from app.schemas import OrderCreate, ProductCreate, ProductOut


def valid_product(**overrides):
    product = {
        "name": "Camisa esencial",
        "description": "Camisa de algodón",
        "price": 29.9,
        "category": "Camisas",
        "variants": [{"size": "M", "color": "Negro", "stock": 5}],
    }
    product.update(overrides)
    return product


def test_product_requires_positive_price_and_at_least_one_variant():
    with pytest.raises(ValidationError):
        ProductCreate(**valid_product(price=0))

    with pytest.raises(ValidationError):
        ProductCreate(**valid_product(variants=[]))

    with pytest.raises(ValidationError):
        ProductCreate(**valid_product(variants=[{"size": "M", "color": "Negro", "stock": -1}]))


def test_product_rejects_duplicate_size_color_combinations():
    with pytest.raises(ValidationError):
        ProductCreate(
            **valid_product(
                variants=[
                    {"size": "M", "color": "Negro", "stock": 5},
                    {"size": "m", "color": "negro", "stock": 2},
                ]
            )
        )


def test_product_rejects_unexpected_fields():
    with pytest.raises(ValidationError):
        ProductCreate(**valid_product(internal_note="should not be accepted"))


def test_order_requires_at_least_one_item_and_positive_quantity():
    with pytest.raises(ValidationError):
        OrderCreate(items=[])

    with pytest.raises(ValidationError):
        OrderCreate(
            items=[
                {
                    "product_id": "shirt-id",
                    "size": "M",
                    "color": "Negro",
                    "quantity": 0,
                }
            ]
        )


def test_order_requires_selected_size_and_color():
    with pytest.raises(ValidationError):
        OrderCreate(items=[{"product_id": "shirt-id", "quantity": 1}])


def test_product_output_accepts_mongo_id_and_calculates_total_stock():
    product = ProductOut.model_validate(
        {
            "_id": "product-123",
            **valid_product(
                variants=[
                    {"size": "M", "color": "Negro", "stock": 5},
                    {"size": "L", "color": "Negro", "stock": 3},
                ]
            ),
            "image_url": None,
            "active": True,
        }
    )

    assert product.id == "product-123"
    assert product.stock == 8
