from flask import Flask, jsonify, request
from models import db, Users
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app,supports_credentials=True)

app.config['SECRET_KEY'] = 'saitnyeinnaings'
# app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///flaskdb.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/flaskreact'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO= True
db.init_app(app)

with app.app_context():
    db.create_all()

ma=Marshmallow(app)

class UserSchema(ma.Schema):
    class Meta:
        fields=('id','name','email','password')
user_schema=UserSchema()
users_schema=UserSchema(many=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/users", methods=["GET"])
def listUsers():
    all_users=Users.query.all()
    results=users_schema.dump(all_users)
    return jsonify(results)

@app.route("/userdetails/<id>",methods=['GET'])
def userdetails(id):
    user=Users.query.get(id)
    # result=user_schema.dump(user)
    return user_schema.jsonify(user)

@app.route("/userupdate/<id>",methods=["PUT"])
def userupdate(id):
    user=Users.query.get(id)
    name=request.json['name']
    email=request.json['email']
    password=request.json['password']
    # print(password)
    user.name=name
    user.email=email
    user.password=password

    db.session.commit()
    return user_schema.jsonify(user)

@app.route("/userdelete/<int:id>", methods=["DELETE"])
def userDelete(id):
    user = Users.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return user_schema.jsonify(user)
    else:
        return jsonify({"message": "User not found"}), 404


@app.route('/newuser', methods=['POST'])
def newuser():
    try:
        # Extract user data from the request JSON
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        
        # Check if all required fields are present
        if not (name and email and password):
            return jsonify({"message": "Missing required fields"}), 400

        # Create a new Users object and add it to the database
        new_user = Users(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        # Return the newly created user with status code 201 (Created)
        return user_schema.jsonify(new_user), 201

    except KeyError as e:
        # Handle missing keys in the JSON payload
        return jsonify({"message": f"Missing key in JSON payload: {e}"}), 400

    except Exception as e:
        # Handle other exceptions
        app.logger.error(f"Error creating new user: {e}")
        return jsonify({"message": "Internal Server Error"}), 500


if __name__ == "__main__":
    app.run(debug=True)
