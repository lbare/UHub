enum MenuItemTag {
  Vegan = "Vegan",
  VeganOption = "Vegan Option",
  Spicy = "Spicy",
  GlutenFree = "Gluten Free",
  GlutenFreeOption = "Gluten Free Option",
  DairyFree = "Dairy Free",
  DairyFreeOption = "Dairy Free Option",
}

type MenuItemSize = {
  name: string;
  price: number;
};

type MenuItemSide = {
  name: string;
  description?: string;
  price: number;
};

type MenuItem = {
  name: string;
  price: number;
  tags?: MenuItemTag[];
  //todo: [image] decide whether the image string is url or base64
  image?: string;
  description?: string;
  sizes?: MenuItemSize[];
  sides?: MenuItemSide[];
};

type MenuSection = {
  name: string;
  sides?: MenuItemSide[];
  tags?: MenuItemTag[];
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
          price: 7.5,
          description:
            "Dandelion greens, beets, carrot, wild blueberry dressing & bannock croutons",
          tags: [
            MenuItemTag.DairyFree,
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFreeOption,
          ],
        },
        {
          name: "Sriracha Chick'n Salad Rolls (2)",
          price: 8.5,
          description:
            "Sriracha glazed rice rolls, vermicelli, veggies, plant based chicken & avocado mayo",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
        {
          name: "Roasted Chickpea Burrito",
          price: 5.0,
          description:
            "Roasted chickpeas & seasoned mixed beans in a flour tortilla",
          tags: [
            MenuItemTag.DairyFree,
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFreeOption,
          ],
        },
        {
          name: "Teriyaki Waygu Beef Sandwich",
          price: 10.95,
          description:
            "Plant based beef with grilled pineapple and sinacha mayo on a Vienna real",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
        {
          name: "Bean & Chick'n Quesadilla",
          price: 9.5,
          description:
            "Seasoned mined beans, plant based chicken, cheez & salsa grilled in a floor tortilla",
          tags: [
            MenuItemTag.DairyFree,
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFreeOption,
          ],
        },
        {
          name: "Chipotle Tacos (3)",
          price: 8.5,
          description:
            "Chipotle crumble, cheez, lettuce & salsa in soft flour tortillas",
          tags: [
            MenuItemTag.DairyFree,
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFreeOption,
          ],
        },
        {
          name: "Crispy Tofu Noodle Wrap",
          price: 8.0,
          description:
            "Crispy tofu, vermicelli & peppers in a sweet chili sauce wrapped in a four tortilla",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
        {
          name: "Tofu Banh Mi",
          price: 9.0,
          description: "Sriracha clazed tofu & resh veggies served on a ben",
          tags: [
            MenuItemTag.DairyFree,
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFreeOption,
          ],
        },
        {
          name: "Tuna Poké Bowl",
          price: 13.0,
          description:
            "Pread based tuna broma rice & veggies with avocado siracha mayo a furdale",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
        {
          name: "Southwest Chick'n Bowl",
          price: 13.0,
          description:
            "Mexican rice topped with plant based chicken, mied beans, corn, peppers & salsa",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
        {
          name: "Slammin Lox",
          price: 9.95,
          description:
            "Plant based smoked salmon with cream cheese, alfalta, red onion, and capers on a classie bagel",
          tags: [MenuItemTag.DairyFree, MenuItemTag.Vegan],
        },
      ],
    },
  ],
};

const felicitasMenuExample: Menu = {
  id: "felicitas",
  sections: [
    {
      name: "Pub Style Favorites",
      items: [
        {
          name: "C WINGS",
          price: 12.75,
          description:
            "Tossed in your choice of hot, bbq, honey garlic, salt & pepper, blue moon or dry garlic",
        },
        {
          name: "TRADITIONAL POUTINE",
          price: 10.75,
          description: "Seasoned fries topped with cheese curds & rich gravy",
          sides: [{ name: "add Crispy Chicken", price: 4 }],
        },
        {
          name: "KIMCHI FRIES",
          price: 10.75,
          description:
            "French fries with homemade Kimchi topped with Siracha mayo",
          tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree],
        },
        {
          name: "CHILI CHEESE FRIES",
          price: 10.5,
          description:
            "Veggie chili & a blend of melted mixed cheeses over french fries",
          tags: [MenuItemTag.Vegan],
        },
        {
          name: "BEER BATTER FISH'N CHIPS",
          price: 14.5,
          description:
            "Two pieces of cod, served with home made cole slaw & tartar sauce",
          sizes: [{ name: "1 piece", price: 12 }],
        },
        {
          name: "HALF & HALF BASKET OF CHIPS",
          price: 12.75,
          description:
            "A mix of sweet yam fries & Yukon Gold fries served with aïoli",
          tags: [MenuItemTag.GlutenFree, MenuItemTag.Vegan],
        },
        {
          name: "YAM FRIES",
          price: 7.5,
          description: "With roasted garlic aïoli",
          tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree],
        },
        {
          name: "VEGGIES & DIP",
          price: 8.5,
          description:
            "Celery, carrots, broccoli, cauliflower, tomatoes, cucumber & ranch dip",
          tags: [
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFree,
            MenuItemTag.DairyFree,
          ],
        },
        {
          name: "OUR OWN VEGGIE CHILI",
          price: 7.5,
          description: "Served with Gluten Free corn tortilla chips",
          tags: [MenuItemTag.Vegan, MenuItemTag.GlutenFree],
        },
        {
          name: "CAESAR SALAD",
          price: 8.5,
          description:
            "Romaine lettuce, croutons & parmesan cheese. Served with garlic toast",
        },
        {
          name: "SPINACH SALAD",
          price: 10.5,
          description:
            "Fresh Spinach with red onion, candied cranberry, diced red pepper and grated carrots and feta with a raspberry vinaigrette. Served with garlic toast",
          tags: [MenuItemTag.Vegan],
        },
        {
          name: "GREEK SALAD",
          price: 13,
          description: "Traditional Greek salad served with pita and tzatiki",
        },
      ],
    },
    {
      name: "BURGERS",
      items: [
        {
          name: "VIKES BURGER - BEEF or CHICKEN",
          price: 15,
          description: "Bacon, cheddar, onions & barbeque sauce",
          sides: [
            {
              name: "Gluten free kaisers or bread available on request",
              price: 1.5,
            },
          ],
        },
        {
          name: "DELUXE CHICKEN BURGER",
          price: 15,
          description: "Classic chicken burger with guacamole, bacon and Swiss",
          sides: [
            {
              name: "Gluten free kaisers or bread available on request",
              price: 1.5,
            },
          ],
        },
        {
          name: "ORIGINAL BEEF BURGER",
          price: 12.5,
          description: "6 oz. charbroiled beef patty",
          sides: [
            {
              name: "Gluten free kaisers or bread available on request",
              price: 1.5,
            },
          ],
        },
        {
          name: "FALAFEL BURGER",
          price: 13.5,
          description:
            "Home made traditional Mediterranean garbanzo bean patty with sautéed mushrooms, onions & Swiss cheese",
          sides: [
            {
              name: "Gluten free kaisers or bread available on request",
              price: 1.5,
            },
          ],
        },
        {
          name: "VEGGIE BURGER",
          price: 13,
          description:
            "Topped with our own BBQ Sauce, sautéed mushrooms, onions & Swiss cheese",
          sides: [
            { name: "Feta, Cheddar or Swiss Cheese", price: 1.5 },
            { name: "Bacon or Ham", price: 3 },
            { name: "Falafel or Beef patty", price: 3 },
            { name: "Chicken breast", price: 4 },
            { name: "Onions, Mushrooms or Jalapenos or Barbeque", price: 0.75 },
            {
              name: "Gluten free kaisers or bread available on request",
              price: 1.5,
            },
          ],
        },
      ],
    },
    {
      name: "ON TAP",
      items: [
        {
          name: "VANCOUVER ISLAND BROKEN ISLANDS HAZY IPA & ISLANDER LAGER",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "FELICITA'S LAGER",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "HOYNE DARK MATTER & PILSNER",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "PHILLIPS BLUE BUCK & DINOSOUR",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "GRANVILLE ISLAND HONEY LAGER",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "LIGHTHOUSE NIGHT WATCH COFFEE LAGER",
          price: 5.75,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
        {
          name: "VIZZY HARD SELTZER",
          price: 5,
          sizes: [
            { name: "Sleeve (12oz)", price: 5.75 },
            { name: "Pitcher (54oz)", price: 22 },
          ],
        },
      ],
    },
    {
      name: "BY THE BOTTLE",
      items: [
        {
          name: "PABST BLUE RIBBON",
          price: 4.75,
        },
        {
          name: "WHISTLER FORAGER (gluten free)",
          price: 5.5,
        },
        {
          name: "DOMESTIC BOTTLES",
          price: 5,
          description: "Coors Original, Molson Canadian & Miller Genuine Draft",
        },
        {
          name: "PREMIUM BOTTLES",
          price: 6,
          description: "Heineken & Sol",
        },
        {
          name: "GUINNESS DRAUGHT CANS",
          price: 6.5,
        },
        {
          name: "CIDERS",
          price: 5.5,
          description: "Rock Creek Cider",
        },
        {
          name: "ARIZONA HARD ICE TEA",
          price: 5.5,
        },
        {
          name: "ISLAND LIFE SPARKLING VODKA SODA",
          price: 5.25,
        },
      ],
    },
    {
      name: "WINES",
      items: [
        {
          name: "WHITES",
          price: 6.5,
          description: "Glass (5oz)",
          sizes: [
            { name: "INNISKILLIN Pinot Grigio", price: 6.5 },
            { name: "HOUSE WHITE", price: 5.5 },
          ],
        },
        {
          name: "REDS",
          price: 6.5,
          description: "Glass (5oz)",
          sizes: [
            { name: "INNISKILLIN Cabernet Sauvignon", price: 6.5 },
            { name: "HOUSE RED", price: 5.5 },
          ],
        },
      ],
    },
  ],
};

