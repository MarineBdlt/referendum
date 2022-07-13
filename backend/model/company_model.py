from utils import db, ma


class Company(db.Model):

    __tablename__ = "company"

    company_id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    company_name = db.Column(db.String(50))


class CompanySchema(ma.Schema):
    class Meta:
        fields = ("company_id", "company_name")
        model = Company()


company_schema = CompanySchema()
companies_schema = CompanySchema(many=True)
