from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys

app = Flask(__name__)
cors = CORS(app)

# when you go to the root page you're greeted with a welcome message
@app.route('/')
def hello_world():
    return 'Hello, World!'
    
      
if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)