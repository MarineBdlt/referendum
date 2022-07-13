from flask import Blueprint, request

from services import (
    add_vote_service,
    all_votes,
    budget_used_service,
    get_company_votes_service,
    votes_with_company_name,
    votes_on_a_ticket,
    auth_service,
)

vote_route = Blueprint("vote_route", __name__)


@vote_route.route("/api/vote/add_votes/", methods=["POST"])
@auth_service.login_required
def add_vote():
    """Function to add new votes"""
    data = request.get_json()
    return add_vote_service(data)


@vote_route.route("/api/vote/all_votes/", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def get_all_votes():
    """Function to get all votes"""
    return all_votes()


@vote_route.route("/api/vote/get_votes/<int:id_company>", methods=["GET"])
@auth_service.login_required
@auth_service.access_company
def get_company_votes(id_company: int):
    """Function to get votes for a given company"""
    return get_company_votes_service(id_company)


@vote_route.route(
    "/api/vote/budget_used/<int:id_company>/<int:id_product>", methods=["GET"]
)
@auth_service.login_required
@auth_service.access_company
def budget_used(id_company: int, id_product: int):
    """Function to get the budget since the previous vote"""
    return budget_used_service(id_company, id_product)


@vote_route.route("/api/vote/amount_ticket/<int:id_ticket>", methods=["GET"])
def amount_ticket(id_ticket):
    """Fucntion to get amount by ticket"""
    return votes_on_a_ticket(id_ticket)


@vote_route.route("/api/vote/company_name/<int:id_ticket>", methods=["GET"])
@auth_service.login_required
@auth_service.access_admin
def company_and_votes(id_ticket):
    """Function that return votes and company name for each ticket"""
    return votes_with_company_name(id_ticket)
