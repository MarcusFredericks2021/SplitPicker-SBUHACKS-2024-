import json
import os
import re
import string
from bson.objectid import ObjectId
from functools import wraps
from bson.json_util import dumps


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

class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        # if isinstance(o, datetime.datetime):
        #     return str(o)
        return json.JSONEncoder.default(self, o)


# use the modified encoder class to handle ObjectId & datetime object while jsonifying the response.


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
app.json_encoder = JSONEncoder

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
@app.route('/', methods=['GET', 'POST'])
def index():
    return "Hello World!"


@app.route('/get/<collection_name>/', methods = ['GET'])
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

    res = dumps(data)
    return res

@app.route('/get_by_ids/<collection_name>/', methods = ['POST'])
def get_collection_by_id(collection_name):
    collection = None

    request_data = None
    ids = None
    try:
        request_data = request.get_json()
        ids = request_data.get('ids', [])
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400

    #print(id)

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

    object_ids = [ObjectId(id) for id in ids]

    documents = list(collection.find({'_id': {'$in': object_ids}}))

    res = dumps(documents)

    return res

@app.route('/get_user_by_firebase_id/<user_id>', methods = ['GET'])
def get_user_by_firebase_id(user_id):
    if not user_id:
        return {'status': False, "message": "Please provide Firebase ID (user_id)"}, 400

    collection = db["Users"]

    documents = list(collection.find({'firebase_id': user_id}))[0]

    res = dumps(documents)

    return res

@app.route('/update/<collection_name>/', methods = ['POST'])
def update_collection_by_id(collection_name):

    collection = None
    request_data = None
    document = None

    try:
        request_data = request.get_json()
        document = request_data.get('document', {})
        # print("printing document")
        # print(document)
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400


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

    #print(document)

    query = None
    result = None
    try:
        query = {'_id' : ObjectId(document['_id']['$oid'])}
        del document['_id']
        result = collection.update_one(query, {'$set': document}, upsert= False)
    except Exception as _:
        print(_)
        return {'status': False, "message": "Update Query broke OR Invalid ObjectId you stupid"}, 400

    res = dumps(result.raw_result)

    return res

@app.route('/create_new_user', methods=['POST'])
def create_new_user():
    request_body = None
    try:
        request_body = request.json
    except Exception as _:
        return {'status': False, "message": "Please provide proper request body."}, 400
    
    username = request_body.get("username")
    email = request_body.get("email")
    full_name = request_body.get("full_name")
    user_id = request_body.get("firebase_id")


    if not username or not email  or not full_name or not user_id:
        return {'status': False, "message": "Please provide proper request body."}, 400

    res = None
    try:
        res = users_collection.insert_one({
            "username": username,
            "email": email,
            "full_name": full_name,
            "firebase_id": user_id,
            "splits":[],
        })
    except Exception as _:
        print(_)
        return {'status': False, "message": "Error Uploading User Data"}, 400
    
    #print(res)
    #res = dumps(res)

    return f"Successfully created user data in MongoDB for user: {str(user_id)}!", 200

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
        # Update the user document with the new split ID
        user_document = users_collection.find_one({"_id": ObjectId(owner)})
        if user_document:
            # Add the new split ID to the 'splits' array in the user document
            splits = user_document.get('splits', [])
            splits.append(inserted_id)
            users_collection.update_one({"_id": ObjectId(owner)}, {"$set": {"splits": splits}})
            # Return the uploaded document and a success response
            response = dumps(uploaded_document)
            return response, 200
        else:
            return {'status': False, "message": "User not found."}, 404
    else:
        return {'status': False, "message": "Failed to retrieve uploaded document."}, 500

