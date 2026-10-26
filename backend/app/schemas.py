from datetime import datetime, timezone
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, StringConstraints

NonEmptyString = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class Schema(BaseModel):
    model_config = ConfigDict(extra="forbid")


class ProductCreate(Schema):
    name: NonEmptyString
    description: NonEmptyString
    price: float = Field(gt=0, allow_inf_nan=False)
    stock: int = Field(ge=0)
    category: NonEmptyString
    image_url: HttpUrl | None = None
    active: bool = True


class ProductUpdate(Schema):
    name: NonEmptyString | None = None
    description: NonEmptyString | None = None
    price: float | None = Field(default=None, gt=0, allow_inf_nan=False)
    stock: int | None = Field(default=None, ge=0)
    category: NonEmptyString | None = None
    image_url: HttpUrl | None = None
    active: bool | None = None


class ProductOut(ProductCreate):
    id: str = Field(validation_alias="_id")


class OrderItemCreate(Schema):
    product_id: NonEmptyString
    quantity: int = Field(gt=0)


class OrderCreate(Schema):
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemOut(Schema):
    product_id: str
    name: str
    quantity: int
    unit_price: float
    subtotal: float


class OrderOut(Schema):
    id: str
    customer: NonEmptyString
    items: list[OrderItemOut]
    total: float
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