const theGrillMenuExample: Menu = {
  id: "theGrill",
  sections: [
    {
      name: "BREAKFAST",
      items: [
        {
          name: "2 EGG BREAKFAST",
          price: 9,
          description: "2 fried eggs, hash browns, bacon or sausage & toast.",
        },
        {
          name: "CHEESE OMELETTE",
          price: 8.75,
          description:
            "2 egg omelette with cheese. Served with hash browns & toast.",
        },
        {
          name: "DENVER OMELETTE",
          price: 8.75,
          description:
            "2 egg omelette, cheese, onions, bell pepper and bacon. Served with hash browns & toast.",
        },
        {
          name: "EGGS BENEDICT",
          price: 10.75,
          sizes: [
            { name: "half", price: 7.75 },
            { name: "full", price: 10.75 },
          ],
          description:
            "Toasted English muffin topped with two poached eggs, ham, and Hollandaise sauce. Served with hashbrowns.",
        },
        {
          name: "BREAKFAST QUESADILLA",
          price: 8.75,
          description:
            "2 eggs scrambled with cheese & bacon folded in a flour tortilla and grilled. Served with hash browns.",
        },
        {
          name: "BREAKFAST SANDWICH",
          price: 9.25,
          description:
            "Fried egg with bacon, cheese, lettuce, tomato & mayo. Served on a multigrain brioche bun & side choice.",
        },
        {
          name: "BREAKFAST WRAP",
          price: 8.75,
          description:
            "2 eggs scrambled with cheese, onions & bell pepper rolled in a flour tortilla. Served with hash browns.",
        },
        {
          name: "KIMCHI HASH",
          price: 8.75,
          description:
            "Scrambled eggs with hash browns, bacon, kimchi, Sriracha mayo and green onion.",
        },
        {
          name: "DAILY CONGEE",
          price: 5.75,
          description:
            "Chinese style savoury rice porridge served with a fried bao. Check the special board for today's flavour.",
        },
        {
          name: "2 SLICES OF TOAST",
          price: 3.5,
        },
        {
          name: "HASHBROWNS",
          price: 4.5,
        },
        {
          name: "SAUSAGE OR BACON",
          price: 1.25,
          description: "1 EGG",
        },
      ],
    },
    {
      name: "INTERNATIONAL",
      items: [
        {
          name: "BBQ PORK (CHAR SIU)",
          price: 11.5,
          description:
            "Cantonese style glazed pork roast sliced with fried rice or chow mein.",
        },
        {
          name: "ROAST CHICKEN LEG",
          price: 10.25,
          description:
            "Seasoned and roasted whole chicken leg with fried rice or chow mein.",
        },
        {
          name: "SWEET & SOUR PORK",
          price: 10.5,
          description:
            "Crispy pork tossed in a sweet and sour pineapple sauce and served with fried rice or chow mein.",
        },
        {
          name: "HOKKIEN NOODLE STIRFRY",
          price: 10.25,
          description:
            "Thick wheat noodles & chicken stirfried with carrots, sui choy and green onions in a sweet ginger & dark soy coconut sauce.",
        },
        {
          name: "INDIAN STYLE CHICKEN CURRY",
          price: 10.5,
          description:
            "A rich and spicy tomato curry on rice. Choice of tossed salad or pita.",
        },
        {
          name: "TEX-MEX PLATE",
          price: 9,
          description:
            "Seasoned black beans and Spanish rice with cheese, sour cream, salsa and a flour tortilla. Add pulled chicken or pork $2.00",
        },
        {
          name: "SPAGHETTI & MEATBALLS",
          price: 8.5,
          description:
            "Pork meatballs and Marinara sauce served on spaghetti with Parmesan cheese and garlic toast.",
        },
        {
          name: "BLACK BEAN BURRITO",
          price: 7.5,
          description:
            "Black beans, Spanish rice, cheese, lettuce, sour cream and salsa wrapped in a flour tortilla.",
        },
        {
          name: "CHOW MEIN",
          price: 7.5,
        },
        {
          name: "FRIED RICE",
          price: 7.5,
        },
        {
          name: "RICE & BEANS",
          price: 6.5,
        },
        {
          name: "EXTRA PITA",
          price: 1.5,
        },
      ],
    },
    {
      name: "WRAPS",
      items: [
        {
          name: "COD WRAP",
          price: 11.75,
          description: "Battered Cod, lettuce, tomato, & tartar sauce.",
        },
        {
          name: "CHICKEN CHIPOTLE",
          price: 11.5,
          description: "Breaded chicken, lettuce, tomato & chipotle mayo.",
        },
        {
          name: "CALIFORNIA CHICKEN",
          price: 11.5,
          description:
            "Breaded chicken, guacamole, lettuce, salsa & chipotle mayo.",
        },
        {
          name: "CHICKEN BACON",
          price: 11.5,
          description: "Breaded chicken, bacon.",
        },
        {
          name: "CAESAR CHICKEN",
          price: 10.25,
          description: "Breaded chicken and Caesar salad.",
        },
        {
          name: "CHICKEN CAESAR",
          price: 10.25,
          description: "Breaded chicken & Caesar salad.",
        },
        {
          name: "HONEY MUSTARD CHICKEN",
          price: 10.25,
          description:
            "Breaded chicken, lettuce, tomato with honey mustard sauce.",
        },
      ],
    },
  ],
};

