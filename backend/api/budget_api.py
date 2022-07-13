from flask import Blueprint, request
from services import (
    get_all_budgets_service,
    show_budget_service,
    add_budget_service,
    show_budget_bycompany_service,
    auth_service,
)

budget_route = Blueprint("budget_route", __name__)


@budget_route.route("/api/budget/add_budget/", methods=["POST"])
@auth_service.login_required
@auth_service.access_admin
def add_budget():
    """Function to add a new budget"""
    data = request.get_json()
    return add_budget_service(data)


@budget_route.route("/api/budgets/", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def get_all_budgets():
    """Function to add a new budget"""
    return get_all_budgets_service()


@budget_route.route("/api/budget/<int:id_company>/<int:id_product>", methods=["GET"])
@auth_service.login_required
@auth_service.access_company
def show_budget(id_company: int, id_product: int):
    """Function to show budget"""
    return show_budget_service(id_company, id_product)


@budget_route.route("/api/budget/<int:id_company>/", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def show_budget_bycompany(id_company: int):
    """Function to show budget"""
    return show_budget_bycompany_service(id_company)
