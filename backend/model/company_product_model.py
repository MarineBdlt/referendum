from utils import db, ma
from .product_model import ProductSchema
from .company_model import CompanySchema
from sqlalchemy.orm import backref


class CompanyProduct(db.Model):

    __tablename__ = "company_product"

    cp_id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    company_id = db.Column(
        db.Integer, db.ForeignKey("company.company_id"), nullable=False
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey("product.product_id"), nullable=False
    )

    company = db.relationship("Company", lazy="joined")
    product = db.relationship("Product", lazy="joined")


class CompanyProductSchema(ma.Schema):
    class Meta:
        fields = ("cp_id" "company_id", "product_id")
        model = CompanyProduct()

    company = ma.Nested(CompanySchema)
    product = ma.Nested(ProductSchema)


company_product_schema = CompanyProductSchema()
companies_products_schema = CompanyProductSchema(many=True)
