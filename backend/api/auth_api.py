from flask import Blueprint, request
from services import auth_service


auth_route = Blueprint("auth", __name__)


@auth_route.route("/users/")
def show_users():
    """Return all users stocked in bdd under .json format"""
    return auth_service.show_all_users()


@auth_route.route("/users/login/", methods=["POST"])
def login():
    """Get the login request with user infos and check if the user exists in bdd. Return True if the connexion succeed"""
    user = request.get_json()
    return auth_service.login_service(user)


@auth_route.route("/users/signup/", methods=["POST"])
@auth_service.login_required
@auth_service.access_admin
def signup():
    """Registration of a new user in bdd"""
    user = request.get_json()
    return auth_service.signup_service(user)


@auth_route.route("/logout/", methods=["POST"])
def logout():
    """Clear session data"""
    return auth_service.logout_service()


@auth_route.route("/logged_in/", methods=["GET"])
def is_connected():
    """Return True if the user is loggued. Just get the state of the user"""
    return auth_service.logged_in_service()


@auth_route.route("/change_password/", methods=["POST"])
@auth_service.login_required
def change_psswd():
    data = request.get_json()
    return auth_service.change_password(data["old_password"], data["new_password"])
