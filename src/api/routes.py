"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Followers, Comments
from flask import request



api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/users')
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Listado de Usuarios y sus publicaciones(GET)'
    response_body['results'] = result
    return response_body, 200


#Endpoints de Publicaciones (Post) CRUD
@api.route('/posts', methods=['GET','POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(), 
                    img_url = data.get('img_url'),
                    user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicacion (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/posts/<int:id>', methods=['GET','PUT','DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La Publicacion: {id} no existe'
        response_body['results'] = {}    
        return response_body, 404
    print(row.serialize())
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicacion: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.img_url = data.get('img_url')
        row.user_id = data.get('user_id')
        db.session.commit()
        response_body['message'] = f'Publicacion: {id} modificada - (PUT)'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Publicacion: {id} eliminada - (DELETE)'
        response_body['results'] = {}    
        return response_body, 200
    

@api.route('/followers', methods=['GET', 'POST'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas los Followers (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        print(data)
        row = Followers(id = data.get('id'),
                        following_id = data.get('following_id'),
                        follower_id = data.get('follower_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un Follower (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200
    

@api.route('/comments')
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos los Comentarios (GET)'
        response_body['results'] = result
        return response_body, 200
        