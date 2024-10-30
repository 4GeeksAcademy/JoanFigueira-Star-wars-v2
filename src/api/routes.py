"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Followers, Characters, Planets, CharacterFavorites, PlanetFavorites, Comments
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests




api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/login", methods=['POST'])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body['message'] = 'Bad email or password'
        return response_body, 401
    print('*****************',user.serialize())
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['message'] = f'Bienvenido {email}'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as']= current_user
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
@jwt_required()
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La Publicacion: {id} no existe'
        response_body['results'] = {}    
        return response_body, 404
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'Usted no puede gestionar la publicacion: {id}'
        response_body['results'] = {}    
        return response_body, 401
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


@api.route('/users/<int:id>/following', methods=['GET'])
def follows(id):
    response_body = {}
    rows = db.session.execute(db.select(Followers).where(Followers.follower_id == id)).scalars()
    results = [row.serialize_following() for row in rows]
    response_body['message'] = f'Listado de usuarios que sigues'
    response_body['results'] = results
    return response_body, 200


api.route('/users/<int:id>/followers', methods=['GET'])
def followers(id):
    response_body = {}
    
    # Obtener usuarios que siguen al usuario con el `id` dado
    rows = db.session.execute(db.select(Followers).where(Followers.following_id == id)).scalars()

    results = [row.serialize_followers() for row in rows]
    response_body['message'] = f"Lista de usuarios que te siguen"
    response_body['results'] = results
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
        

@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = 'https://www.swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        rows = data['results']
        characters_list = []

        for row in rows:
            character_url = row['url']
            character_response = requests.get(character_url)

            if character_response.status_code == 200:
                character_data = character_response.json()
                characters_details = character_data['result']['properties']

                existing_character = Characters.query.filter_by(name=characters_details['name']).first()
                if not existing_character:
                    character = Characters(name = characters_details.get('name'),
                                        height = characters_details.get('height'),
                                        mass = characters_details.get('mass'),
                                        hair_color = characters_details.get('hair_color'),
                                        skin_color = characters_details.get('skin_color'),
                                        eye_color = characters_details.get('eye_color'),
                                        birth_year = characters_details.get('birth_year'),
                                        gender = characters_details.get('gender'))
                    
                    db.session.add(character)
                    db.session.commit()
                characters_list.append(characters_details)

            response_body['message'] = "Listado de personajes"
            response_body['results'] = characters_list
    return response_body, 200


@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    url = 'https://www.swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        rows = data['results']
        planets_list = []

        for row in rows:
            planet_url = row['url']
            planet_response = requests.get(planet_url)

            if planet_response.status_code == 200:
                planet_data = planet_response.json()
                planets_details = planet_data['result']['properties']

                existing_planet = Planets.query.filter_by(name=planets_details['name']).first()
                if not existing_planet:
                    planet = Planets(name = planets_details.get('name'),
                                    diameter = planets_details.get('diameter'),
                                    rotation_period = planets_details.get('rotation_period'),
                                    orbital_period = planets_details.get('orbital_period'),
                                    gravity = planets_details.get('gravity'),
                                    population = planets_details.get('population'),
                                    climate = planets_details.get('climate'),
                                    terrain = planets_details.get('terrain'))
                    
                    db.session.add(planet)
                    db.session.commit()
                planets_list.append(planets_details)

            response_body['message'] = "Listado de planetas"
            response_body['results'] = planets_list
    return response_body, 200


@api.route('/users/<int:id>/character-favorites', methods=['GET'])
def favorite_character(id):
    response_body = {}
    rows = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == id)).scalars()
    results = [row.serialize() for row in rows]
    response_body['message'] = f"Listado de personajes favoritos del Usuario: {id}"
    response_body['results'] = results
    return response_body, 200


@api.route('/users/<int:id>/planet-favorites', methods=['GET'])
def favorite_planet(id):
    response_body = {}
    rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == id)).scalars()
    results = [row.serialize() for row in rows]
    response_body['message'] = f"Listado de planetas favoritos del Usuario: {id}"
    response_body['results'] = results
    return response_body, 200
