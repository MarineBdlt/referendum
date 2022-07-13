from datetime import datetime
from itertools import product
from utils import db, ma
from .ticket_model import TicketSchema
from .company_model import CompanySchema
from .budget_model import BudgetSchema
from sqlalchemy.orm import backref


class Vote(db.Model):
    """class for vote's attributes and methods"""

    __tablename__ = "vote"
    __table_args__ = (
        db.Index(
            "uq_vote__budget_ticket",
            "budget_id",
            "number_ticket_id",
            "company_id",
            unique=True,
        ),
    )

    vote_id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.budget_id"), nullable=False)
    amount = db.Column(db.Integer, nullable=False)

    product_id = db.Column(
        db.Integer, db.ForeignKey("product.product_id"), nullable=False
    )

    company_id = db.Column(
        db.Integer, db.ForeignKey("company.company_id"), nullable=False
    )
    date = db.Column(db.Date, nullable=False, default=datetime.now)
    number_ticket_id = db.Column(
        db.Integer,
        db.ForeignKey("ticket.number_id", ondelete="CASCADE"),
        nullable=False,
    )

    company = db.relationship("Company", backref=backref("vote"))
    budget = db.relationship("Budget", backref=backref("vote"))
    product = db.relationship("Product", backref=backref("vote"))


class VoteSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "vote_id",
            "budget_id",
            "amount",
            "company_id",
            "date",
            "number_ticket_id",
        )
        model = Vote()

    ticket = ma.Nested(TicketSchema)
    company = ma.Nested(CompanySchema)
    budget = ma.Nested(BudgetSchema)


vote_schema = VoteSchema()
votes_schema = VoteSchema(many=True)
