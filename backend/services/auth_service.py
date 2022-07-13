import functools
from flask import jsonify, session, make_response
from werkzeug.exceptions import HTTPException, NotFound, Unauthorized, Forbidden
from model import User, user_schema, signup_schema, users_schema, login_schema
from utils import db
import sqlalchemy as sa
import hashlib
import bcrypt
import base64


def show_all_users():
    """Function to show all users"""
    try:
        users = db.session.query(User).all()
        users = users_schema.dump(users)

        db.session.close()
        return jsonify(users)

    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


# CONNEXION
def login_service(user):
    """return True if the user is recognized et False he didn't. Open user session.
    this boolean is captured by the front"""
    try:
        data = login_schema.load(user)
        data["username_or_email"] = data["username_or_email"].lower()

    except Exception as e:
        return "erreur", 400

    if "@" in data["username_or_email"]:
        user_in_bdd: User = (
            db.session.query(User)
            .filter(User.user_email == data["username_or_email"])
            .first()
        )

        print("user1=", user_in_bdd)

    else:
        user_in_bdd: User = (
            db.session.query(User)
            .filter(User.user_name == data["username_or_email"])
            .first()
        )

        print("user2=", user_in_bdd)

    if user is None:
        db.session.close()
        print("no user")
        return jsonify(False)

    if not check_password(user_in_bdd, data["password"]):
        db.session.close()
        print("invalid passwd")
        return jsonify(False)

    session["user_email"] = user_in_bdd.user_email
    session["user_id"] = user_in_bdd.user_id
    session["user_name"] = user_in_bdd.user_name
    session["is_admin"] = user_in_bdd.is_admin

    user_in_bdd = user_schema.dump(user_in_bdd)

    db.session.close()
    return jsonify(user_in_bdd)


def get_current_user():
    if "user_email" in session:
        current_user_data: User = (
            db.session.query(User).filter(User.user_id == session["user_id"]).first()
        )
        return current_user_data
    return False


# STATE
def logged_in_service():
    """Check if the user is connected with email adress"""
    if get_current_user():
        user_in_bdd = user_schema.dump(get_current_user())
        return jsonify(user_in_bdd)
    else:
        return jsonify(False)


# CHECK AUTHORIZATION
def check_current_user():
    curr_user = get_current_user()
    if not curr_user:
        raise Unauthorized()


def check_if_user_is_admin():
    curr_user = get_current_user()
    if not curr_user.is_admin:
        raise Forbidden()


def check_company_access(kwargs):
    """Check company_id of current_user, return comp_id"""
    curr_user = get_current_user()
    if curr_user:
        if not curr_user.is_admin:
            if curr_user.company_id != kwargs["id_company"]:
                raise Forbidden()


# AUTHORIZATION DECORATORS
def login_required(func):
    """Check if the user is connected, return Forbiden Request (401)"""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        check_current_user()
        return func(*args, **kwargs)

    return wrapper


def access_admin(func):
    """Check if the user is admin, return Forbiden Request (403)"""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        check_if_user_is_admin()
        return func(*args, **kwargs)

    return wrapper


def access_company(func):
    """Check if user's company has rights to access to request data,
    return Forbiden Request (403)"""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        check_company_access(kwargs)
        return func(*args, **kwargs)

    return wrapper


# PASSWORD
def pre_hash_password(password: str):
    """Using module that hash password but not completly secure"""
    return base64.b64encode(hashlib.sha3_256(str(password).encode("utf-8")).digest())


def check_password(user: User, input_password: str):
    """Compare password in bdd alrealdy hashed with input password. Return true if the password is the same"""
    return bcrypt.checkpw(pre_hash_password(input_password), user.user_password_hash)


def change_password(old_password: str, new_password: str):
    user: User = (
        db.session.query(User).filter(User.user_email == session["user_email"]).first()
    )

    if not check_password(user, old_password):
        db.session.close()
        # db.session.close()  # check if old password is correct
        return jsonify(False)

    else:
        user.user_password_hash = bcrypt.hashpw(
            pre_hash_password(new_password), bcrypt.gensalt()
        )
        db.session.commit()
        db.session.close()
        print("mot de passe changé avec succès")

        return jsonify(True)


# REGISTRATION
def signup_service(user):
    """Add in bdd a new user"""
    try:
        data = signup_schema.load(user)
        data["user_name"] = data[
            "user_name"
        ].lower()  # create dict with input from front
        data["user_email"] = data["user_email"].lower()
        data["company_id"] = int(data["company_id"])
        data["is_admin"] = True if data["company_id"] == 1 else False

        passwd = data["user_password"]
        hashed_password = bcrypt.hashpw(pre_hash_password(passwd), bcrypt.gensalt())
        # hash the password before posting it in bdd using pre_hash function (double hash)

    except Exception as e:
        print(e)
        return "erreur", 400

    try:  # write the new user in bdd
        u = User(
            user_name=data["user_name"],
            user_email=data["user_email"],
            user_password_hash=hashed_password,
            company_id=data["company_id"],
            is_admin=data["is_admin"],
        )

        db.session.add(u)
        db.session.commit()
        db.session.close()
    except Exception as e:
        print(e)
        return "erreur", 400

    return ""


# command for migration : ALTER TABLE user CHANGE COLUMN user_password_hashed user_password_hashed BLOB ;


# DECONNEXION
def logout_service():
    """Clear the session data when logout"""
    session.clear()
    return ""
