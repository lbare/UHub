enum MenuItemTag {
    Vegan = "Vegan",
    Spicy = "Spicy",
    GlutenFree = "Gluten Free",
    GlutenFreeOption = "Gluten Free Option",
    DairyFree = "Dairy Free",
}

type MenuItemSize = {
    name: string;
    price: number;
};

type MenuItemSide = {
    name: string;
    price: number;
};

type MenuItem = {
    name: string;
    price: number;
    tags?: MenuItemTag[];
    //todo: [image] decide weather the image string is url or base64
    image?: string;
    description?: string;
    sizes?: MenuItemSize[];
    sides?: MenuItemSide[];
};

type MenuSection = {
    name: string;
    description?: string;
    items: MenuItem[];
};

type Menu = {
    id: string;
    sections: MenuSection[];
};

//Menu Example from Greens in Cove from Feburary 13th 2024
const greensMenuExample: Menu = {
    id: "greens",
    sections: [
        {
            name: "Plant Based Eats Made to Order",
            items: [
                {
                    name: "Indigenous Salad",
                    price: 7.50,
                    description: "Dandelion greens, beets, carrot, wild blueberry dressing & bannock croutons",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan, MenuItemTag.GlutenFreeOption]
                },
                {
                    name: "Sriracha Chick'n Salad Rolls (2)",
                    price: 8.50,
                    description: "Sriracha glazed rice rolls, vermicelli, veggies, plant based chicken & avocado mayo",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan]
                },
                {
                    name: "Roasted Chickpea Burrito",
                    price: 5.00,
                    description: "Roasted chickpeas & seasoned mixed beans in a flour tortilla",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan, MenuItemTag.GlutenFreeOption]
                },
                {
                    name: "Teriyaki Waygu Beef Sandwich",
                    price: 10.95,
                    description: "Plant based beef with grilled pineapple and sinacha mayo on a Vienna real",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan]
                },
                {
                    name: "Bean & Chick'n Quesadilla",
                    price: 9.50,
                    description: "Seasoned mined beans, plant based chicken, cheez & salsa grilled in a floor tortilla",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan, MenuItemTag.GlutenFreeOption]
                },
                {
                    name: "Chipotle Tacos (3)",
                    price: 8.50,
                    description: "Chipotle crumble, cheez, lettuce & salsa in soft flour tortillas",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan, MenuItemTag.GlutenFreeOption]
                },
                {
                    name: "Crispy Tofu Noodle Wrap",
                    price: 8.00,
                    description: "Crispy tofu, vermicelli & peppers in a sweet chili sauce wrapped in a four tortilla",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan]
                },
                {
                    name: "Tofu Banh Mi",
                    price: 9.00,
                    description: "Sriracha clazed tofu & resh veggies served on a ben",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan, MenuItemTag.GlutenFreeOption]
                },
                {
                    name: "Tuna Poké Bowl",
                    price: 13.00,
                    description: "Pread based tuna broma rice & veggies with avocado siracha mayo a furdale",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan]
                },
                {
                    name: "Southwest Chick'n Bowl",
                    price: 13.00,
                    description: "Mexican rice topped with plant based chicken, mied beans, corn, peppers & salsa",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan]
                },
                {
                    name: "Slammin Lox",
                    price: 9.95,
                    description: "Plant based smoked salmon with cream cheese, alfalta, red onion, and capers on a classie bagel",
                    tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
                },
            ],
        },
    ],
};