const starbucksMenu: Menu = {
  id: "starbucks",
  sections: [
    {
      name: "Coffee",
      items: [
        {
          name: "Caffè Americano",
          price: 2.95,
          description:
            "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.",
        },
        {
          name: "Caffè Latte",
          price: 3.65,
          description:
            "Rich, full-bodied espresso with bittersweet milk and a hint of sweetness.",
        },
        {
          name: "Cappuccino",
          price: 3.45,
          description:
            "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam.",
        },
      ],
    },
    {
      name: "Tea",
      items: [
        {
          name: "Teavana® Shaken Iced Tea",
          price: 2.75,
          description:
            "A smooth, delightful blend of water, ice, Teavana® tea and flavors of your choice, each served over ice.",
        },
        {
          name: "Chai Latte",
          price: 4.25,
          description:
            "Black tea infused with cinnamon, clove, and other warming spices are combined with steamed milk and topped with foam for the perfect balance of sweet and spicy.",
        },
      ],
    },
    {
      name: "Bakery",
      items: [
        {
          name: "Blueberry Muffin",
          price: 2.95,
          description:
            "Blueberry muffin with a soft, moist center, and a hint of lemon.",
        },
        {
          name: "Classic Coffee Cake",
          price: 3.25,
          description:
            "A traditional coffee cake with a crumbly cinnamon streusel topping.",
        },
      ],
    },
    {
      name: "Sandwiches & Wraps",
      items: [
        {
          name: "Turkey & Swiss Sandwich",
          price: 6.95,
          description:
            "Slow-roasted turkey, Swiss cheese, and crisp lettuce on a hearty wheat bread.",
        },
        {
          name: "Mozzarella & Tomato Panini",
          price: 7.25,
          description:
            "Fresh mozzarella, sliced tomatoes, and basil pesto on ciabatta bread.",
        },
      ],
    },
    // Additional sections can be added here such as "Salads", "Smoothies", etc.
  ],
};

