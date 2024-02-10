import json
import os
import re
from functools import wraps

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import auth, credentials
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from bson.json_util import dumps

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://marcusfredericks2021:WafeppXJY39n79MA@splitpickerdb.9k8wjks.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))
db = client['SplitpickerDB']

exercise_collection = db['exercise_coll']
body_part_collection = db['body_part_coll']
equipment_collection = db['equipment_coll']
target_collection = db['target_coll']
users_collection = db['Users']
splits_collection = db['Splits']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def authenticate_request(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        id_token = request.headers.get('Authorization')
        request_body = None
        try:
            request_body = request.json
        except Exception as e:
            return jsonify({'error': "Please provide valid JSON for Body Data."}), 400

        uid_token = request_body.get("user_id")
        if not uid_token:
            return jsonify({'error': "User ID missing."}), 401
        
        if id_token:
            try:
                decoded_token = auth.verify_id_token(id_token)
                uid = decoded_token['uid']
                if uid != uid_token:
                    return jsonify({'error': 'User ID provided in Body does not match User ID associated with accessToken provided.'}), 401

                return func(*args, **kwargs)
            except auth.InvalidIdTokenError as e:
                return jsonify({'error': 'Invalid ID token: ' + id_token}), 401
        else:
            return jsonify({'error': 'Authorization header missing'}), 401
    
    return wrapper

@app.route("/Authenticated", methods=['POST'])
@authenticate_request
def Authenticated():
    request_body = None
    try:
        request_body = request.json
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400

    return {"status": "Success."}, 400

@app.route('/', methods=['GET', 'POST'])
def index():
    return "Hello World!"


@app.route('/get/<collection_name>', methods = ['GET'])
def get_collection(collection_name):
    collection = None

    if collection_name == 'exercise_coll':
        collection = db[collection_name]

    elif collection_name == 'body_part_coll':
        collection = db[collection_name]

    elif collection_name == 'equipment_coll':
        collection = db[collection_name]

    elif collection_name == 'target_coll':
        collection = db[collection_name]

    elif collection_name == 'Users':
        collection = db[collection_name]

    elif collection_name == 'Splits':
        collection = db[collection_name]

    else:
        return {'status': False, "message": "Please provide proper URL parameter."}, 400

    data = list(collection.find())

    res = jsonify(data)

    return res

@app.route('/get/<collection_name>/<id>', methods = ['GET'])
def get_collection_by_id(collection_name, id):
    collection = None

    if collection_name == 'exercise_coll':
        collection = db[collection_name]

    elif collection_name == 'body_part_coll':
        collection = db[collection_name]

    elif collection_name == 'equipment_coll':
        collection = db[collection_name]

    elif collection_name == 'target_coll':
        collection = db[collection_name]

    elif collection_name == 'Users':
        collection = db[collection_name]

    elif collection_name == 'Splits':
        collection = db[collection_name]

    else:
        return {'status': False, "message": "Please provide proper URL parameter."}, 400

    data = list(collection.find_one({'_id': id}))

    res = jsonify(data)

    return res

@app.route('/test', methods=['POST'])
def create_new_user():
    request_body = None
    try:
        request_body = request.json
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400
    
    username = request_body.get("username")
    email = request_body.get("email")
    full_name = request_body.get("full_name")
    user_Id = request_body.get("firebase_id")


    if not username or not email  or not full_name or not user_Id:
        return {'status': False, "message": "Please provide proper request body."}, 400

    db.insert_one({
        "username": username,
        "email": email,
        "full_name": full_name,
        "firebase_id": user_Id
    })
    
    return request_body

@app.route('/create_new_split', methods=['POST'])
def create_new_split():
    request_body = None
    try:
        request_body = request.json
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400
    
    name = request_body.get("name")
    description = request_body.get("description")
    owner = request_body.get("owner")

    day1 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day2 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day3 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day4 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day5 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day6 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }
    day7 = {
        "is_rest": None,
        "description": None,
        "exercises": [],
        "sets": [],
        "reps": [],
        "rest": []
    }

    result = splits_collection.insert_one({
        "owner": owner,
        "name": name,
        "description": description,
        "day1": day1,
        "day2": day2,
        "day3": day3,
        "day4": day4,
        "day5": day5,
        "day6": day6,
        "day7": day7
    })

    inserted_id = result.inserted_id
    uploaded_document = splits_collection.find_one({"_id": inserted_id})

    if uploaded_document:
        response = dumps(uploaded_document)
        return response, 200
    else:
        return {'status': False, "message": "Failed to retrieve uploaded document."}, 500
