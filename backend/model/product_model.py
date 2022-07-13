from utils import db, ma


class Product(db.Model):
    """Class for product's attributes and methods"""

    __tablename__ = "product"

    product_id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(
        db.String(50)
    )


class ProductSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "product_id",
            "name"
            )
        model = Product()


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