const EntreeMenu: Menu = {
  id: "entree",
  sections: [
    {
      name: "Main",
      items: [
        {
          name: "Meal",
          price: 12.0,
          description: "1 entree, 2 sides",
        },
        {
          name: "Carvery Meal",
          price: 14.0,
          description: "1 Carvery, 2 sides",
        },
      ],
    },
    {
      name: "Lunch (11am-2pm)",
      items: [
        {
          name: "Beef & Broccoli",
          price: 12.0,
          description: "Entrée with beef and broccoli.",
        },
        {
          name: "Vegetable Medley",
          price: 0,
          description: "Side of mixed vegetables.",
        },
        {
          name: "Brown Rice",
          price: 0,
          description: "Side of brown rice.",
        },
      ],
    },
    {
      name: "Dinner (5pm-7:30pm)",
      items: [
        {
          name: "Teriyaki Pork",
          price: 7.0,
          description: "Entrée with teriyaki pork.",
        },
        {
          name: "Chop Suey",
          price: 3.0,
          description: "Side of chop suey.",
        },
        {
          name: "Rice & Quinoa Pilaf",
          price: 3.0,
          description: "Side of rice and quinoa pilaf.",
        },
        {
          name: "Carvery (changes daily)",
          price: 14.0,
          description: "Carvery meal with a daily selection.",
        },
      ],
    },
  ],
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
          description: "Ask Your Server $7 for a Cup",
        },
        {
          name: "BAKED BRIE",
          price: 21,
          description:
            "Little Qualicum Brie, Fig Apricot Chutney, Grilled Bread",
        },
        {
          name: "CHORIZO QUESADILLA",
          price: 23,
          description:
            "Chorizo, Pear, Cambozola Cheese, Lime Crema & Gaucho Fries",
        },
        {
          name: "KALE CAESAR",
          price: 17,
          description:
            "Kale, Romaine, Bacon Bits, Herbed Garlic Croutons, Grana Padano",
        },
        {
          name: "FISH AND CHIPS",
          price: 20,
          description:
            "One 3oz Piece Crispy Cod, Fries, Tartar Sauce, Slaw & Lemon",
        },
      ],
    },
    {
      name: "MAIN COURSES",
      items: [
        {
          name: "TOFU BUDDHA BOWL (Vegan & GF)",
          price: 25,
          description:
            "Marinated Tofu, Brown Rice, Edamame, Carrot, Kale, Red Cabbage, Roasted Corn, Creamy Tamari Tahini Dressing",
        },
        {
          name: "HALIBUT CRUNCH BURGER",
          price: 26,
          description:
            "Tempura Battered Halibut, Hoisin Chili Sauce, Sesame Slaw, Brioche Bun & Fries",
        },
        {
          name: "CLUB SMASH BURGER",
          price: 25,
          description:
            "Two 3oz Beef Patties, Club Burger Sauce, Smoked Cheddar, Dill Pickles, Roma Tomato, Maple Bacon Mushroom Jam, Brioche, Fries",
        },
        {
          name: "EGGPLANT BOLOGNESE (Vegetarian & GF)",
          price: 24,
          description:
            "Gluten Free Penne Rigate, Grilled Eggplant, Smoky Tomato Sauce, Basil Walnut Pesto",
        },
        {
          name: "TUNA POKE BOWL (GF) (DF)",
          price: 26,
          description:
            "Seasoned Rice, Pickled Watermelon, Carrot, Cucumber, Onion, Tomato, Candied Walnuts, Pineapple & Sesame Seeds",
        },
        {
          name: "SALMON & MASH (GF)",
          price: 28,
          description:
            "Pan Seared Salmon, Miso Mashed Potato, Asian Ginger Glaze & Edamame",
        },
        {
          name: "FISH AND CHIPS",
          price: 29,
          description:
            "Two Pieces Crispy Cod, Fries, Coleslaw, Tartar Sauce, Lemon",
        },
        {
          name: "LAMB SHANK",
          price: 31,
          description:
            "Tender Marsala Braised Lamb Shank, Coconut Saffron Rice, Curried Tomato Broth",
        },
      ],
    },
    {
      name: "DESSERT",
      items: [
        {
          name: "CHOCOLATE MOUSSE (GF)",
          price: 10,
        },
        {
          name: "DAILY FRESH DESSERT",
          price: 11,
        },
        {
          name: "PARACHUTE ICE CREAM",
          price: 10,
          description: "Ask your server for our current flavours",
        },
      ],
    },
  ],
};

