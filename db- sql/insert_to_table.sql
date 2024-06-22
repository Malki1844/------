INSERT INTO Category ( Name, Url)
VALUES 
( 'main', '../../../../assets/svg/mainIcon.svg'),
( 'extras', '../../../../assets/svg/extraIcon.svg'),
('desserts', '../../../../assets/svg/dessertIcon.svg');


 INSERT INTO Users (Name, Address, Email, Password)
 VALUES ( 'dan' , 'bney brak' , ' dan@gmail.com ' , 'dan123' ),
 ( 'yair' , 'tel aviv' , ' yait@gmail.com ' , 'yair123' ),
 ( 'yosef' , 'beit shemesh' , ' yosef@gmail.com ' , 'yosef123' );

 INSERT INTO Recipe ( RecipeName, CategoryCode, Preparation, Difficulty, DateAdded, Image, UserCode)
VALUES
( 'fried meat', 1, 120, 4, '2021-06-04', 'https://media.reshet.tv/image/upload/t_grid-item-large/v1619513711/shutterstock_444964117_m4jfzu.webp', 1),
( 'Rice', 2, 20, 1, '2020-02-01', 'https://nikib.co.il/wp-content/uploads/IMG_35491.jpg', 2),
( 'Lotus CheeseCake', 3, 50, 3, '2024-03-01', 'https://img.mako.co.il/2018/05/06/Lotus_Cheesecake1544_i.jpg', 3),
( 'Triple mascarpone-milk and fruit', 3, 60, 3, '2024-04-16', 'https://dafmatok.co.il/wp-content/uploads/parve-cups-dessert-recipe-dafmatok.co_.il_-1024x576.jpg', 1);

INSERT INTO RecipeIngredients (RecipeCode, Ingredient)
VALUES
(1, 'Size 5 meat (shoulder roast)'),
(1, 'about 1.5-2 kg'),
(1, '8 cloves of garlic'),
(1, '4 sprigs of rosemary'),
(1, '6 grain mustard seeds'),
(1, 'salt to taste'),
(1, 'Pepper to taste'),
(1, '2 tablespoons olive oil'),
(1, 'Meat stock or water or 2 glasses of red wine'),

(2, 'packet of rice'),
(2, 'pinch of salt'),
(2, 'Glass of water'),
(2, 'Carrot'),
(2, 'oil'),

(3, 'cream'),
(3, 'cheese'),
(3, 'Sugar'),
(3, 'Dulce de leche'),

(4, 'cream'),
(4, 'cheese'),
(4, 'Sugar'),
(4, 'Dulce de leche');

INSERT INTO RecipeInstructions (RecipeCode, Instruction)
VALUES
(1, 'Preheat the oven to 180 degrees'),
(1, 'Using a knife, make several holes in the meat and insert 6 cloves of garlic.'),
(1, 'In a bowl, mix well the meat/red wine stock, salt, pepper, and crush 2 cloves of garlic inside.'),
(1, 'Put the meat in a heatproof dish and pour the bowl over the meat and put the rosemary sprigs on top'),
(1, 'Cover the meat with foil and put in the oven for at least two and a half hours at 180 degrees'),

(2, 'Cut the vegetables and mix'),
(2, 'Pour oil into the pot'),
(2, 'put in the rice and vegetables'),
(2, 'Add salt and spices to taste'),

(3, 'Mix the ingredients in a mixer'),
(3, 'put in the oven at 180 degrees for 30 minutes.'),
(3, 'Then whip the cream and pour it nicely over the cake'),

(4, 'Place mascarpone and cream in a mixer bowl and beat at medium speed.'),
(4, 'After about 4 minutes, add 4 tablespoons of silane and sesame oil and continue whipping for about 4 more minutes.'),
(4, 'When the whipped cream is almost completely stable, add tahini and beat for a few seconds to combine.'),
(4, 'Place a generous spoonful of mascarpone-halva in each individual bowl, sprinkle nuts and fruit on top and again mascarpone and nuts and fruit on top, creating three layers');