#! /usr/bin/env python3
from flask import Flask
from flask_cors import CORS
from utils import db
from api import (
    ticket_route,
    product_route,
    vote_route,
    budget_route,
    auth_route,
    company_route,
    company_product_route,
)
from model import Product, Company, CompanyProduct, User
from services import auth_service
import argparse
import sys
import os
from pathlib import Path


def build_app(db_host, db_port, db_name, db_user, db_password, init_db=True):

    app = Flask(__name__)
    cors = CORS(
        app,
        supports_credentials=True,
        origins="*",
        allow_headers=["Cookie", "content-type"],
    )

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port:d}/{db_name}"
    app.config["SECRET_KEY"] = b"Ux3ozWY9eWR1qGESrNId9C6mdAQVTN2pCQ86lmiUQCSLq4uLrQ"
    app.config["CORS_HEADERS"] = "Content-Type"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    if init_db:
        with app.app_context():
            """Function to binds the application to the current thread"""
            db.create_all()
            print("1")
            products = db.session.query(Product).all()
            if len(products) == 0:
                db.session.add(Product(name="opsready"))
                db.session.add(Product(name="opteam"))
                db.session.commit()

            print("2")
            company = db.session.query(Company).all()
            if len(company) == 0:
                db.session.add(Company(company_name="AUM"))
                db.session.add(Company(company_name="Sdis 17"))
                db.session.add(Company(company_name="Sdis 49"))
                db.session.add(Company(company_name="Sdis 01"))
                db.session.add(Company(company_name="Sdis 78"))
                db.session.add(Company(company_name="Sdis 24"))
                db.session.add(Company(company_name="Sdis 03"))
                db.session.add(Company(company_name="Sdis 89"))
                db.session.add(Company(company_name="Sdis 77"))
            if len(company) == 9:
                db.session.add(Company(company_name="Prod"))
                db.session.add(Company(company_name="Commercial"))
                db.session.add(Company(company_name="Métier"))
                db.session.add(Company(company_name="R&D"))
                db.session.add(Company(company_name="Client"))
            db.session.commit()

            print("3")
            company_products = db.session.query(CompanyProduct).all()
            if len(company_products) == 0:
                db.session.add(CompanyProduct(company_id=1, product_id=1))
                db.session.add(CompanyProduct(company_id=1, product_id=2))
                db.session.commit()

            print("4")
            users = db.session.query(User).all()
            if len(users) == 0:
                auth_service.signup_service(
                    {
                        "user_email": "admin@admin",
                        "user_name": "admin",
                        "user_password": "adminadmin",
                        "company_id": "1",
                    }
                )
            print("5")

    app.register_blueprint(ticket_route)
    app.register_blueprint(product_route)
    app.register_blueprint(vote_route)
    app.register_blueprint(budget_route)
    app.register_blueprint(company_route)
    app.register_blueprint(auth_route, url_prefix="/api")
    app.register_blueprint(company_product_route)

    return app


class ConfigFile:
    def __init__(self, path, default_values=None):
        path = Path(path)
        self._path = path
        if path.is_file():

            data = {}
            with open(path, "r", encoding="utf8") as f:
                lines = f.readlines()
            for l in lines:
                if l.strip().startswith("#"):
                    continue

                d = l.split("=", maxsplit=1)
                if len(d) != 2:
                    continue
                data[d[0].strip()] = d[1].strip()

            for k, v in data.items():
                setattr(self, k, v)
        else:
            print(f"\nInitialisation du fichier de config ({path}): \n")
            data = {}
            for name, defaultval in default_values.items():
                if defaultval is None:
                    value = ""
                    while value == "":
                        value = input(f"{name}: ").strip()
                else:
                    value = input(f"{name} [{defaultval}]: ").strip()
                    if value == "":
                        value = str(defaultval).strip()

                data[name] = value
                setattr(self, name, value)

            with open(path, "w") as f:
                for k, v in data.items():
                    f.write(f"{k}={v}\n")

    def save_config(self, data):
        for k, v in data.items():
            setattr(self, k, v)
        with open(self._path, "w") as f:
            for k, v in data.items():
                if k.startswith("_"):
                    continue
                f.write(f"{k}={v}\n")
                setattr(self, k, v)


def parse_arguments():
    parser = argparse.ArgumentParser(description="jurassic")

    config = ConfigFile(
        "jurassic.cfg",
        default_values={
            "db_host": "localhost",
            "db_port": 5432,
            "db_name": "jurassic",
            "db_user": "postgres",
            "db_password": None,
            "front_end_domain": "localhost:4200",
            "front_end_protocol": "http",
        },
    )

    parser.add_argument(
        "-H", "--db-host", dest="db_host", type=str, default=config.db_host
    )
    parser.add_argument(
        "-P", "--db-port", dest="db_port", type=int, default=config.db_port
    )
    parser.add_argument(
        "-d", "--db-name", dest="db_name", type=str, default=config.db_name
    )
    parser.add_argument(
        "-u", "--db-user", dest="db_user", type=str, default=config.db_user
    )
    parser.add_argument(
        "-p", "--db-password", dest="db_password", type=str, default=config.db_password
    )
    parser.add_argument(
        "--front-end-protocol",
        dest="front_end_protocol",
        default=config.front_end_protocol,
    )
    parser.add_argument(
        "--front-end-domain", dest="front_end_domain", default=config.front_end_domain
    )

    parser.add_argument(
        "--save-config",
        "-s",
        dest="_save_config",
        default=False,
        action="store_true",
        help="store value of parameters inside config file",
    )

    argv = sys.argv[1:]
    args = parser.parse_args(argv)
    args = dict(vars(args))

    if args["_save_config"]:
        config.save_config(args)
    return args


if __name__ == "__main__":
    # création dictionnaire python
    args = parse_arguments()
    db_host = args["db_host"]
    db_port = args["db_port"]
    db_name = args["db_name"]
    db_user = args["db_user"]
    db_password = args["db_password"]
    app = build_app(db_host, db_port, db_name, db_user, db_password)
    app.run(host="0.0.0.0", port=5000, debug=True)

else:
    # ajout des variables d'environnement (qui sont définies dans entrypoint)

    wid = os.environ.get("APP_WORKER_ID", None)
    if wid is not None:
        init_db = int(wid) == 0
    else:
        init_db = True

    db_host = os.getenv("JURASSIC_DB_HOST")
    db_port = int(os.getenv("JURASSIC_DB_PORT"))
    db_name = os.getenv("JURASSIC_DB_NAME")
    db_user = os.getenv("JURASSIC_DB_USER")
    db_password = os.getenv("JURASSIC_DB_PASSWORD")

    app = build_app(db_host, db_port, db_name, db_user, db_password, init_db=init_db)