const MacMenu: Menu = {
  id: "mac",
  sections: [
    {
      name: "Coffee",
      items: [
        {
          name: "Caffè Americano",
          price: 2.95,
          description:
            "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance.",
        },
        {
          name: "Caffè Latte",
          price: 3.65,
          description:
            "Rich, full-bodied espresso with bittersweet milk and a hint of sweetness.",
        },
        {
          name: "Cappuccino",
          price: 3.45,
          description:
            "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam.",
        },
      ],
    },
    {
      name: "Tea",
      items: [
        {
          name: "Teavana® Shaken Iced Tea",
          price: 2.75,
          description:
            "A smooth, delightful blend of water, ice, Teavana® tea and flavors of your choice, each served over ice.",
        },
        {
          name: "Chai Latte",
          price: 4.25,
          description:
            "Black tea infused with cinnamon, clove, and other warming spices are combined with steamed milk and topped with foam for the perfect balance of sweet and spicy.",
        },
      ],
    },
    {
      name: "Bakery",
      items: [
        {
          name: "Blueberry Muffin",
          price: 2.95,
          description:
            "Blueberry muffin with a soft, moist center, and a hint of lemon.",
        },
        {
          name: "Classic Coffee Cake",
          price: 3.25,
          description:
            "A traditional coffee cake with a crumbly cinnamon streusel topping.",
        },
      ],
    },
    {
      name: "Sandwiches & Wraps",
      items: [
        {
          name: "Turkey & Swiss Sandwich",
          price: 6.95,
          description:
            "Slow-roasted turkey, Swiss cheese, and crisp lettuce on a hearty wheat bread.",
        },
        {
          name: "Mozzarella & Tomato Panini",
          price: 7.25,
          description:
            "Fresh mozzarella, sliced tomatoes, and basil pesto on ciabatta bread.",
        },
      ],
    },
    // Additional sections can be added here such as "Salads", "Smoothies", etc.
  ],
};

// Mystic Market Building 

