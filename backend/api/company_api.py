from flask import Blueprint
from services import show_company_service, show_company_by_id, auth_service

company_route = Blueprint("company_route", __name__)


@company_route.route("/api/company/", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def show_company():
    """Function to send company informations under .json format"""
    return show_company_service()


@company_route.route("/api/company/<int:id_company>", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def company_by_id(id_company):
    """Function to send company informations under .json format"""
    return show_company_by_id(id_company)