const felicitasMenuExample: Menu = {
    id: "felicitas",
    sections : [
        {
            name: "Pub Style Favorites",
            items: [
                {
                    name: "C WINGS",
                    price: 12.75,
                    description: "Tossed in your choice of hot, bbq, honey garlic, salt & pepper, blue moon or dry garlic",
                },
                {
                    name: "TRADITIONAL POUTINE",
                    price: 10.75,
                    description: "Seasoned fries topped with cheese curds & rich gravy",
                    sides: [
                        { name: "add Crispy Chicken", price: 4 }
                    ]
                },
                {
                    name: "KIMCHI FRIES",
                    price: 10.75,
                    description: "French fries with homemade Kimchi topped with Siracha mayo",
                    tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree]
                },
                {
                    name: "CHILI CHEESE FRIES",
                    price: 10.50,
                    description: "Veggie chili & a blend of melted mixed cheeses over french fries",
                    tags: [MenuItemTag.Vegan]
                },
                {
                    name: "BEER BATTER FISH'N CHIPS",
                    price: 14.50,
                    description: "Two pieces of cod, served with home made cole slaw & tartar sauce",
                    sizes: [
                        { name: "1 piece", price: 12 }
                    ]
                },
                {
                    name: "HALF & HALF BASKET OF CHIPS",
                    price: 12.75,
                    description: "A mix of sweet yam fries & Yukon Gold fries served with aïoli",
                    tags: [MenuItemTag.GlutenFree, MenuItemTag.Vegan]
                },
                {
                    name: "YAM FRIES",
                    price: 7.50,
                    description: "With roasted garlic aïoli",
                    tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree]
                },
                {
                    name: "VEGGIES & DIP",
                    price: 8.50,
                    description: "Celery, carrots, broccoli, cauliflower, tomatoes, cucumber & ranch dip",
                    tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree, MenuItemTag.DairyFree]
                },
                {
                    name: "OUR OWN VEGGIE CHILI",
                    price: 7.50,
                    description: "Served with Gluten Free corn tortilla chips",
                    tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree]
                },
                {
                    name: "CAESAR SALAD",
                    price: 8.50,
                    description: "Romaine lettuce, croutons & parmesan cheese. Served with garlic toast"
                },
                {
                    name: "SPINACH SALAD",
                    price: 10.50,
                    description: "Fresh Spinach with red onion, candied cranberry, diced red pepper and grated carrots and feta with a raspberry vinaigrette. Served with garlic toast",
                    tags: [MenuItemTag.Vegan]
                },
                {
                    name: "GREEK SALAD",
                    price: 13,
                    description: "Traditional Greek salad served with pita and tzatiki"
                }
            ]
        },
        {
            name: "BURGERS",
            items: [
                {
                    name: "VIKES BURGER - BEEF or CHICKEN",
                    price: 15,
                    description: "Bacon, cheddar, onions & barbeque sauce",
                    sides: [
                        { name: "Gluten free kaisers or bread available on request", price: 1.50 }
                    ]
                },
                {
                    name: "DELUXE CHICKEN BURGER",
                    price: 15,
                    description: "Classic chicken burger with guacamole, bacon and Swiss",
                    sides: [
                        { name: "Gluten free kaisers or bread available on request", price: 1.50 }
                    ]
                },
                {
                    name: "ORIGINAL BEEF BURGER",
                    price: 12.50,
                    description: "6 oz. charbroiled beef patty",
                    sides: [
                        { name: "Gluten free kaisers or bread available on request", price: 1.50 }
                    ]
                },
                {
                    name: "FALAFEL BURGER",
                    price: 13.50,
                    description: "Home made traditional Mediterranean garbanzo bean patty with sautéed mushrooms, onions & Swiss cheese",
                    sides: [
                        { name: "Gluten free kaisers or bread available on request", price: 1.50 }
                    ]
                },
                {
                    name: "VEGGIE BURGER",
                    price: 13,
                    description: "Topped with our own BBQ Sauce, sautéed mushrooms, onions & Swiss cheese",
                    sides: [
                        { name: "Feta, Cheddar or Swiss Cheese", price: 1.50 },
                        { name: "Bacon or Ham", price: 3 },
                        { name: "Falafel or Beef patty", price: 3 },
                        { name: "Chicken breast", price: 4 },
                        { name: "Onions, Mushrooms or Jalapenos or Barbeque", price: 0.75 },
                        { name: "Gluten free kaisers or bread available on request", price: 1.50 }
                    ]
                }
            ]
        },
        {
            name: "ON TAP",
            items: [
                {
                    name: "VANCOUVER ISLAND BROKEN ISLANDS HAZY IPA & ISLANDER LAGER",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "FELICITA'S LAGER",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "HOYNE DARK MATTER & PILSNER",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "PHILLIPS BLUE BUCK & DINOSOUR",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "GRANVILLE ISLAND HONEY LAGER",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "LIGHTHOUSE NIGHT WATCH COFFEE LAGER",
                    price: 5.75,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                },
                {
                    name: "VIZZY HARD SELTZER",
                    price: 5,
                    sizes: [
                        { name: "Sleeve (12oz)", price: 5.75 },
                        { name: "Pitcher (54oz)", price: 22 }
                    ]
                }
            ]
        },
        {
            name: "BY THE BOTTLE",
            items: [
                {
                    name: "PABST BLUE RIBBON",
                    price: 4.75
                },
                {
                    name: "WHISTLER FORAGER (gluten free)",
                    price: 5.50
                },
                {
                    name: "DOMESTIC BOTTLES",
                    price: 5,
                    description: "Coors Original, Molson Canadian & Miller Genuine Draft"
                },
                {
                    name: "PREMIUM BOTTLES",
                    price: 6,
                    description: "Heineken & Sol"
                },
                {
                    name: "GUINNESS DRAUGHT CANS",
                    price: 6.50
                },
                {
                    name: "CIDERS",
                    price: 5.50,
                    description: "Rock Creek Cider"
                },
                {
                    name: "ARIZONA HARD ICE TEA",
                    price: 5.50
                },
                {
                    name: "ISLAND LIFE SPARKLING VODKA SODA",
                    price: 5.25
                }
            ]
        },
        {
            name: "WINES",
            items: [
                {
                    name: "WHITES",
                    price: 6.50,
                    description: "Glass (5oz)",
                    sizes: [
                        { name: "INNISKILLIN Pinot Grigio", price: 6.50 },
                        { name: "HOUSE WHITE", price: 5.50 }
                    ]
                },
                {
                    name: "REDS",
                    price: 6.50,
                    description: "Glass (5oz)",
                    sizes: [
                        { name: "INNISKILLIN Cabernet Sauvignon", price: 6.50 },
                        { name: "HOUSE RED", price: 5.50 }
                    ]
                }
            ]
        }
    ]
}