const ChopBoxMenu: Menu = {
  id: "chopbox",
  sections: [
    {
      name: "Signature Chop Boxes",
      items: [
        {
          name: "Tamarind Pad Thai",
          price: 8.00,
          description: "Authentic Pad Thai with Shanghai noodles",
          tags: []
        },
        {
          name: "Mongolian Black Bean",
          price: 8.00,
          description: "Sweet & salty with ginger & sesame with Shanghai noodles",
          tags: []
        },
        {
          name: "Green Thai Curry",
          price: 8.00,
          description: "Coconut curry flavoured with lime leaves & chili with egg noodles",
          tags: [MenuItemTag.VeganOption]
        },
        {
          name: "Red Thai Curry",
          price: 8.00,
          description: "Mildly spiced Thai coconut curry with egg noodles",
          tags: [MenuItemTag.VeganOption]
        },
        {
          name: "Panang Curry",
          price: 8.00,
          description: "Medium spiced with a hint of sweet & salty with egg noodles",
          tags: [MenuItemTag.VeganOption]
        }
      ],
      description: "Substitute any box with steamed rice (Vegan), rice noodles (Vegan), Shanghai noodles or egg noodles",
      sides: [
        {name: "Add Protein", price: 3.50, description: "Choose from tofu (Vegan), chicken breast, shrimp or beef"},
        {name: "Extra Sauce", price: 1.00}
      ]
    },
    {
      name: "Ramen",
      items: [
        {
          name: "Ramen",
          price: 6.50,
          description: "Fresh noodles & vegetables in mushroom stock."
        }
      ],
    sides: [
      {
        name: "Tofu",
        price: 3.50
      },
      {
        name: "Soft boiled egg",
        price: 2.00
      },
      {
        name: "Chicken",
        price: 3.50
      }
    ]
    },
    {
      name: "Add to Any Meal",
      items: [
        {
          name: "Fountain Drink 22oz",
          price: 1.75
        },
        {
          name: "Coffee/Tea 12oz",
          price: 1.75
        },
        {
          name: "Coffee 16oz",
          price: 1.95
        },
        {
          name: "Fountain Drink 22oz (alt)",
          price: 2.59
        }
      ]
    }
  ]
};

const FrescoMenu: Menu = {
  id: "fresco",
  sections: [
    {
      name: "Fresco Taco Bar",
      items: [
        {
          name: "Soft Tacos",
          description: "BEAN/ BEEF/ CHICKEN on corn tortilla + salsa fresco; ROCKFISH served on flour tortilla + aioli, slaw, mango salsa. 3 for $10.99",
          price: 3.79,
          sizes: [
            { name: "Each", price: 3.79 },
            { name: "3 for", price: 10.99 }
          ]
        },
        {
          name: "Burritos",
          description: "BEAN/ BEEF/ CHICKEN flour tortilla + beans + brown rice, each with lettuce, sour cream & salsa",
          price: 10.99,
        },
        {
          name: "Taco Salad",
          description: "Mixed beans, tortilla chips, and iceberg lettuce with salsa fresco, sour cream & cheese",
          price: 10.99
        },
        {
          name: "Cheese Quesadilla",
          description: "BEAN/ BEEF/ CHICKEN with cheese grilled in a flour tortilla, served with sour cream & salsa",
          price: 10.99,
        },
        {
          name: "Extreme Fresco Fries",
          description: "Served with shredded cheese, sour cream & salsa fresco",
          price: 8.99
        },
        {
          name: "Value Bean Burrito",
          description: "Chickpeas & mixed beans wrapped in flour tortilla",
          price: 5.00
        },
        {
          name: "Crisp Beef Burrito",
          description: "served with taco sauce",
          price: 6.00
        }
      ]
    },
    {
      name: "Add-Ons",
      items: [
        {
          name: "Chicken/Beef",
          price: 4.99,
          tags: []
        },
        {
          name: "Guacamole",
          price: 3.49
        },
        {
          name: "Sour Cream",
          price: 1.49
        },
        {
          name: "Salsa Fresco",
          price: 1.49
        },
        {
          name: "Cheese",
          price: 2.00
        },
        {
          name: "Vegan Cheese",
          price: 2.99
        }
      ]
    },
    {
      name: "Sides",
      items: [
        {
          name: "Mexican Rice",
          price: 3.79
        },
        {
          name: "Refried Beans",
          price: 3.79
        },
        {
          name: "Fresco Fries",
          price: 5.49
        },
        {
          name: "Chips & Salsa",
          price: 6.99
        }
      ]
    },
    {
      name: "Make It a Combo",
      description: "Add fries + 24oz fountain drink/12oz coffee",
      items: [
        {
          name: "Combo",
          price: 4.99
        }
      ]
    }
  ]
};

