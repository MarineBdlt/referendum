from utils import db, ma
from sqlalchemy.orm import backref
from .company_model import CompanySchema
import sqlalchemy as sa


class User(db.Model):

    __tablename__ = "user"

    user_id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    user_name = db.Column(db.String(128))
    user_password_hash = db.Column(sa.LargeBinary, nullable=False)
    user_email = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    company_id = db.Column(
        db.Integer, db.ForeignKey("company.company_id"), nullable=False
    )
    company = db.relationship(
        "Company", backref=backref("users", lazy="joined"), lazy="joined"
    )


class UserSchema(ma.Schema):
    class Meta:
        fields = (
            "user_id",
            "user_name",
            "user_password_hash",
            "user_email",
            "is_admin",
            "company_id",
            "company",
        )
        model = User()

    company = ma.Nested(CompanySchema)


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class LoginSchema(ma.Schema):
    username_or_email = ma.String()
    password = ma.String()


login_schema = LoginSchema()


class SignupSchema(ma.Schema):
    user_name = ma.String()
    user_email = ma.String()
    user_password = ma.String()
    company_id = ma.Integer()
    is_admin = ma.Boolean()


signup_schema = SignupSchema()