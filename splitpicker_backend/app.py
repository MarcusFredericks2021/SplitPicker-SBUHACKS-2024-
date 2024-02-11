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

@app.route('/', methods=('GET', 'POST'))
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

@app.route('/get_by_ids/<collection_name>/', methods = ['GET'])
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


@app.route('/update/<collection_name>/', methods = ['PUT'])
def update_colection(collection_name):

    #NEED TO FIX GETTING REQUEST BODY

    collection = None
    request_data = None
    document = None

    try:
        request_data = request.get_json()
        document = request_data.get('document', {})
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

    print(document)

    query = {'_id' : ObjectId(document['_id'])}



    result = collection.update_one(query, {'$set': document}, upsert= False)

    return result.raw_result

