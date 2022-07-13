from datetime import datetime
from utils import db, ma
from .product_model import ProductSchema
from sqlalchemy.orm import backref


class Ticket(db.Model):
    """Class for ticket's attributes and methods"""

    __tablename__ = "ticket"

    number_id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    product_id = db.Column(
        db.Integer, db.ForeignKey("product.product_id"), nullable=False
    )
    title = db.Column(db.String(255))
    content = db.Column(db.String)
    complexity = db.Column(db.Integer, nullable=False)
    archived = db.Column(db.Boolean, default=False)
    creation_date = db.Column(db.Date, nullable=False, default=datetime.now)
    depends_of = db.Column(db.Integer, db.ForeignKey("ticket.number_id", ondelete='CASCADE'), nullable=True)

    product = db.relationship(
        "Product", backref=backref("tickets", lazy="joined"), lazy="joined"
    )
 

class TicketSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        fields = (
            "number_id",
            "product_id",
            "title",
            "content",
            "complexity",
            "archived",
            "creation_date",
            "depends_of",
            "product",
        )
        model = Ticket()

    product = ma.Nested(ProductSchema)


ticket_schema = TicketSchema()
tickets_schema = TicketSchema(many=True)
