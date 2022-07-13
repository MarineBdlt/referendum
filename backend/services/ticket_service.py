# FOR ROUTES DETAILS FUNCTIONS
from flask import make_response
from flask.json import jsonify
from utils import db
from model import Ticket, ticket_schema, tickets_schema, Product
import json


def add_ticket_service(ticket_data):
    """Function to add a new ticket"""
    try:
        new_ticket = Ticket(**ticket_data)
        db.session.add(new_ticket)
        db.session.commit()
        return ticket_schema.dump(new_ticket)
    except Exception as e:
        print(e)
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)


def show_tickets_service():
    """Function to show all tickets"""
    try:
        tickets = (
            db.session.query(Ticket)
            .join(Product, Product.product_id == Ticket.product_id)
            .order_by(Ticket.creation_date)
            .all()
        )

        tickets = tickets_schema.dump(tickets)
        data = json.dumps(tickets)  # POURQUOI DATA NON UTILISE ?

        db.session.close()
        return jsonify(tickets)
    except Exception as e:
        print(e)
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)


def show_tickets_by_product_service(id):
    """Function to show all tickets from one specific product"""
    try:
        tickets = db.session.query(Ticket).filter_by(product_id=id, archived="false")
        tickets = tickets_schema.dump(tickets)
        db.session.close()
        return jsonify(tickets)

    except Exception as e:
        print(e)
        import traceback
        traceback.print_exc()
        return make_response({'message': str(e)}, 404)


def archived_tickets_service(id):
    """Function to archived one ticket"""
    try:
        ticket = db.session.query(Ticket).filter(Ticket.number_id == id).first()
        ticket.archived = True
        db.session.commit()
        db.session.close()
        return ""

    except Exception as e:
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def restored_tickets_service(id):
    """Function to restored one ticket"""
    try:
        ticket = db.session.query(Ticket).filter(Ticket.number_id == id).first()
        ticket.archived = False
        db.session.commit()
        db.session.close()
        return ""

    except Exception as e:
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def delete_ticket_service(id):
    """Function to delete ticket"""
    try:
        db.session.query(Ticket).filter(Ticket.number_id == id).delete()
        db.session.commit()
        db.session.close()
        return ""
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def filter_tickets_service(filtre):
    """Function to filter tickets"""

    try:
        if filtre == "archived":
            tickets = db.session.query(Ticket).filter(Ticket.archived == True)
        elif filtre == "restored":
            tickets = db.session.query(Ticket).filter(Ticket.archived == False)
        elif filtre == "date":
            tickets = db.session.query(Ticket).order_by(Ticket.creation_date)
        elif filtre == "complexity":
            tickets = db.session.query(Ticket).order_by(Ticket.complexity)
        elif filtre == "opsready":
            tickets = db.session.query(Ticket).filter(Ticket.product_id == 1)
        elif filtre == "opteam":
            tickets = db.session.query(Ticket).filter(Ticket.product_id == 2)

        tickets = tickets_schema.dump(tickets)
        db.session.close()
        return jsonify(tickets)

    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def modif_ticket_service(id_to_modif, ticket_data):
    """Function to change  ticket"""
    print("test")
    try:
        ticket_modif = Ticket(**ticket_data)

        ticket = (
            db.session.query(Ticket).filter(Ticket.number_id == id_to_modif).first()
        )

        ticket.product_id = ticket_modif.product_id
        ticket.title = ticket_modif.title
        ticket.content = ticket_modif.content
        ticket.complexity = ticket_modif.complexity
        ticket.depends_of = ticket_modif.depends_of

        db.session.commit()
        db.session.close()
        return ""
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def detail_ticket_service(id):
    """Function to show detail ticket"""
    try:
        ticket = db.session.query(Ticket).filter(Ticket.number_id == id)
        ticket = tickets_schema.dump(ticket)
        db.session.close()
        print("ticket in detail", ticket)
        return jsonify(ticket)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
