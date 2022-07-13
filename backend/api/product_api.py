from flask import Blueprint
from services import show_products_service, auth_service


product_route = Blueprint("product_route", __name__)


@product_route.route("/api/product/", methods=["GET"])
@auth_service.login_required
def show_products():
    """Function to send product informations under .json format"""
    return show_products_service()
