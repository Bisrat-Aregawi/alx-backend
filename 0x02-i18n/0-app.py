#!/usr/bin/env python3
"""Module defines single flask route to `/`
"""
from typing import Any
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index() -> Any:
    """Index route handler function"""
    return render_template("0-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
