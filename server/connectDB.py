import pyodbc
con_str = """DRIVER={SQL Server};
                 SERVER=MYHOME\SQLEXPRESS;
                 DATABASE=Recipies_Web;
                """
def select_db_query(query,fetch):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            if fetch=="all":
             res = cursor.fetchall()
            else:
                res = cursor.fetchone()
            return res
    except Exception as e:
        return f"error: {e}"

def update_db_query(query):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            if cursor.rowcount > 0:
                return True, "updated successfully"
            else:
                return False,"updated user failed"
    except Exception as e:
        return False, f"error: {e}"

def insert_db_query(query):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            cursor.execute("SELECT SCOPE_IDENTITY()")
            new_id = cursor.fetchone()[0]
            if new_id:
                return True, new_id
            else:
                return False, "failed to retrieve new ID"
    except Exception as e:
        return False, f"error: {e}"

def delete_db_query(table, coulmn, value):
    try:
        with pyodbc.connect(con_str) as connection:
            cursor = connection.cursor()
            cursor.execute(f"DELETE FROM {table} WHERE {coulmn} = {value};")
            connection.commit()
            if cursor.rowcount > 0:
                return "res: deleted successfully"
            else:
                return "error: could not delete"
    except Exception as e:
        return False, f"error: {e}"