const theGrillMenuExample: Menu = {
    id: "theGrill",
    sections : [
        {
            name: "BREAKFAST",
            items: [
                {
                    name: "2 EGG BREAKFAST",
                    price: 9,
                    description: "2 fried eggs, hash browns, bacon or sausage & toast."
                },
                {
                    name: "CHEESE OMELETTE",
                    price: 8.75,
                    description: "2 egg omelette with cheese. Served with hash browns & toast."
                },
                {
                    name: "DENVER OMELETTE",
                    price: 8.75,
                    description: "2 egg omelette, cheese, onions, bell pepper and bacon. Served with hash browns & toast."
                },
                {
                    name: "EGGS BENEDICT",
                    price: 10.75,
                    sizes: [
                        { name: "half", price: 7.75 },
                        { name: "full", price: 10.75 }
                    ],
                    description: "Toasted English muffin topped with two poached eggs, ham, and Hollandaise sauce. Served with hashbrowns."
                },
                {
                    name: "BREAKFAST QUESADILLA",
                    price: 8.75,
                    description: "2 eggs scrambled with cheese & bacon folded in a flour tortilla and grilled. Served with hash browns."
                },
                {
                    name: "BREAKFAST SANDWICH",
                    price: 9.25,
                    description: "Fried egg with bacon, cheese, lettuce, tomato & mayo. Served on a multigrain brioche bun & side choice."
                },
                {
                    name: "BREAKFAST WRAP",
                    price: 8.75,
                    description: "2 eggs scrambled with cheese, onions & bell pepper rolled in a flour tortilla. Served with hash browns."
                },
                {
                    name: "KIMCHI HASH",
                    price: 8.75,
                    description: "Scrambled eggs with hash browns, bacon, kimchi, Sriracha mayo and green onion."
                },
                {
                    name: "DAILY CONGEE",
                    price: 5.75,
                    description: "Chinese style savoury rice porridge served with a fried bao. Check the special board for today's flavour."
                },
                {
                    name: "2 SLICES OF TOAST",
                    price: 3.50
                },
                {
                    name: "HASHBROWNS",
                    price: 4.50
                },
                {
                    name: "SAUSAGE OR BACON",
                    price: 1.25,
                    description: "1 EGG"
                }
            ]
        },
        {
            name: "INTERNATIONAL",
            items: [
                {
                    name: "BBQ PORK (CHAR SIU)",
                    price: 11.50,
                    description: "Cantonese style glazed pork roast sliced with fried rice or chow mein."
                },
                {
                    name: "ROAST CHICKEN LEG",
                    price: 10.25,
                    description: "Seasoned and roasted whole chicken leg with fried rice or chow mein."
                },
                {
                    name: "SWEET & SOUR PORK",
                    price: 10.50,
                    description: "Crispy pork tossed in a sweet and sour pineapple sauce and served with fried rice or chow mein."
                },
                {
                    name: "HOKKIEN NOODLE STIRFRY",
                    price: 10.25,
                    description: "Thick wheat noodles & chicken stirfried with carrots, sui choy and green onions in a sweet ginger & dark soy coconut sauce."
                },
                {
                    name: "INDIAN STYLE CHICKEN CURRY",
                    price: 10.50,
                    description: "A rich and spicy tomato curry on rice. Choice of tossed salad or pita."
                },
                {
                    name: "TEX-MEX PLATE",
                    price: 9,
                    description: "Seasoned black beans and Spanish rice with cheese, sour cream, salsa and a flour tortilla. Add pulled chicken or pork $2.00"
                },
                {
                    name: "SPAGHETTI & MEATBALLS",
                    price: 8.50,
                    description: "Pork meatballs and Marinara sauce served on spaghetti with Parmesan cheese and garlic toast."
                },
                {
                    name: "BLACK BEAN BURRITO",
                    price: 7.50,
                    description: "Black beans, Spanish rice, cheese, lettuce, sour cream and salsa wrapped in a flour tortilla."
                },
                {
                    name: "CHOW MEIN",
                    price: 7.50
                },
                {
                    name: "FRIED RICE",
                    price: 7.50
                },
                {
                    name: "RICE & BEANS",
                    price: 6.50
                },
                {
                    name: "EXTRA PITA",
                    price: 1.50
                }
            ]
        },
        {
            name: "WRAPS",
            items: [
                {
                    name: "COD WRAP",
                    price: 11.75,
                    description: "Battered Cod, lettuce, tomato, & tartar sauce."
                },
                {
                    name: "CHICKEN CHIPOTLE",
                    price: 11.50,
                    description: "Breaded chicken, lettuce, tomato & chipotle mayo."
                },
                {
                    name: "CALIFORNIA CHICKEN",
                    price: 11.50,
                    description: "Breaded chicken, guacamole, lettuce, salsa & chipotle mayo."
                },
                {
                    name: "CHICKEN BACON",
                    price: 11.50,
                    description: "Breaded chicken, bacon."
                },
                {
                    name: "CAESAR CHICKEN",
                    price: 10.25,
                    description: "Breaded chicken and Caesar salad."
                },
                {
                    name: "CHICKEN CAESAR",
                    price: 10.25,
                    description: "Breaded chicken & Caesar salad."
                },
                {
                    name: "HONEY MUSTARD CHICKEN",
                    price: 10.25,
                    description: "Breaded chicken, lettuce, tomato with honey mustard sauce."
                }
            ]
        }
    ]
}

