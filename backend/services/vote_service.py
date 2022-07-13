import json
from logging import log
from flask import make_response
from flask.json import jsonify
from utils import db
from model import Vote, votes_schema, votes_schema, Product, Company

# from service import show_company_service


def add_vote_service(vote_data):
    """Function to add a new ticket"""
    try:
        new_votes = [Vote(**v) for v in vote_data]
        for v in new_votes:
            db.session.merge(v)
        db.session.commit()
        return "", 200
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def all_votes():
    try:
        votes = db.session.query(Vote).order_by(Vote.date).all()

        votes = votes_schema.dump(votes)
        data = json.dumps(votes)

        db.session.close()
        return jsonify(votes)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def get_company_votes_service(id_company: int):
    """Function to get votes for a given company"""
    try:
        votes = db.session.query(Vote).filter(Vote.company_id == id_company).all()
        votes = votes_schema.dump(votes)
        db.session.close()
        return jsonify(votes)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def budget_used_service(id_company: int, id_product: int):
    """Function to get the budget since the previous vote"""
    try:

        all_vote = []
        for e in (
            db.session.query(Vote.amount)
            .filter(Vote.company_id == id_company)
            .filter(Vote.product_id == id_product)
            .all()
        ):
            all_vote.append(e[0])
        db.session.close()
        return jsonify(sum(all_vote))
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def votes_on_a_ticket(number_ticket_id: int):
    """Function to get the budget and company of a ticket"""
    amounts_row = (
        db.session.query(Vote.company_id, Vote.amount)
        .filter(Vote.number_ticket_id == number_ticket_id)
        .all()
    )

    amounts = [{"company_id": amount[0], "amount": amount[1]} for amount in amounts_row]
    db.session.close()
    return jsonify(amounts)


def votes_with_company_name(number_ticket_id: int):
    try:
        votes_row = (
            db.session.query(Vote.company_id, Vote.amount)
            .filter(Vote.number_ticket_id == number_ticket_id)
            .order_by(-Vote.amount)
        )
        # companies = show_company_service()
        companies = db.session.query(Company).all()
        votes = list()
        for vote in votes_row:
            for c in companies:
                if c.company_id == vote[0]:
                    votes.append({"company_name": c.company_name, "amount": vote[1]})
        print(votes)
        return jsonify(votes)

    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
