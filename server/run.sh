#!/bin/bash

python -m venv ./venv
source venv/bin/activate
pip install -r requirements.txt

# un-comment following line if you want to do embedding before start
# python embedding.py

uvicorn main:app