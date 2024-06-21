
CREATE TABLE Users (
    Code INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
	Email Varchar(50) NOT NULL,
    Password Varchar(255) NOT NULL
);

Create table Category(
Code INT IDENTITY(1,1) PRIMARY KEY,
Name VARCHAR(255) NOT NULL,
Url VARCHAR(255) NOT NULL
);
Create table Recipe(
RecipeCode INT IDENTITY(1,1) PRIMARY KEY,
RecipeName VARCHAR(255) NOT NULL,
Preparation INT NOT NULL,
Difficulty INT NOT NULL,
DateAdded DATETIME NOT NULL,
Image VARCHAR(255) NOT NULL,
UserCode INT NOT NULL,
CategoryCode INT NOT NULL,  
FOREIGN KEY (UserCode) REFERENCES Users(Code),
FOREIGN KEY (CategoryCode) REFERENCES Category(Code)
);

CREATE TABLE RecipeInstructions(
    InstructionID INT IDENTITY(1,1) PRIMARY KEY,
    RecipeCode INT NOT NULL,
    Instruction VARCHAR(255) NOT NULL,
    FOREIGN KEY (RecipeCode) REFERENCES Recipe(RecipeCode)
);

CREATE TABLE RecipeIngredients(
    IngredientID INT IDENTITY(1,1) PRIMARY KEY,
    RecipeCode INT NOT NULL,
    Ingredient VARCHAR(255) NOT NULL,
    FOREIGN KEY (RecipeCode) REFERENCES Recipe(RecipeCode)
);

