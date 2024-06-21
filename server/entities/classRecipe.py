from datetime import datetime
from typing import List

class Recipe:
    def __init__(self, recipeCode: int, RecipeName: str, Preparation: int, Difficulty: int, DateAdded: datetime, Image: str, UserCode: int, CategoryCode: int, Instruction: List[str], Ingredient: List[str]):
        self.recipeCode: int = recipeCode
        self.RecipeName: str = RecipeName
        self.Preparation: int = Preparation
        self.Difficulty: int = Difficulty
        self.DateAdded: datetime = DateAdded
        self.Image: str = Image
        self.UserCode: int = UserCode
        self.CategoryCode: int = CategoryCode
        self.Instruction: List[str] = Instruction
        self.Ingredient: List[str] = Ingredient

def required_field(data):
    required_fields = ['recipeName', 'preparation', 'difficulty', 'dateAdded','image','userCode','categoryCode','ingredients','instructions']

    for field in required_fields:
       if field not in data:
          return False
    else:
        return True

def ingredient_query(ingredient, id, index):
    query2=f"""
                    WITH OrderedIngredients AS (
                    SELECT IngredientID, ROW_NUMBER() OVER (ORDER BY IngredientID) AS RowNum
                    FROM RecipeIngredients
                    WHERE RecipeCode = {id}
                    )
                    UPDATE RI
                    SET Ingredient = '{ingredient}'
                    FROM RecipeIngredients RI
                    JOIN OrderedIngredients OI ON RI.IngredientID = OI.IngredientID
                    WHERE OI.RowNum = {index+1};
                    """
    return query2
def instraction_query(instruction, id, index):
    query3=f"""
                    WITH OrderedInstructions AS (
                    SELECT InstructionID, ROW_NUMBER() OVER (ORDER BY InstructionID) AS RowNum
                    FROM RecipeInstructions
                    WHERE RecipeCode = {id}
                    )
                    UPDATE RI
                    SET Instruction = '{instruction}'
                    FROM RecipeInstructions RI
                    JOIN OrderedInstructions OI ON RI.InstructionID = OI.InstructionID
                    WHERE OI.RowNum = {index+1};
                    """
    return query3


