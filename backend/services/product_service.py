from flask import make_response
from flask.json import jsonify
from utils import db
from model import Product, products_schema


def show_products_service():
    """Function to show all products"""
    try:
        products = db.session.query(Product).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
