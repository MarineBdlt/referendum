from datetime import datetime
from utils import db, ma
from .product_model import ProductSchema
from .company_model import CompanySchema
from sqlalchemy.orm import backref


class Budget(db.Model):
    """Class for budget's attributes and methods"""

    __tablename__ = "budget"

    budget_id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    total_budget = db.Column(db.Integer, nullable=False)
    company_id = db.Column(
        db.Integer, db.ForeignKey("company.company_id"), nullable=False
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey("product.product_id"), nullable=False
    )
    start_time = db.Column(db.Date, nullable=False)
    end_time = db.Column(db.Date, nullable=False)

    product = db.relationship("Product", backref=backref("budget"))
    company = db.relationship("Company", backref=backref("budget"))


class BudgetSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "budget_id",
            "total_budget",
            "company_id",
            "product_id",
            "start_time",
            "end_time",
        )
        model = Budget()

    product = ma.Nested(ProductSchema)
    company = ma.Nested(CompanySchema)


budget_schema = BudgetSchema()
budgets_schema = BudgetSchema(many=True)
