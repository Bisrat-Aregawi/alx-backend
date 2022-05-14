#!/usr/bin/env python3
"""Module for basic babel setup"""
from flask import Flask, request
from flask_babel import Babel
from flask.templating import render_template
from typing import Union


app = Flask(__name__)


class Config(object):
    """Configurator class

    Attributes:
        LANGUAGES: list of accepted languages of the host
        BABEL_DEFAULT_LOCALE: default locale of host
        BABEL_DEFAULT_TIMEZONE: default timezone of host
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"
    pass


# Populate the config dict of app with class attributes
# of `Config` class Defined above

app.config.from_object(Config)

# Instantiate a Babel instance with app
babel = Babel(app)


@babel.localeselector
def get_locale() -> Union[str, None]:
    """Return best matched locale from user request"""
    locale_req = request.args.get("locale")

    # Return requested locale if it is supported
    if locale_req and locale_req in app.config["LANGUAGES"]:
        return locale_req
    return request.accept_languages.best_match(
        app.config["LANGUAGES"]
    )


@app.route('/')
def index() -> str:
    """Index route handler function"""
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
