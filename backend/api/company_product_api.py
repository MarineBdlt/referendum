from flask import Blueprint
from services import get_product_by_company_service, auth_service


company_product_route = Blueprint("company_product_route", __name__)


@company_product_route.route(
    "/api/company_product/product/<int:id_company>", methods=["GET"]
)
@auth_service.login_required
def get_product_by_company(id_company: int):
    return get_product_by_company_service(id_company)
