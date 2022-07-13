from flask import Blueprint, request, Response

from services import (
    add_ticket_service,
    show_tickets_service,
    show_tickets_by_product_service,
    archived_tickets_service,
    restored_tickets_service,
    delete_ticket_service,
    filter_tickets_service,
    modif_ticket_service,
    detail_ticket_service,
    auth_service,
)


ticket_route = Blueprint("ticket_route", __name__)


@ticket_route.route("/api/tickets/", methods=["GET"])
@auth_service.login_required
def show_tickets():
    """Function to send tickets informations under .json format"""
    return show_tickets_service()


@ticket_route.route("/api/product/tickets/<int:id>", methods=["GET"])
@auth_service.login_required
def show_tickets_by_product(id: int):
    """Function to send tickets informations under .json format"""
    return show_tickets_by_product_service(id)


@ticket_route.route("/api/tickets/filter/<string:filtre>", methods=["GET"])
@auth_service.login_required
def filter_tickets(filtre: str):
    """function to filter ticket"""
    return filter_tickets_service(filtre)


@ticket_route.route("/api/tickets/detail/<int:id>", methods=["GET"])
@auth_service.login_required
def detail_ticket(id: int):
    """Function to show detail ticket"""
    return detail_ticket_service(id)


@ticket_route.route("/api/ticket/add_ticket/", methods=["POST"])
@auth_service.login_required
@auth_service.access_admin
def add_ticket():
    """Function to add a new ticket"""
    data = request.get_json()
    return add_ticket_service(data)


@ticket_route.route("/api/tickets/archived/<int:id>", methods=["PUT"])
@auth_service.login_required
@auth_service.access_admin
def archived_tickets(id: int):
    """Function to archived one ticket"""
    return archived_tickets_service(id)


@ticket_route.route("/api/tickets/restored/<int:id>", methods=["PUT"])
@auth_service.login_required
@auth_service.access_admin
def restored_tickets(id: int):
    """Function to restore one ticket"""
    return restored_tickets_service(id)


@ticket_route.route("/api/tickets/delete/<int:id>", methods=["DELETE"])
@auth_service.login_required
@auth_service.access_admin
def delete_ticket(id: int):
    """function to delete ticket"""
    return delete_ticket_service(id)


@ticket_route.route("/api/ticket/modif_ticket/<int:id>", methods=["PUT"])
@auth_service.login_required
@auth_service.access_admin
def modif_ticket(id: int):
    """function to change ticket"""
    data = request.get_json()
    return modif_ticket_service(id, data)
