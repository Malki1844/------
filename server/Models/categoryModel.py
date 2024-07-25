import pyodbc
from flask import Flask, jsonify

app = Flask(__name__)

con_str = """DRIVER={SQL Server};
            SERVER=MYHOME\SQLEXPRESS;
            DATABASE=Recipies_Web"""

def get_all_categories():
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            query = "SELECT * FROM Category;"
            cursor.execute(query)
            res = cursor.fetchall()
            category_list = []
            for category in res:
                category_dict = {
                    'id': category[0],
                    'name': category[1],
                    'url': category[2]  # assuming 'url' is the third column
                }
                category_list.append(category_dict)
            return category_list
    except pyodbc.Error as e:
        return {"error": f"Database error: {e}"}, 500


def get_category_id(id):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            query = "SELECT Name, Url FROM Category WHERE Code = ?"
            cursor.execute(query, (id,))
            row = cursor.fetchone()
            if row:
                category = {
                    "id": id,
                    "name": row.Name,
                    "url": row.Url
                }
                return category,200
            else:
                return None,404
    except pyodbc.Error as e:
        raise
        return f"Database error: {e}", 500


