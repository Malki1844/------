from flask import Flask, request, jsonify
from Models.userModel import get_user_id, get_all_users, post_user, update_user,remove_user
from Models.categoryModel import get_all_categories, get_category_id
from  Models.recipeModel import get_all_recipe, get_recipe_id, put_recipe, delete_recipe, post_recipe
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/")
def server():
    return "server is running"

@app.route("/Category")
def get_categories():
    res=get_all_categories()
    return res

@app.route("/Category/<int:id>", methods=["GET"])
def get_category_by_id(id):
        massege,status = get_category_id(id)
        return jsonify(massege), status

@app.route("/User")
def get_all():
    res = get_all_users()
    return res

@app.route("/User/<int:id>", methods=['GET'])
def get_user_by_id(id):
        massege,status = get_user_id(id)
        return jsonify(massege), status

@app.route('/User/<int:id>', methods=['PUT'])
def put_user(id):
        data = request.json
        user,status = update_user(id,data)
        return user

@app.route('/User', methods=['POST'])
def add_user():
     user = request.json
     res, status=post_user(user)
     return jsonify(res), status

@app.route("/User/delete/<int:id>",methods=["DELETE"])
def delete_user(id):
    message,status=remove_user(id)
    return jsonify({"message": message, }), status

@app.route("/Recipe")
def get_recipies():
    res = get_all_recipe()
    return res
@app.route("/Recipe/<id>", methods=["GET"])
def get_recipe_by_id(id):
        massege,status = get_recipe_id(id)
        return jsonify( massege), status


@app.route("/Recipe/<int:id>", methods=["PUT"])
def update_recipe(id):
    data = request.json
    recipe,status = put_recipe(id,data)
    return recipe

@app.route("/Recipe/<id>", methods=["DELETE"])
def remove_recipe(id):
 res, status= delete_recipe(id)
 return res,status

@app.route('/Recipe', methods=['POST'])
def add_recipe():
     recipe = request.json
     res, status=post_recipe(recipe)
     return jsonify(res), status

port_number = 3000
if __name__ == '__main__':
    app.run(port=port_number)

