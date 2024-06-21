from flask import jsonify

from connectDB import con_str, insert_db_query, select_db_query, update_db_query, delete_db_query
from entities.classRecipe import Recipe, required_field, ingredient_query, instraction_query
def get_all_recipe():
            query = "SELECT * FROM Recipe;"
            res = select_db_query(query,"all")
            recipe_list = []
            for recipe in res:
                recipe_id = recipe[0]
                query_instructions = f"SELECT Instruction FROM RecipeInstructions WHERE RecipeCode = {recipe_id};"
                instructions_res = select_db_query(query_instructions,"all")
                instructions = []
                for ins in instructions_res:
                    instructions.append(ins[0])
                query_ingredients = f"SELECT Ingredient FROM RecipeIngredients WHERE RecipeCode = {recipe_id};"
                ingredients_res = select_db_query(query_ingredients,"all")
                ingredients = []
                for ing in ingredients_res:
                    ingredients.append(ing[0])
                recipe_dict = {
                     'recipeCode': recipe[0],
                     'recipeName': recipe[1],
                     'preparation': recipe[2],
                     'difficulty': recipe[3],
                     'dateAdded': recipe[4],
                     'image': recipe[5],
                     'userCode': recipe[6],
                     'categoryCode': recipe[7],
                     'instructions': instructions,
                     'ingredients': ingredients
                 }
                recipe_list.append(recipe_dict)
            return recipe_list

def get_recipe_id(id):
            query = f"SELECT * FROM Recipe where RecipeCode = {id}"
            recipe=select_db_query(query,"one")
            if recipe:
                recipe_id = recipe[0]
                query_instructions = f"SELECT Instruction FROM RecipeInstructions WHERE RecipeCode = {recipe_id};"
                instructions_res = select_db_query(query_instructions,"all")
                instructions = []
                for ins in instructions_res:
                    instructions.append(ins[0])
                query_ingredients = f"SELECT Ingredient FROM RecipeIngredients WHERE RecipeCode = {recipe_id};"
                ingredients_res = select_db_query(query_ingredients,"all")
                ingredients = []
                for ing in ingredients_res:
                    ingredients.append(ing[0])
                recipe_dict = {
                     'recipeCode': recipe[0],
                     'recipeName': recipe[1],
                     'preparation': recipe[2],
                     'difficulty': recipe[3],
                     'dateAdded': recipe[4],
                     'image': recipe[5],
                     'userCode': recipe[6],
                     'categoryCode': recipe[7],
                     'instructions': instructions,
                    'ingredients': ingredients
                 }
                return recipe_dict,200
            else:
                return None,404

def put_recipe(id, data):
     if required_field(data):
        # data['dateAdded']=convert_date(data['dateAdded'])
        recipe_update = Recipe(recipeCode=id, RecipeName=data['recipeName'], Preparation=data['preparation'], Difficulty=data['difficulty'], DateAdded=data['dateAdded'], Image=data['image'], UserCode=data['userCode'], CategoryCode=data['categoryCode'], Instruction=data.get('instructions', []), Ingredient=data.get('ingredients', []))
        query = f"""UPDATE Recipe SET RecipeName='{recipe_update.RecipeName}', Preparation={recipe_update.Preparation},
         Difficulty={recipe_update.Difficulty}, DateAdded='{recipe_update.DateAdded}',Image='{recipe_update.Image}',
         UserCode={recipe_update.UserCode}, CategoryCode={recipe_update.CategoryCode} WHERE RecipeCode={id}"""
        res, message = update_db_query(query)
        if res:
                for index, ingredient in enumerate(recipe_update.Ingredient):
                    query2 = ingredient_query(ingredient,id,index)
                    res2, message2 = update_db_query(query2)
                    if not res2:
                        return jsonify({"message": message2}), 500
                for index, instruction in enumerate(recipe_update.Instruction):
                    query3 = instraction_query(instruction,id, index)
                    res3, message3 = update_db_query(query3)
                    if not res3:
                        return jsonify({"message": message3}), 500
                recipe_back=get_recipe_id(id)
                return recipe_back, 201
        else:
                return recipe_update, 400
     else:
        return jsonify({"error": f"Missing required field"}), 400

def delete_recipe(id):
    delete_data=delete_db_query("RecipeIngredients", "RecipeCode", id)
    delete_data=delete_db_query("RecipeInstructions", "RecipeCode", id)
    delete_data=delete_db_query("Recipe", "RecipeCode", id)
    if not delete_data.__contains__("error"):
        return {"res":delete_data}, 200
    else:
        return {"res":delete_data}, 400

def post_recipe(data):
    if required_field(data):
        new_recipe = Recipe(recipeCode=id, RecipeName=data['recipeName'], Preparation=data['preparation'], Difficulty=data['difficulty'], DateAdded=data['dateAdded'], Image=data['image'], UserCode=data['userCode'], CategoryCode=data['categoryCode'], Instruction=data.get('instructions', []), Ingredient=data.get('ingredients', []))
        query = f" INSERT INTO Recipe ( RecipeName, CategoryCode, Preparation, Difficulty, DateAdded, Image, UserCode) VALUES ('{new_recipe.RecipeName}', {new_recipe.CategoryCode}, {new_recipe.Preparation}, {new_recipe.Difficulty},'{new_recipe.DateAdded}','{new_recipe.Image}',{new_recipe.UserCode})"
        res, new_id = insert_db_query(query)
        if res:
            query = f"SELECT * FROM Recipe WHERE code={new_id}"
            recipe_data = select_db_query(query, "one")
            for ingredient in new_recipe.Ingredient:
                query_ingredient=f"INSERT INTO RecipeIngredients (RecipeCode, Ingredient) VALUES ({new_id},'{ingredient}')"
                res, new_id2 = insert_db_query(query_ingredient)
            for instruction in new_recipe.Instruction:
                query_instruction=f"INSERT INTO RecipeInstructions (RecipeCode, Instruction) VALUES ({new_id},'{instruction}')"
                res, new_id3 = insert_db_query(query_instruction)
            if recipe_data:
                print(recipe_data)
                created_recipe = {
                    'recipeCode': new_id,
                     'recipeName': new_recipe.RecipeName,
                     'preparation': new_recipe.Preparation,
                     'difficulty': new_recipe.Difficulty,
                     'dateAdded': new_recipe.DateAdded,
                     'image': new_recipe.Image,
                     'userCode': new_recipe.UserCode,
                     'categoryCode': new_recipe.CategoryCode,
                     'instructions': new_recipe.Instruction,
                    'ingredients': new_recipe.Ingredient
                }
                return created_recipe, 201
            else:
                return "Error retrieving created user", 500
        else:
            return f"{new_id} {new_recipe}", 400
