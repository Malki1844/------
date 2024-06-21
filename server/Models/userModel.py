import pyodbc
from flask import jsonify

from entities.classUser import User, required_field
from connectDB import con_str, select_db_query, insert_db_query, update_db_query

def get_all_users():
        query = "SELECT * FROM Users;"
        res = select_db_query(query, "all")
        users_list = []
        for user in res:

            user_dict = {
                'code': user[0],
                'name': user[1],
                'address':user[2],
                'email': user[3],
                'password': user[4]
            }
            users_list.append(user_dict)
        return users_list

def post_user(data):
    if required_field(data):
        new_user = User(data['name'], data['address'], data['email'], data['password'])
        print(new_user)
        query = f"INSERT INTO Users (Name, Address, Email, Password) VALUES ('{new_user.name}', '{new_user.address}', '{new_user.email}', '{new_user.password}')"
        res, new_id = insert_db_query(query)
        if res:
                created_user = {
                    "code": new_id,
                    "name": new_user.name,
                    "address":new_user.address,
                    "email": new_user.email,
                    "password": new_user.password
                }
                return created_user, 201

        else:
            return f"{new_id} {new_user}", 400

def update_user(id,data):
    if required_field(data):
        updated_user = User(data['name'], data['address'], data['email'], data['password'])
        print(updated_user)
        query = f"UPDATE Users SET Name='{updated_user.name}', Address='{updated_user.address}', Email='{updated_user.email}', Password='{updated_user.password}' WHERE Code={id}"
        res, message = update_db_query(query)
        if res:
            recipe_changed=get_user_id(id)
            return recipe_changed, 201
        else:
            return updated_user, 400
    else:
        return jsonify({"error": f"Missing required field"}), 400

def get_user_id(id):
    query = f"SELECT * FROM Users WHERE Code={id}"
    data = select_db_query(query, "one")
    print(data)
    if not data.__contains__("error"):
            user = {
                "password": data.Password,
                "name": data.Name,
                "address": data.Address,
                "email": data.Email
            }
            return user, 200
    else: return data, 400


def remove_user(id):
     try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            query="DELETE FROM Users WHERE Code = ?"
            cursor.execute(query,(id,))
            connection.commit()
            if cursor.rowcount > 0:
                return "User deleted successfully", 200
            else:
                return "deleted User failed", 404
     except pyodbc.Error as e:
        raise
        return f"Database error: {e}", 500