const TreksMenu: Menu = {
  id: "treks",
  sections: [
    {
      name: "Sandwich",
      items:[
        {
          name: "Build Your Own Sandwich",
          price: 9.99,
          description: "Choose your base, spread, cheese, protein, and add-ons to build your perfect sandwich.",
          sides: [
            {name: "Base", price: 0, description: "Wrap: Whole Wheat, Plain, Tomato, Spinach, Herb & Garlic. Bread: Whole Wheat, Multigrain, Sourdough, Marble Rye"},
            {name: "Spreads", price: 0, description: "Vegan Cheddar, Regular Cheddar, Smoked Cheddar, Havarti, Swiss"},
            {name: "Cheese", price: 0, description: "Regular Mustard, Dijon, Mayo, Chipotle Mayo, Horseradish Mayo, Roast Garlic & Chive Mayo, Sweet Onion Dressing"},
            {name: "Protein", price: 0, description: "Spicy Black Beans, Hummus, Pesto Chickpeas, Pesto Chicken Salad, Smoked Pepper Salmon Salad, Egg Salad, Tuna Salad, Cajun Chicken, Black Forest Ham, Buffalo Chicken, Roast Beef"},
            {name: "Gluten Friendly Wrap", price: 2.00},
            {name: "Avocado", price: 3.00},
            {name: "Bacon", price: 1.50}
          ]
        }
      ],
      tags: [MenuItemTag.VeganOption, MenuItemTag.DairyFreeOption, MenuItemTag.GlutenFreeOption]
    },
    {
      name: "Other",
      items: [
        {
          name: "Grilled Cheese",
          price: 5.00,
          tags: [MenuItemTag.VeganOption, MenuItemTag.DairyFreeOption]
        },
        {
          name: "Soup",
          price: 4.99,
          description: "Ask your server for today's selection.",
          tags: []
        },
        {
          name: "Add Soup",
          price: 4.79,
          tags: []
        },
        {
          name: "Add Fountain Drink 24oz",
          price: 2.29,
          tags: []
        },
        {
          name: "Add Coffee/Tea 12oz",
          price: 2.29,
          tags: []
        }
      ]
    }

  ]
}; 

// GradHouse Building
const GradHouseMenu: Menu = {
  id: "gradhouse",
  sections: [
    {
      name: "Snacks N Things",
      items: [
        {
          name: "House Nachos",
          price: 14,
          description:
            "Tortilla chips topped with diced tomatoes, green onions, banana peppers, and mozzarella. Served with sour cream and salsa. Add chicken for $4.",
        },
        {
          name: "Yam Fries",
          price: 8,
          description: "We took a yam and then we cut it into fry shapes. Served with chipotle mayo.",
        },
        {
          name: "Fries",
          price: 5,
          description: "If you need clarification on this one, you're on your own.",
        },
        {
          name: "Quesadilla",
          price: 12.25,
          description:
            "Chicken, green onion, tomato, banana peppers, cheddar, and mozzarella cheese inside of a tortilla. Served with salsa and sour cream. Ask to sub soy ginger tofu for chicken.",
        },
        {
          name: "Wings",
          price: 15,
          description:
            "All you need to know is that our wings are better than Fels's wings. 10 per order. Choice of hot, nude, hot & pepper, or sweet chili.",
        },
        {
          name: "Perogies",
          price: 7,
          description:
            "Potato and cheese filling, just like your grandma intended. Served with sour cream and your choice of garden salad or fries.",
        },
        {
          name: "Grilled Cheese",
          price: 7,
          description:
            "Garlic butter, cheese, bread. All good stuff. Served with your choice of garden salad or fries. Add bacon for $2 | Add tomato for $2.",
        },
        {
          name: "Lentil Kitchari",
          price: 4,
          description: "A lentil and rice stew – all your vitamins in one bowl.",
        },
      ],
    },
    {
      name: "Burgers, Wraps & Salads",
      items: [
        {
          name: "Beef Burger",
          price: 14.50,
          description:
            "Your classic beef patty with burger sauce, lettuce, tomato, and red onion served on a brioche bun. Add bacon $1.50 | Add cheddar $1.50 | Add mushrooms $1.",
        },
        {
          name: "Citrus Chicken Burger",
          price: 14,
          description:
            "Citrus marinated chicken breast with spicy slaw served on a brioche bun. Add bacon $1.50 | Add cheddar $1.50 | Add mushrooms $1.",
        },
        {
          name: "Chickpea Lentil Burger",
          price: 12,
          description:
            "Chickpea lentil patty with beet hummus, lettuce, tomato, and red onion served on a brioche bun. Add bacon $1.50 | Add cheddar $1.50 | Add mushrooms $1.",
        },
        {
          name: "Veggie Wrap",
          price: 13.50,
          description:
            "Sweet potato, cucumber, tomato, spinach, arugula, bell pepper, pumpkin seeds, and cilantro wrapped in a tortilla with beet hummus and balsamic dressing.",
        },
        {
          name: "Halifornia Wrap",
          price: 12,
          description:
            "I've renamed this out of spite - California is in America and I am from Halifax. Nobody can stop me. Chicken, lettuce, spinach, salsa and guacamole wrapped in a tortilla.",
        },
        {
          name: "Grad House Salad",
          price: 9.50,
          description:
            "Spinach, arugula, cucumber, grape tomatoes, and mushrooms tossed in balsamic vinaigrette and topped with feta and walnuts. Ask to make vegetarian or vegan.",
        },
      ],
    },
  ],
}

