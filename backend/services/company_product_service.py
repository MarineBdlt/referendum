from flask import make_response
from flask.json import jsonify
from utils import db
from model import CompanyProduct, company_product_schema, companies_products_schema


def get_product_by_company_service(id_company):

    try:
        products = db.session.query(CompanyProduct.product_id).filter(CompanyProduct.company_id == id_company)
        products = companies_products_schema.dump(products)
        db.session.close()
        return jsonify(products)

    except Exception as e:
        print(e)
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)
