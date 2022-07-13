from flask import make_response
from flask.json import jsonify
from utils import db
from model import Company, companies_schema


def show_company_service():
    """Function to show all company"""
    try:
        company = db.session.query(Company).all()
        company = companies_schema.dump(company)
        db.session.close()
        return jsonify(company)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def show_company_by_id(id):
    """Function to show company name with company id"""
    try:
        company = db.session.query(Company).filter(Company.company_id == id)
        company = companies_schema.dump(company)
        db.session.close()

        return jsonify(company)

    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
