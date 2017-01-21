#
# Back-end control for tacticofthetoe.com
#
# CS50 Final Project
# author: Pranjal Verma
# 

from flask import Flask, render_template, redirect, request, session, url_for

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/about', methods=['GET'])
def about():
	return render_template('about.html')