const starbucksMenu: Menu = {
    id: "starbucks",
    sections: [
        {
            name: "Coffee",
            items: [
                {
                    name: "Caffè Americano",
                    price: 2.95,
                    description: "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance."
                },
                {
                    name: "Caffè Latte",
                    price: 3.65,
                    description: "Rich, full-bodied espresso with bittersweet milk and a hint of sweetness."
                },
                {
                    name: "Cappuccino",
                    price: 3.45,
                    description: "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam."
                }
            ]
        },
        {
            name: "Tea",
            items: [
                {
                    name: "Teavana® Shaken Iced Tea",
                    price: 2.75,
                    description: "A smooth, delightful blend of water, ice, Teavana® tea and flavors of your choice, each served over ice."
                },
                {
                    name: "Chai Latte",
                    price: 4.25,
                    description: "Black tea infused with cinnamon, clove, and other warming spices are combined with steamed milk and topped with foam for the perfect balance of sweet and spicy."
                }
            ]
        },
        {
            name: "Bakery",
            items: [
                {
                    name: "Blueberry Muffin",
                    price: 2.95,
                    description: "Blueberry muffin with a soft, moist center, and a hint of lemon."
                },
                {
                    name: "Classic Coffee Cake",
                    price: 3.25,
                    description: "A traditional coffee cake with a crumbly cinnamon streusel topping."
                }
            ]
        },
        {
            name: "Sandwiches & Wraps",
            items: [
                {
                    name: "Turkey & Swiss Sandwich",
                    price: 6.95,
                    description: "Slow-roasted turkey, Swiss cheese, and crisp lettuce on a hearty wheat bread."
                },
                {
                    name: "Mozzarella & Tomato Panini",
                    price: 7.25,
                    description: "Fresh mozzarella, sliced tomatoes, and basil pesto on ciabatta bread."
                }
            ]
        },
        // Additional sections can be added here such as "Salads", "Smoothies", etc.
    ]
};