// Library Building 
const biblioCafe: Menu = {
  id: "biblio",
  sections: [
    {
      name: "Hot Beverages",
      description: "All Flavouring Syrups are $0.70, Soy Subtitute / Soy Sub for Coffee $0.80",
      items: [
        {
          name: "Drip Coffee",
          price: 2.65,
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 }
          ]
        },
        {
          name: "Tea",
          price: 2.65,
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 }
          ]
        },
        {
          name: "Americano",
          price: 3.65,
          sizes: [
            { name: "12oz", price: 3.65 },
            { name: "16oz", price: 4.25 },
            { name: "20oz", price: 4.65 }
          ]
        },
        {
          name: "Cappuccino",
          price: 4.25,
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 4.85 },
            { name: "20oz", price: 5.45 }
          ]
        },
        {
          name: "Latte",
          price: 4.45,
          sizes: [
            { name: "12oz", price: 4.45 },
            { name: "16oz", price: 4.95 },
            { name: "20oz", price: 5.45 }
          ]
        },
        {
          name: "Latte Vanilla",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 }
          ]
        },
        {
          name: "Caramel Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 }
          ]
        },
        {
          name: "White Chocolate Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 }
          ]
        },
        {
          name: "Espresso",
          price: 2.95,
          sizes: [
            { name: "Single", price: 2.95 },
            { name: "Double", price: 3.25 },
          ]
        },
        {
          name: "Mocha",
          price: 4.85,
          sizes: [
            { name: "12oz", price: 4.85 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.85 }
          ]
        },
        {
          name: "Hot Chocolate",
          price: 4.25,
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 4.45 },
            { name: "20oz", price: 4.65 }
          ]
        },
        {
          name: "Steamed Milk",
          price: 3.25,
          sizes: [
            { name: "12oz", price: 3.25 },
            { name: "16oz", price: 3.35 },
            { name: "20oz", price: 3.75 }
          ]
        },
        {
          name: "London Fog",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 }
          ]
        },
        {
          name: "Chai Latte",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 }
          ]
        },
        {
          name: "Matcha Latte",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 }
          ]
        }
      ]
    },
    {
      name: "Cold Drinks",
      items: [
        {
          name: "Iced Coffee",
          price: 4.95,
          sizes: [
            { name: "16oz", price: 4.95 }
          ]
        },
        {
          name: "Coffee Frappe",
          price: 5.95,
          sizes: [
            { name: "16oz", price: 5.95 }
          ]
        },
        {
          name: "Mocha Frappe",
          price: 5.95,
          sizes: [
            { name: "16oz", price: 5.95 }
          ]
        },
        {
          name: "Caramel Coffee Frappe",
          price: 5.95,
          sizes: [
            { name: "16oz", price: 5.95 }
          ]
        },
        {
          name: "Green Tea Matcha Frappe",
          price: 5.95,
          sizes: [
            { name: "16oz", price: 5.95 }
          ]
        },
        {
          name: "Fruit Smoothie",
          price: 5.95,
          sizes: [
            { name: "16oz", price: 5.95 }
          ]
        }
      ]
    },
    {
      name: "Grab + Go",
      items: [
        {
          name: "Wedge Sandwich",
          price: 5.00,
        },
        {
          name: "Deluxe Sandwich",
          price: 9.49
        },
        {
          name: "Premium Sandwich",
          price: 9.99
        },
        {
          name: "Green Salad",
          price: 8.29
        },
        {
          name: "Specialty Salad",
          price: 9.99
        },
        {
          name: "Rolls (Beef & Veggie)",
          price: 3.49
        },
        {
          name: "Samosas (Chicken & Veggie)",
          price: 5.00
        },
        {
          name: "Veggies + Hummus",
          price: 6.29
        },
        {
          name: "Veggies + Dip",
          price: 6.29
        },
        {
          name: "Fruit + Cheese",
          price: 6.29
        },
        {
          name: "Parfait",
          price: 6.49
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
  uniclubMenuExample,
  ChopBoxMenu,
  FrescoMenu,
  GradHouseMenu,
  MacMenu,
  TreksMenu,
  biblioCafe,
];

export { Menu, MenuItem, MenuItemTag, menuExample };
