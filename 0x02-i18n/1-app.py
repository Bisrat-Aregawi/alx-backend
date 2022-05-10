#!/usr/bin/env python3
"""Module for basic babel setup
"""
from flask import Flask, render_template
from flask_babel import Babel
from typing import Any


app = Flask(__name__)


class Config(object):
    """Configuration class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"
    pass


app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index() -> Any:
    """Index route handler function"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
