from flask import make_response
from flask.json import jsonify
from utils import db
import json
from model import Budget, budget_schema, budgets_schema


def get_all_budgets_service():
    """Function to get all budgets"""
    try:
        budgets = db.session.query(Budget).all()
        budgets = budgets_schema.dump(budgets)

        db.session.close()
        return jsonify(budgets)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def add_budget_service(budget_data):
    """Function to add a new budget"""
    print("budget service")
    try:
        new_budget = Budget(**budget_data)
        db.session.add(new_budget)
        print("new budget", new_budget)
        db.session.commit()
        return budget_schema.dump(new_budget)

    except Exception as e:
        print(e)
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 503)


def show_budget_service(id_company: int, id_product: int):
    """Function to show budget for company 1"""
    try:
        budget = (
            db.session.query(Budget)
            .filter(Budget.company_id == id_company, Budget.product_id == id_product)
            .first()
        )
        budget = budget_schema.dump(budget)

        db.session.close()
        return jsonify(budget)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


def show_budget_bycompany_service(id_company: int):
    try:
        budget = db.session.query(Budget).filter(Budget.company_id == id_company).all()

        budget = budgets_schema.dump(budget)

        db.session.close()
        return jsonify(budget)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