const EntreeMenu: Menu = {
    id: "entree",
    sections: [
        {
            name: "Main",
            items: [
                {
                    name: "Meal",
                    price: 12.00,
                    description: "1 entree, 2 sides"
                },
                {
                    name: "Carvery Meal",
                    price: 14.00,
                    description: "1 Carvery, 2 sides"
                }
            ]
        },
        {
            name: "Lunch (11am-2pm)",
            items: [
                {
                    name: "Beef & Broccoli",
                    price: 12.00,
                    description: "Entrée with beef and broccoli."
                },
                {
                    name: "Vegetable Medley",
                    price: 0,
                    description: "Side of mixed vegetables."
                },
                {
                    name: "Brown Rice",
                    price: 0,
                    description: "Side of brown rice."
                }
            ]
        },
        {
            name: "Dinner (5pm-7:30pm)",
            items: [
                {
                    name: "Teriyaki Pork",
                    price: 7.00,
                    description: "Entrée with teriyaki pork."
                },
                {
                    name: "Chop Suey",
                    price: 3.00,
                    description: "Side of chop suey."
                },
                {
                    name: "Rice & Quinoa Pilaf",
                    price: 3.00,
                    description: "Side of rice and quinoa pilaf."
                },
                {
                    name: "Carvery (changes daily)",
                    price: 14.00,
                    description: "Carvery meal with a daily selection."
                }
            ]
        }
    ]
};

const uniclubMenuExample: Menu = {
    id: "uniclub",
    sections: [
        {
            name: "LIGHTER MEALS",
            items: [
                {
                    name: "DAILY SOUP",
                    price: 9,
                    description: "Ask Your Server $7 for a Cup"
                },
                {
                    name: "BAKED BRIE",
                    price: 21,
                    description: "Little Qualicum Brie, Fig Apricot Chutney, Grilled Bread"
                },
                {
                    name: "CHORIZO QUESADILLA",
                    price: 23,
                    description: "Chorizo, Pear, Cambozola Cheese, Lime Crema & Gaucho Fries"
                },
                {
                    name: "KALE CAESAR",
                    price: 17,
                    description: "Kale, Romaine, Bacon Bits, Herbed Garlic Croutons, Grana Padano"
                },
                {
                    name: "FISH AND CHIPS",
                    price: 20,
                    description: "One 3oz Piece Crispy Cod, Fries, Tartar Sauce, Slaw & Lemon"
                }
            ]
        },
        {
            name: "MAIN COURSES",
            items: [
                {
                    name: "TOFU BUDDHA BOWL (Vegan & GF)",
                    price: 25,
                    description: "Marinated Tofu, Brown Rice, Edamame, Carrot, Kale, Red Cabbage, Roasted Corn, Creamy Tamari Tahini Dressing"
                },
                {
                    name: "HALIBUT CRUNCH BURGER",
                    price: 26,
                    description: "Tempura Battered Halibut, Hoisin Chili Sauce, Sesame Slaw, Brioche Bun & Fries"
                },
                {
                    name: "CLUB SMASH BURGER",
                    price: 25,
                    description: "Two 3oz Beef Patties, Club Burger Sauce, Smoked Cheddar, Dill Pickles, Roma Tomato, Maple Bacon Mushroom Jam, Brioche, Fries"
                },
                {
                    name: "EGGPLANT BOLOGNESE (Vegetarian & GF)",
                    price: 24,
                    description: "Gluten Free Penne Rigate, Grilled Eggplant, Smoky Tomato Sauce, Basil Walnut Pesto"
                },
                {
                    name: "TUNA POKE BOWL (GF) (DF)",
                    price: 26,
                    description: "Seasoned Rice, Pickled Watermelon, Carrot, Cucumber, Onion, Tomato, Candied Walnuts, Pineapple & Sesame Seeds"
                },
                {
                    name: "SALMON & MASH (GF)",
                    price: 28,
                    description: "Pan Seared Salmon, Miso Mashed Potato, Asian Ginger Glaze & Edamame"
                },
                {
                    name: "FISH AND CHIPS",
                    price: 29,
                    description: "Two Pieces Crispy Cod, Fries, Coleslaw, Tartar Sauce, Lemon"
                },
                {
                    name: "LAMB SHANK",
                    price: 31,
                    description: "Tender Marsala Braised Lamb Shank, Coconut Saffron Rice, Curried Tomato Broth"
                }
            ]
        },
        {
            name: "DESSERT",
            items: [
                {
                    name: "CHOCOLATE MOUSSE (GF)",
                    price: 10
                },
                {
                    name: "DAILY FRESH DESSERT",
                    price: 11
                },
                {
                    name: "PARACHUTE ICE CREAM",
                    price: 10,
                    description: "Ask your server for our current flavours"
                }
            ]
        }
    ]
};

const menuExample = [
    greensMenuExample,
    felicitasMenuExample,
    theGrillMenuExample,
    starbucksMenu,
    EntreeMenu,
    uniclubMenuExample
];

export { Menu, MenuItem, menuExample };
