import { VENDOR_NAMES } from "./Constants";

enum MenuItemTag {
  Vegan = "Vegan",
  VeganOption = "Vegan Option",
  Spicy = "Spicy",
  GlutenFree = "Gluten Free",
  GlutenFreeOption = "Gluten Free Option",
  DairyFree = "Dairy Free",
  DairyFreeOption = "Dairy Free Option",
  Halal = "Halal",
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
  hidden?: boolean;
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
  vendor_name: string;
  sections: MenuSection[];
};

const noMenu: Menu = {
  vendor_name: "NA",
  sections: [
    {
      name: "No Menu Available",
      items: [
        {
          name: "No Menu Available",
          price: 0,
          description:
            "We are working on getting the menu for this vendor. Thank you for your patience.",
        },
      ],
    },
  ],
};

// Cove Building
// Menu Example from Greens in Cove from Feburary 13th 2024
const greensMenuExample: Menu = {
  vendor_name: VENDOR_NAMES.GREENS,
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

const EntreeMenu: Menu = {
  vendor_name: VENDOR_NAMES.ENTREE,
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

const ShawarmaMenu: Menu = {
  vendor_name: VENDOR_NAMES.SHAWARMA,
  sections: [
    {
      name: "Wraps",
      items: [
        {
          name: "Mushroom Shawarma",
          price: 10.95,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFreeOption],
        },
        {
          name: "Falafel Shawarma ",
          price: 10.95,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFreeOption],
        },
        {
          name: "Chicken Shawarma",
          price: 10.95,
          tags: [MenuItemTag.Halal],
        },
        {
          name: "Beef Gyro",
          price: 10.95,
          tags: [MenuItemTag.Halal],
        },
      ],
    },
    {
      name: "Bowls",
      items: [
        {
          name: "Mushroom Shawarma Bowl",
          price: 12.0,
          tags: [
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFree,
            MenuItemTag.DairyFree,
          ],
        },
        {
          name: "Falafel",
          price: 12.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Chicken Shawarma",
          price: 12.0,
          tags: [MenuItemTag.Halal, MenuItemTag.DairyFree, MenuItemTag.Halal],
        },
      ],
    },
    {
      name: "Salads",
      items: [
        {
          name: "Falafel Salad",
          price: 12.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Chicken Shawarma Salad",
          price: 12.0,
          tags: [MenuItemTag.Halal, MenuItemTag.DairyFree, MenuItemTag.Halal],
        },
      ],
    },
    {
      name: "Sides",
      items: [
        {
          name: "Hummus",
          price: 2.0,
          tags: [
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFree,
            MenuItemTag.DairyFree,
          ],
        },
        {
          name: "Pita",
          price: 2.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Falafel",
          price: 4.95,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "French Fries",
          price: 3.25,
          tags: [
            MenuItemTag.Vegan,
            MenuItemTag.DairyFree,
            MenuItemTag.GlutenFree,
          ],
          description: "Fried in same deep fryer as gluten items",
        },
      ],
    },
  ],
};

const StirFryMenu: Menu = {
  vendor_name: VENDOR_NAMES.STIRFRY,
  sections: [
    {
      name: "STIR FRY",
      items: [
        {
          name: "Stir Fry",
          price: 12.0,
          description: "Choose your Sauce, Noodle & Protein",
          tags: [
            MenuItemTag.VeganOption,
            MenuItemTag.DairyFreeOption,
            MenuItemTag.GlutenFreeOption,
          ],
          sides: [
            {
              name: "Choose a Sauce",
              price: 0,
              description:
                "Tamarind Pad Thai, Mongolian Black Bean, Green Thai Curry, Red Thai Curry, Panang Curry",
            },
            {
              name: "Choose Noodles or Rice",
              price: 0,
              description: "Brown Rice, Rice Noodles, Shanghai Noodles",
            },
            {
              name: "Choose a Protein",
              price: 0,
              description:
                "Marinated Tofu, Stir Fried Chicken, Marinated Grilled Pork, Shrimp",
            },
          ],
        },
      ],
      sides: [
        {
          name: "Extra Protein",
          price: 4.99,
        },
        {
          name: "Extra Noodles or Rice",
          price: 3.99,
        },
        {
          name: "Extra Sauce",
          price: 1.99,
        },
      ],
    },
    {
      name: "STIR FRY",
      items: [
        {
          name: "Veggie Spring Rolls (2)",
          price: 5.0,
          description: "Served with plum sauce",
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Pork Gyoza (5)",
          price: 7.0,
        },
      ],
    },
  ],
};

const DeliCoveMenu: Menu = {
  vendor_name: VENDOR_NAMES.DELI_COVE,
  sections: [
    {
      name: "Sandwich",
      items: [
        {
          name: "Build Your Own Sandwich",
          price: 9.99,
          description:
            "Choose your base, spread, cheese, protein, and add-ons to build your perfect sandwich.",
          sides: [
            {
              name: "Base",
              price: 0,
              description:
                "Bread: Whole Wheat, Multigrain, Sourdough, Marble Rye. Wrap: Whole Wheat, Plain, Tomato, Spinach. Other: Flatbread, Bannock, Everything Bagel",
            },
            {
              name: "Spreads",
              price: 0,
              description:
                "Regular Mustard, Dijon, Mayo, Roast Garlic & Chive Mayo, Chipotle Mayo, Horseradish Mayo, Sweet Onion Dressing",
            },
            {
              name: "Cheese",
              price: 0,
              description:
                "Vegan Cheddar, Regular Cheddar, Smoked Cheddar, Havarti, Swiss",
            },
            {
              name: "Protein",
              price: 0,
              description:
                "Spicy Black Beans, Hummus, Pesto Chickpeas, Smoked Pepper Salmon Salad, Egg Salad, Tuna Salad, Pesto Chicken Salad, Chipotle Pepper Salad, Chicken, Black Forest Ham, Roast Beef, Turkey, Buffalo Chicken",
            },
            { name: "Extras", price: 5.0, description: "Bison Bannock Taco" },
          ],
          tags: [
            MenuItemTag.VeganOption,
            MenuItemTag.DairyFreeOption,
            MenuItemTag.GlutenFreeOption,
          ],
        },
      ],
    },
    {
      name: "Extras",
      items: [
        {
          name: "Gluten Friendly Bread",
          price: 2.0,
          tags: [MenuItemTag.GlutenFree],
        },
        {
          name: "Avocado",
          price: 3.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Bacon",
          price: 1.5,
        },
        {
          name: "Kettle Chips",
          price: 4.99,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
      ],
    },
  ],
};

const SoupSaladCoveMenu: Menu = {
  vendor_name: VENDOR_NAMES.SOUP_SALAD_COVE,
  sections: [
    {
      name: "Soup",
      items: [
        {
          name: "Daily Soup",
          price: 4.99,
          tags: [MenuItemTag.VeganOption, MenuItemTag.DairyFreeOption],
          description: "Includes 2 packs of crackers",
        },
      ],
    },
    // {
    //   name: "Salad",
    //   items: [
    //     {
    //       name: "Marinara Pasta",
    //       price: 7.00,
    //       description: "Pasta served 11am-2pm & 5pm-7:30pm"
    //     },
    //     {
    //       name: "Alfredo Pasta",
    //       price: 7.00,
    //       description: "Pasta served 11am-2pm & 5pm-7:30pm"
    //     }
    //   ]
    // }
  ],
};

const PizzaCoveMenu: Menu = {
  vendor_name: VENDOR_NAMES.PIZZA_COVE,
  sections: [
    {
      name: "Pizza",
      items: [
        {
          name: "Spinach and Artichoke",
          price: 5.0,
          tags: [MenuItemTag.VeganOption],
          description: "Enjoy a slice of our daily pizza selection.",
          sizes: [
            { name: "1x Slice", price: 5.0 },
            { name: "2x Slices", price: 9.0 },
          ],
        },
        {
          name: "Chicken Pesto",
          price: 5.0,
          description: "Enjoy a slice of our daily pizza selection.",
          sizes: [
            { name: "1x Slice", price: 5.0 },
            { name: "2x Slices", price: 9.0 },
          ],
        },
        {
          name: "Gluten Free Vegan Pizza",
          price: 5.0,
          tags: [MenuItemTag.VeganOption, MenuItemTag.GlutenFreeOption],
          description: "Enjoy a slice of our daily pizza selection.",
          sizes: [
            { name: "1x Slice", price: 5.0 },
            { name: "2x Slices", price: 9.0 },
          ],
        },
      ],
    },
    {
      name: "Pasta",
      items: [
        {
          name: "Marinara Pasta",
          price: 7.0,
          description: "Pasta served 11am-2pm & 5pm-7:30pm",
        },
        {
          name: "Alfredo Pasta",
          price: 7.0,
          description: "Pasta served 11am-2pm & 5pm-7:30pm",
        },
      ],
    },
  ],
};

const GrillCoveMenu: Menu = {
  vendor_name: VENDOR_NAMES.GRILL_COVE,
  sections: [
    {
      name: "BURGERS & MORE",
      items: [
        {
          name: "Quinoa Burger",
          price: 8.95,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
        {
          name: "Grilled Cheese",
          price: 5.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFreeOption],
        },
        {
          name: "Grilled Ham & Cheese",
          price: 7.75,
          tags: [MenuItemTag.DairyFreeOption],
        },
        {
          name: "Grilled Chicken Burger",
          price: 8.95,
          tags: [MenuItemTag.DairyFree],
        },
        {
          name: "50/50 Burger",
          price: 8.95,
          tags: [MenuItemTag.DairyFree],
        },
        {
          name: "Beef Hot Dog",
          price: 5.0,
        },
        {
          name: "Pulled Pork Sandwich",
          price: 9.95,
        },
        {
          name: "Chicken Strips",
          price: 9.95,
          tags: [MenuItemTag.DairyFree],
        },
        {
          name: "Chicken Caesar Wrap",
          price: 10.95,
        },
        {
          name: "Chicken Caesar Salad",
          price: 12.95,
        },
        {
          name: "Poutine",
          price: 9.95,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
        },
      ],
      sides: [
        {
          name: "Fries",
          price: 3.0,
        },
        {
          name: "Onion Rings",
          price: 6.0,
        },
        {
          name: "Add Avocado",
          price: 3.0,
        },
        {
          name: "Add Cheese",
          price: 1.5,
          description: "Choice of cheddar or vegan",
        },
        {
          name: "Add Gravy",
          price: 3.0,
        },
        {
          name: "Add Bacon",
          price: 1.5,
        },
        {
          name: "Add Chicken",
          price: 7.5,
        },
      ],
    },
    {
      name: "ADD ONS",
      items: [
        {
          name: "French Fries",
          price: 3.25,
          description: "Fried in same deep fryer as gluten items",
          tags: [
            MenuItemTag.Vegan,
            MenuItemTag.GlutenFree,
            MenuItemTag.DairyFree,
          ],
          sizes: [
            { name: "Side", price: 3.25 },
            { name: "Full", price: 6.95 },
          ],
        },
        {
          name: "Onion Rings",
          price: 6.0,
          tags: [MenuItemTag.Vegan, MenuItemTag.DairyFree],
          sizes: [
            { name: "Side", price: 6.0 },
            { name: "Full", price: 8.95 },
          ],
        },
      ],
    },
  ],
};

// Student Union Building
const felicitasMenu: Menu = {
  vendor_name: VENDOR_NAMES.FELICITAS,
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

const theGrillMenu: Menu = {
  vendor_name: VENDOR_NAMES.GRILL,
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

const BeanThereMenu: Menu = {
  vendor_name: VENDOR_NAMES.BEAN_THERE_CAFE,
  sections: [
    {
      name: "Coffee",
      items: [
        {
          name: "Brewed Coffee",
          price: 2.0,
          sizes: [
            { name: "12oz", price: 2.0 },
            { name: "16oz", price: 2.5 },
          ],
        },
        {
          name: "Espresso",
          price: 2.25,
          sizes: [
            { name: "Single", price: 2.25 },
            { name: "Double", price: 2.75 },
          ],
        },
        {
          name: "Latte",
          price: 3.75,
          sizes: [
            { name: "Single", price: 3.75 },
            { name: "Double", price: 4.75 },
          ],
        },
        {
          name: "Cappuccino",
          price: 3.75,
          sizes: [
            { name: "Single", price: 3.75 },
            { name: "Double", price: 4.5 },
          ],
        },
        {
          name: "Americano",
          price: 3.0,
          sizes: [
            { name: "Single", price: 3.0 },
            { name: "Double", price: 3.5 },
          ],
        },
        {
          name: "Mocha",
          price: 4.5,
          sizes: [
            { name: "Single", price: 4.5 },
            { name: "Double", price: 5.0 },
          ],
        },
        {
          name: "Hot Chocolate",
          price: 3.75,
          sizes: [
            { name: "Single", price: 3.75 },
            { name: "Double", price: 4.25 },
          ],
        },
      ],
      sides: [
        {
          name: "Soy or Oat Milk",
          price: 0.75,
        },
        {
          name: "Flavour Shot",
          price: 0.5,
        },
        {
          name: "Extra Espresso Shot",
          price: 0.75,
        },
        {
          name: "Coffee Card",
          price: 7.5,
          description: "Good for 5 coffees",
        },
      ],
    },
    {
      name: "Iced Drinks",
      items: [
        {
          name: "Iced Mocha",
          price: 5.0,
        },
        {
          name: "Iced Latte",
          price: 4.75,
        },
        {
          name: "Iced Americano",
          price: 3.5,
        },
      ],
    },
    {
      name: "Tea and Others",
      items: [
        {
          name: "Tea",
          price: 2.0,
        },
        {
          name: "Steamed Milk",
          price: 3.5,
          sizes: [{ name: "12oz", price: 3.5 }],
        },
        {
          name: "Chai Latte",
          price: 4.75,
          sizes: [{ name: "16oz", price: 4.75 }],
        },
        {
          name: "London Fog",
          price: 4.75,
          sizes: [{ name: "16oz", price: 4.75 }],
        },
        {
          name: "Matcha Latte",
          price: 4.75,
          sizes: [{ name: "16oz", price: 4.75 }],
        },
      ],
    },
  ],
};

const HealthFBMenu: Menu = {
  vendor_name: VENDOR_NAMES.HEALTH_FB,
  sections: [
    {
      name: "Deli Sandwich & Melts",
      items: [
        { name: "Smoked Chicken", price: 6.75 },
        { name: "Chicken & Gouda", price: 8.5 },
        { name: "Black Forest Ham", price: 6.75 },
        { name: "Ham & Provolone", price: 8.5 },
        { name: "Beef & Cheddar", price: 8.75 },
        { name: "Cranberry Chicken Salad", price: 7.5 },
        { name: "Roast Beef", price: 7.25 },
        { name: "Turkey", price: 7.5 },
        { name: "Turkey & Swiss", price: 8.75 },
        { name: "Tuna Salad", price: 7.5 },
        { name: "Hummus & Veg", price: 6.5 },
        { name: "Egg Salad", price: 6.75 },
        { name: "Cheese & Veg", price: 6.75 },
        {
          name: "Toasted Tuna Melt",
          price: 8.75,
          description:
            "Ciabatta bun or whole wheat bread topped with tuna salad and Cheddar cheese.",
        },
        {
          name: "HFB Cheese Steak",
          price: 8.75,
          description:
            "Ciabatta Bun with basil mayo topped with roast beef, roasted veg, onion, and Swiss cheese.",
        },
        {
          name: "Pita Melt",
          price: 8.5,
          description:
            "Black Forest ham, Provolone cheese, spinach, mayonnaise and Dijon mustard toasted in a Greek Pita.",
        },
        {
          name: "Chicken Salad Melt",
          price: 8.75,
          description:
            "Ciabatta bun topped with cranberry chicken salad and Gouda cheese.",
        },
        {
          name: "Loaded Bagel",
          price: 5.25,
          description: "Bagel with cream cheese, tomato and cucumber.",
        },
        {
          name: "Breakfast Bagel",
          price: 5.25,
          description: "Bagel with egg salad, Cheddar cheese and bacon or ham.",
        },
      ],
      sides: [
        { name: "Add Cheese", price: 2.25 },
        { name: "Extra Protein", price: 2.75 },
        {
          name: "Add Side Salad",
          price: 2.75,
          description: "Salad, Veggie Chili, Daal, or Falafel & Tzatziki",
        },
      ],
    },
    {
      name: "Favourites",
      items: [
        {
          name: "Mexi Chicken Wrap",
          price: 8.75,
          description:
            "Seasoned chicken with lettuce, tomato, black olives, jalapenos, cheese, salsa and sour cream wrapped in a whole wheat tortilla.",
        },
        {
          name: "Black Bean Wrap",
          price: 8.25,
          description:
            "Seasoned black beans and rice with lettuce, tomato, black olives, jalapenos, cheese, salsa and sour cream wrapped in a whole wheat tortilla.",
        },
        {
          name: "Chicken or Falafel Caesar Wrap",
          price: 8.25,
          description:
            "Seasoned chicken or falafel with caesar salad and parmesan cheese wrapped in a whole wheat tortilla.",
        },
        {
          name: "Spicy Chicken Peanut Wrap",
          price: 8.75,
          description:
            "Chicken tossed in a mild peanut sauce then wrapped in a whole wheat tortilla with garlic brown rice, lettuce, cucumber, and carrot.",
        },
        {
          name: "Santa Fe Chicken Wrap",
          price: 8.5,
          description:
            "Seasoned chicken wrapped in a whole wheat tortilla with lettuce, onion, tomato, peppers, and Ranch dressing.",
        },
        {
          name: "Teriyaki Chicken Wrap",
          price: 8.75,
          description:
            "Chicken tossed in teriyaki sauce then wrapped in a whole wheat tortilla with garlic brown rice, lettuce, cucumber, and carrot.",
        },
        {
          name: "BLT Sandwich",
          price: 8.5,
          description:
            "Bacon, lettuce, tomato and guacamole on a ciabatta bun.",
        },
        {
          name: "Chicken & Swiss Sandwich",
          price: 8.25,
          description:
            "Ciabatta bun with smoked chicken, Swiss cheese, roasted red pepper, spinach and basil mayo.",
        },
        {
          name: "Turkey & Bacon Sandwich",
          price: 8.75,
          description:
            "Sliced turkey and bacon with lettuce, tomato and pesto mayo on a ciabatta bun.",
        },
        {
          name: "HFB Falafel Pita",
          price: 8.25,
          description:
            "Greek style pita wrapped around our own house made Falafel, lettuce, cucumber, carrot, and tzatziki.",
        },
        {
          name: "Falafel Plate",
          price: 9.5,
          description:
            "Homemade falafel, Greek salad, hummus, tzatziki, tahini and pita.",
        },
      ],
      sides: [
        {
          name: "Add Side Salad",
          price: 2.75,
          description: "Salad, Veggie Chili, Daal, Falafel & Tzatziki",
        },
      ],
    },
    {
      name: "House Salads",
      items: [
        {
          name: "Chicken Taco",
          price: 8.75,
          description:
            "Mixed greens tossed in a sundried tomato vinaigrette and topped with chicken, cheese, salsa, sour cream, olives, tomato and tortilla chips.",
        },
        {
          name: "Chicken or Falafel Caesar",
          price: 8.5,
          description:
            "Our own Caesar salad with seasoned chicken or falafel, Parmesan cheese and croutons.",
        },
        {
          name: "Roasted Seasonal Veg",
          price: 8.25,
          description:
            "Mixed greens tossed with a Balsamic vinaigrette topped with roasted vegetables, fresh carrot, cucumber and pumpkin seeds.",
        },
        {
          name: "Greek",
          price: 8.25,
          description:
            "Mixed greens topped with a lemon vinaigrette, cucumber, tomato, onion, Feta cheese and black olives.",
        },
        {
          name: "Caesar Salad - Small",
          price: 4.75,
        },
        {
          name: "Tossed Mixed Greens Salad - Small",
          price: 4.75,
        },
      ],
    },
    {
      name: "Hot Specials",
      items: [
        {
          name: "Daal with Rice & Chutney",
          price: 7.5,
          description:
            "Red lentils and yellow split peas with garlic, ginger and Indian spices. Served on fragrant rice with mango tamarind chutney.",
        },
        {
          name: "Thai Peanut Chicken Rice Bowl",
          price: 8.5,
          description:
            "Chicken tossed in a Thai style peanut sauce served on garlic infused brown rice and garnished with a carrot and cucumber salad.",
        },
        {
          name: "Tofu Rice Bowl",
          price: 8.5,
          description:
            "Hoisin sauce marinated tofu served on garlic infused brown rice and garnished with pickled vegetables and edamame.",
        },
        {
          name: "Vegetarian Chili",
          price: 6.5,
          description:
            "Our own vegan chili served with corn tortilla chips, cheese and sour cream.",
        },
      ],
    },
    {
      name: "Fresh Fruit Juice",
      items: [
        {
          name: "Ginger Zinger",
          price: 6.5,
          description: "Orange, pineapple juice, ginger.",
        },
        {
          name: "Pain Remover",
          price: 6.5,
          description: "Lemon, orange, pear, apple.",
        },
        {
          name: "Immune Juice",
          price: 6.5,
          description: "Beet, carrot, apple, ginger.",
        },
        {
          name: "Liquid Lunch",
          price: 6.5,
          description: "Pear, apple, lemon, ginger.",
        },
        {
          name: "Orchard Blend",
          price: 6.5,
          description: "Orange, apple.",
        },
        {
          name: "Under the Weather",
          price: 6.5,
          description: "Carrot, apple, lemon, ginger.",
        },
        {
          name: "HFB Energy Tonic",
          price: 6.75,
          description:
            "Pineapple juice, apple, cucumber, lemon, ginger, GREENS+.",
        },
        {
          name: "Sub Juice",
          price: 6.75,
          description: "Carrot, apple, beet, tomato, GREENS+.",
        },
        {
          name: "Apple Juice",
          price: 4.75,
          sizes: [{ name: "12oz", price: 4.75 }],
        },
        {
          name: "Carrot Juice",
          price: 4.75,
          sizes: [{ name: "12oz", price: 4.75 }],
        },
        {
          name: "Orange Juice",
          price: 5.25,
          sizes: [{ name: "12oz", price: 5.25 }],
        },
      ],
    },
    {
      name: "Frozen Yogurt",
      items: [
        {
          name: "Strawberry",
          price: 4.75,
          sizes: [{ name: "8oz", price: 4.75 }],
        },
        {
          name: "Blueberry",
          price: 4.75,
          sizes: [{ name: "8oz", price: 4.75 }],
        },
        {
          name: "Raspberry",
          price: 4.75,
          sizes: [{ name: "8oz", price: 4.75 }],
        },
        {
          name: "Blackberry",
          price: 4.75,
          sizes: [{ name: "8oz", price: 4.75 }],
        },
      ],
    },
    {
      name: "Yogurt Smoothies",
      items: [
        {
          name: "Berry All The Way",
          price: 5.25,
          description: "Raspberry, strawberry, blackberry, blueberry.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Carrot Cake",
          price: 5.25,
          description:
            "Carrot, cinnamon, pineapple juice, coconut, orange juice.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Strawberry Pina Colada",
          price: 5.25,
          description: "Strawberry, pineapple juice, banana, coconut.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "High Five",
          price: 5.25,
          description: "Peach, mango, orange juice, pineapple juice, banana.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Mango Sub",
          price: 5.25,
          description: "Mango, strawberry, peach, banana.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Matcha Cranberry",
          price: 5.25,
          description: "Green tea powder, cranberry.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Monkey Madness",
          price: 5.25,
          description: "Peanut butter, banana, chocolate.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Passion Fruit",
          price: 5.25,
          description:
            "Passion fruit, strawberry, peach, banana, fresh orange juice.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Pink Panther",
          price: 5.25,
          description: "Beet, cranberry, raspberry, banana.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Strawberry Twist",
          price: 5.25,
          description: "Strawberry nectar, strawberry, banana.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
        {
          name: "Zig Zag",
          price: 5.25,
          description: "Raspberry, strawberry, banana.",
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 6.5 },
          ],
        },
      ],
      description:
        "Your choice: Greek yogurt, sweetened yogurt, soy, almond or oat milk.",
    },
    {
      name: "Puree Smoothies",
      items: [
        {
          name: "Mango Tropics",
          price: 4.25,
          description: "Mango, pineapple, banana.",
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 5.25 },
          ],
        },
        {
          name: "Pineapple Paradise",
          price: 4.25,
          description: "Pineapple, banana, coconut.",
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 5.25 },
          ],
        },
        {
          name: "Tropical Sunshine",
          price: 4.25,
          description: "Pineapple, banana, guava, passion fruit.",
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 5.25 },
          ],
        },
        {
          name: "Strawberry",
          price: 4.25,
          description: "Strawberry puree.",
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 5.25 },
          ],
        },
        {
          name: "Peach Pear Apricot",
          price: 4.25,
          description: "Peach, pear, apricot.",
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 5.25 },
          ],
        },
      ],
    },
  ],
};

const MunchieBarMenu: Menu = {
  vendor_name: VENDOR_NAMES.MUNCHIE,
  sections: [
    {
      name: "Espresso",
      items: [
        {
          name: "Espresso",
          price: 2.35,
        },
        {
          name: "Americano",
          price: 2.35,
          sizes: [
            { name: "Single", price: 2.35 },
            { name: "Double", price: 4.1 },
          ],
        },
        {
          name: "Latte",
          price: 4.35,
          sizes: [
            { name: "Single", price: 4.35 },
            { name: "Double", price: 4.85 },
          ],
        },
        {
          name: "Cappuccino",
          price: 4.35,
          sizes: [
            { name: "Single", price: 4.35 },
            { name: "Double", price: 4.85 },
          ],
        },
        {
          name: "Mocha",
          price: 4.85,
          sizes: [
            { name: "Single", price: 4.85 },
            { name: "Double", price: 5.35 },
          ],
        },
        {
          name: "Hot Chocolate",
          price: 3.85,
          sizes: [
            { name: "Single", price: 3.85 },
            { name: "Double", price: 4.35 },
          ],
        },
        {
          name: "London Fog",
          price: 4.35,
          sizes: [
            { name: "Single", price: 4.35 },
            { name: "Double", price: 4.85 },
          ],
        },
      ],
      sides: [
        {
          name: "Extra Espresso Shot",
          price: 1.0,
        },
        {
          name: "Shot of Cream",
          price: 0.5,
        },
        {
          name: "Almond, Soy, Coconut, Oat Milk",
          price: 0.9,
          description: "Non-dairy milk alternatives",
        },
      ],
    },
    {
      name: "Munchie",
      items: [
        {
          name: "Damn Fine Popcorn",
          price: 5.99,
          sizes: [
            { name: "Small", price: 5.0 },
            { name: "Medium", price: 5.25 },
            { name: "Large", price: 5.5 },
          ],
        },
        {
          name: "Movie Combo",
          price: 9.0,
          description: "Includes m. popcorn, m. pop, and a candy bar.",
        },
        {
          name: "Soda Pop",
          price: 2.5,
          sizes: [
            { name: "Small", price: 2.5 },
            { name: "Medium", price: 2.75 },
            { name: "Large", price: 3.0 },
          ],
        },
        {
          name: "Coffee",
          price: 2.35,
          sizes: [
            { name: "12oz", price: 2.35 },
            { name: "16oz", price: 2.7 },
          ],
        },
        {
          name: "Tea",
          price: 2.25,
        },
        {
          name: "Juice",
          price: 3.0,
          sizes: [
            { name: "12oz", price: 3.0 },
            { name: "16oz", price: 3.25 },
          ],
        },
      ],
    },
    {
      name: "Cookies",
      items: [
        {
          name: "Berry Ginger Cookie",
          price: 4.25,
          description:
            "Sugar and Egg Free. Spelt flour, spelt bran oats, blueberries, apple juice, canola oil, maple syrup, baking power, baking soda, salt and ginger.",
        },
        {
          name: "Zucchini Chocolate Chip Cookie",
          price: 4.25,
          description:
            "Spelt flour, spelt bran, apple juice, canola oil, zucchini, chocolate evaporated cane sugar, eggs, vanilla, cinnamon salt and baking powder.",
        },
        {
          name: "Chocolate Chip Cookie",
          price: 2.75,
        },
        {
          name: "Oatmeal Raisin Cookie",
          price: 2.75,
        },
        {
          name: "Peanut Butter Cookie",
          price: 2.75,
        },
        {
          name: "Peach Cranberry Cornmeal Cookie",
          price: 3.25,
        },
        {
          name: "Lemon Raspberry Cookie",
          price: 3.25,
        },
        {
          name: "Chocolate Banana Pecan Cookie",
          price: 3.25,
        },
        {
          name: "Wild Blueberry Cookie",
          price: 3.25,
        },
        {
          name: "Pumpkin Spelt Cookie",
          price: 3.25,
        },
      ],
    },
    {
      name: "Baked Goods",
      items: [
        {
          name: "Energy Balls",
          description: "Peanut Butter",
          price: 2.6,
        },
        {
          name: "Quinoa Cupcake",
          price: 3.5,
        },
        {
          name: "Scone Lemon Ginger",
          price: 3.0,
        },
        {
          name: "Spinach Feta",
          price: 3.5,
        },
        {
          name: "Cheese Croissant",
          price: 3.5,
        },
        {
          name: "Plain Crouissant",
          price: 3.25,
        },
        {
          name: "Raspberry Cream Cheese Croissant",
          price: 3.5,
        },
        {
          name: "Chocolate Almond Croissant",
          price: 3.5,
        },
        {
          name: "Pain Au Chocolat",
          price: 3.5,
        },
        {
          name: "Chicken Sandwich",
          price: 8.0,
        },
        {
          name: "Almond Mayo and Avacado",
          price: 8.0,
          tags: [MenuItemTag.Vegan],
        },
        {
          name: "Ham Sandwich",
          price: 8.0,
        },
        {
          name: "capicola Sandwich",
          price: 8.0,
        },
      ],
    },
  ],
};

// Bookstore Building
const starbucksMenu: Menu = noMenu;

const uniclubMenuExample: Menu = {
  vendor_name: VENDOR_NAMES.UNICLUB,
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

// MacLauren Building
const MacMenu: Menu = noMenu;

// Mystic Market Building
const ChopBoxMenu: Menu = {
  vendor_name: VENDOR_NAMES.CHOPBOX,
  sections: [
    {
      name: "Signature Chop Boxes",
      items: [
        {
          name: "Tamarind Pad Thai",
          price: 8.0,
          description: "Authentic Pad Thai with Shanghai noodles",
          tags: [],
        },
        {
          name: "Mongolian Black Bean",
          price: 8.0,
          description:
            "Sweet & salty with ginger & sesame with Shanghai noodles",
          tags: [],
        },
        {
          name: "Green Thai Curry",
          price: 8.0,
          description:
            "Coconut curry flavoured with lime leaves & chili with egg noodles",
          tags: [MenuItemTag.VeganOption],
        },
        {
          name: "Red Thai Curry",
          price: 8.0,
          description: "Mildly spiced Thai coconut curry with egg noodles",
          tags: [MenuItemTag.VeganOption],
        },
        {
          name: "Panang Curry",
          price: 8.0,
          description:
            "Medium spiced with a hint of sweet & salty with egg noodles",
          tags: [MenuItemTag.VeganOption],
        },
      ],
      description:
        "Substitute any box with steamed rice (Vegan), rice noodles (Vegan), Shanghai noodles or egg noodles",
      sides: [
        {
          name: "Add Protein",
          price: 3.5,
          description:
            "Choose from tofu (Vegan), chicken breast, shrimp or beef",
        },
        { name: "Extra Sauce", price: 1.0 },
      ],
    },
    {
      name: "Ramen",
      items: [
        {
          name: "Ramen",
          price: 6.5,
          description: "Fresh noodles & vegetables in mushroom stock.",
        },
      ],
      sides: [
        {
          name: "Tofu",
          price: 3.5,
        },
        {
          name: "Soft boiled egg",
          price: 2.0,
        },
        {
          name: "Chicken",
          price: 3.5,
        },
      ],
    },
    {
      name: "Add to Any Meal",
      items: [
        {
          name: "Fountain Drink 22oz",
          price: 1.75,
        },
        {
          name: "Coffee/Tea 12oz",
          price: 1.75,
        },
        {
          name: "Coffee 16oz",
          price: 1.95,
        },
        {
          name: "Fountain Drink 22oz (alt)",
          price: 2.59,
        },
      ],
    },
  ],
};

const FrescoMenu: Menu = {
  vendor_name: VENDOR_NAMES.FRESCO,
  sections: [
    {
      name: "Fresco Taco Bar",
      items: [
        {
          name: "Soft Tacos",
          description:
            "BEAN/ BEEF/ CHICKEN on corn tortilla + salsa fresco; ROCKFISH served on flour tortilla + aioli, slaw, mango salsa. 3 for $10.99",
          price: 3.79,
          sizes: [
            { name: "Each", price: 3.79 },
            { name: "3 for", price: 10.99 },
          ],
        },
        {
          name: "Burritos",
          description:
            "BEAN/ BEEF/ CHICKEN flour tortilla + beans + brown rice, each with lettuce, sour cream & salsa",
          price: 10.99,
        },
        {
          name: "Taco Salad",
          description:
            "Mixed beans, tortilla chips, and iceberg lettuce with salsa fresco, sour cream & cheese",
          price: 10.99,
        },
        {
          name: "Cheese Quesadilla",
          description:
            "BEAN/ BEEF/ CHICKEN with cheese grilled in a flour tortilla, served with sour cream & salsa",
          price: 10.99,
        },
        {
          name: "Extreme Fresco Fries",
          description: "Served with shredded cheese, sour cream & salsa fresco",
          price: 8.99,
        },
        {
          name: "Value Bean Burrito",
          description: "Chickpeas & mixed beans wrapped in flour tortilla",
          price: 5.0,
        },
        {
          name: "Crisp Beef Burrito",
          description: "served with taco sauce",
          price: 6.0,
        },
      ],
    },
    {
      name: "Add-Ons",
      items: [
        {
          name: "Chicken/Beef",
          price: 4.99,
          tags: [],
        },
        {
          name: "Guacamole",
          price: 3.49,
        },
        {
          name: "Sour Cream",
          price: 1.49,
        },
        {
          name: "Salsa Fresco",
          price: 1.49,
        },
        {
          name: "Cheese",
          price: 2.0,
        },
        {
          name: "Vegan Cheese",
          price: 2.99,
        },
      ],
    },
    {
      name: "Sides",
      items: [
        {
          name: "Mexican Rice",
          price: 3.79,
        },
        {
          name: "Refried Beans",
          price: 3.79,
        },
        {
          name: "Fresco Fries",
          price: 5.49,
        },
        {
          name: "Chips & Salsa",
          price: 6.99,
        },
      ],
    },
    {
      name: "Make It a Combo",
      description: "Add fries + 24oz fountain drink/12oz coffee",
      items: [
        {
          name: "Combo",
          price: 4.99,
        },
      ],
    },
  ],
};

const TreksMenu: Menu = {
  vendor_name: VENDOR_NAMES.TREKS,
  sections: [
    {
      name: "Sandwich",
      items: [
        {
          name: "Build Your Own Sandwich",
          price: 9.99,
          description:
            "Choose your base, spread, cheese, protein, and add-ons to build your perfect sandwich.",
          sides: [
            {
              name: "Base",
              price: 0,
              description:
                "Wrap: Whole Wheat, Plain, Tomato, Spinach, Herb & Garlic. Bread: Whole Wheat, Multigrain, Sourdough, Marble Rye",
            },
            {
              name: "Spreads",
              price: 0,
              description:
                "Vegan Cheddar, Regular Cheddar, Smoked Cheddar, Havarti, Swiss",
            },
            {
              name: "Cheese",
              price: 0,
              description:
                "Regular Mustard, Dijon, Mayo, Chipotle Mayo, Horseradish Mayo, Roast Garlic & Chive Mayo, Sweet Onion Dressing",
            },
            {
              name: "Protein",
              price: 0,
              description:
                "Spicy Black Beans, Hummus, Pesto Chickpeas, Pesto Chicken Salad, Smoked Pepper Salmon Salad, Egg Salad, Tuna Salad, Cajun Chicken, Black Forest Ham, Buffalo Chicken, Roast Beef",
            },
            { name: "Gluten Friendly Wrap", price: 2.0 },
            { name: "Avocado", price: 3.0 },
            { name: "Bacon", price: 1.5 },
          ],
        },
      ],
      tags: [
        MenuItemTag.VeganOption,
        MenuItemTag.DairyFreeOption,
        MenuItemTag.GlutenFreeOption,
      ],
    },
    {
      name: "Other",
      items: [
        {
          name: "Grilled Cheese",
          price: 5.0,
          tags: [MenuItemTag.VeganOption, MenuItemTag.DairyFreeOption],
        },
        {
          name: "Soup",
          price: 4.99,
          description: "Ask your server for today's selection.",
          tags: [],
        },
        {
          name: "Add Soup",
          price: 4.79,
          tags: [],
        },
        {
          name: "Add Fountain Drink 24oz",
          price: 2.29,
          tags: [],
        },
        {
          name: "Add Coffee/Tea 12oz",
          price: 2.29,
          tags: [],
        },
      ],
    },
  ],
};

const FlaminChickenMenu: Menu = {
  vendor_name: VENDOR_NAMES.FLAMINCHICKEN,
  sections: [
    {
      name: "Main",
      sides: [
        {
          name: "Add Cheese (cheddar/blue)",
          price: 1.5,
        },
        {
          name: "Add Gravy",
          price: 3.95,
        },
        {
          name: "Add Chipotle Dip",
          price: 2.0,
        },
        {
          name: "Waffle Fries",
          price: 4.0,
        },
        {
          name: "Pickle Slaw",
          price: 3.0,
        },
        {
          name: "Sub GF Bun",
          price: 2.0,
        },
        {
          name: "Add Fountain Drink",
          price: 2.29,
        },
        {
          name: "Add Coffee",
          price: 2.29,
        },
      ],
      items: [
        {
          name: "Hot Chicken Sandwich",
          price: 9.49,
          description:
            "Chicken: Crispy or Grilled or Plant-Based\nSeasoning: Original or Nashville or Frank's or Kansas City BBQ",
        },
        {
          name: "Chicken Corn Dog",
          price: 7.0,
          description: "Served with Sriracha Honey Mustard Sauce",
          tags: [],
        },
        {
          name: "Chicken Strips",
          price: 9.95,
          description:
            "Chicken: Crispy or Plant-Based\nSeasoning: Original or Nashville or Frank's or Kansas City BBQ",
        },
        {
          name: "Waffle Fry Poutine",
          price: 9.95,
        },
        {
          name: "Mini Chicken Wrap",
          price: 5.0,
          description: "*Limited Time Offer",
        },
      ],
    },
  ],
};

const GeneralStoreMenu: Menu = noMenu;

const BoardwalkCafeMenu: Menu = {
  vendor_name: VENDOR_NAMES.BROADWALK_CAFE,
  sections: [
    {
      name: "Espresso",
      items: [
        {
          name: "Americano",
          price: 3.65,
          sizes: [
            { name: "12oz", price: 3.65 },
            { name: "16oz", price: 4.25 },
            { name: "20oz", price: 4.65 },
          ],
        },
        {
          name: "Latte",
          price: 4.45,
          sizes: [
            { name: "12oz", price: 4.45 },
            { name: "16oz", price: 4.95 },
            { name: "20oz", price: 5.45 },
          ],
        },
        {
          name: "Cappuccino",
          price: 4.45,
          sizes: [
            { name: "12oz", price: 4.45 },
            { name: "16oz", price: 4.85 },
            { name: "20oz", price: 5.45 },
          ],
        },
        {
          name: "Mocha",
          price: 4.85,
          sizes: [
            { name: "12oz", price: 4.85 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.85 },
          ],
        },
        {
          name: "Vanilla Latte",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 },
          ],
        },
        {
          name: "Caramel Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "White Chocolate Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Espresso",
          price: 2.95, // Price for a single shot
          sizes: [
            { name: "Single", price: 2.95 },
            { name: "Double", price: 3.25 },
          ],
        },
      ],
      sides: [
        {
          name: "Substitute Non-Dairy Milk",
          price: 0.8,
          description: "Choices: Soy, Oat",
        },
        {
          name: "Extra Espresso Shot",
          price: 1.0,
        },
        {
          name: "Add Flavour Syrup",
          price: 0.7,
        },
        {
          name: "Add Non-Daity Milk",
          price: 0.8,
        },
      ],
    },
    {
      name: "Favourites",
      items: [
        {
          name: "Steamed Milk (+ Flavour)",
          price: 3.25,
          sizes: [
            { name: "12oz", price: 3.25 },
            { name: "16oz", price: 3.36 },
            { name: "20oz", price: 3.75 },
          ],
        },
        {
          name: "Hot Chocolate",
          price: 4.25,
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 4.45 },
            { name: "20oz", price: 4.65 },
          ],
        },
        {
          name: "London Fog",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Chai Latte",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Matcha Latte",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 },
          ],
        },
      ],
      sides: [
        {
          name: "Substitute Non-Dairy Milk",
          price: 0.8,
          description: "Choices: Soy, Oat",
        },
        {
          name: "Extra Espresso Shot",
          price: 1.0,
        },
        {
          name: "Add Flavour Syrup",
          price: 0.7,
        },
        {
          name: "Add Non-Daity Milk",
          price: 0.8,
        },
      ],
    },
    {
      name: "Coffee + Tea",
      items: [
        {
          name: "Brewed Coffee",
          description: "25c off when you bring your own mug.",
          price: 2.65,
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 },
          ],
        },
        {
          name: "Tea",
          price: 2.65,
          description: "25c off when you bring your own mug.",
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 },
          ],
        },
      ],
    },
    {
      name: "Iced Drinks",
      items: [
        {
          name: "Iced Coffee",
          price: 4.95,
          description:
            "16oz iced coffee with two shots of espresso and milk poured over ice.",
        },
      ],
    },
    {
      name: "Fresh Baked",
      items: [
        {
          name: "Cookies",
          price: 2.5,
          description: "2.50 / 3.75 price varies by size",
        },
        {
          name: "Muffins",
          price: 3.75,
        },
        {
          name: "Loaves",
          price: 3.95,
        },
        {
          name: "Bars",
          price: 4.49,
        },
        {
          name: "Carrot Cake",
          price: 6.49,
        },
      ],
      sides: [
        {
          name: "Gluten-Friendly Options",
          price: 0,
          description:
            "Price Varies Please ask. Muffins, Cookies, Squares, Bars - While we strive to ensure our gluten friendly ('GF') foods are safe for your consumption, please note that we are not a gluten-free facility.",
        },
      ],
    },
  ],
};

const BoosterMenu: Menu = noMenu;

const PickleSpiceMenu: Menu = {
  vendor_name: VENDOR_NAMES.PICKLE_SPICE,
  sections: [
    {
      name: "Combos",
      items: [
        {
          name: "Combo 1",
          price: 12.0,
          description:
            "One main served with basmati rice & spiced mixed vegetables",
          tags: [],
        },
        {
          name: "Combo 2",
          price: 15.0,
          description:
            "Two mains served with basmati rice & spiced mixed vegetables",
        },
        {
          name: "Rice & Dahl",
          price: 7.0,
          description: "Red lentil dahl served with basmati rice",
          tags: [MenuItemTag.Vegan],
        },
      ],
    },
    {
      name: "Mains",
      description:
        "All mains are served with basmati rice & spiced mixed vegetables",
      items: [
        {
          name: "Butter Chicken",
          price: 12.0,
          tags: [MenuItemTag.Spicy],
        },
        {
          name: "Chicken Vindaloo",
          price: 12.0,
          tags: [MenuItemTag.Spicy],
        },
        {
          name: "Chana Masala",
          price: 12.0,
          tags: [MenuItemTag.Spicy, MenuItemTag.Vegan],
        },
        {
          name: "Goan Fish Curry",
          price: 12.0,
          tags: [MenuItemTag.Spicy],
        },
        {
          name: "Paneer Tikka",
          price: 12.0,
          tags: [MenuItemTag.Spicy],
        },
        {
          name: "Red Lentil Dahl",
          price: 12.0,
          tags: [MenuItemTag.Vegan],
        },
      ],
    },
    {
      name: "Poutine",
      items: [
        {
          name: "Poutine with Butter Chicken",
          price: 9.95,
          tags: [MenuItemTag.Spicy],
        },
        {
          name: "Poutine with Chicken Vindaloo",
          price: 9.95,
          tags: [MenuItemTag.Spicy],
        },
      ],
    },
    {
      name: "Sides",
      items: [
        {
          name: "Pakoras",
          price: 9.95,
          description: "with mango chutney",
        },
        {
          name: "Mini Samosas",
          price: 7.0,
          description: "with mango chutney",
        },
        {
          name: "Garlic Naan",
          price: 8.0,
        },
        {
          name: "Raita",
          price: 2.5,
        },
        {
          name: "Chutney",
          price: 1.5,
          description: "cilantro mint or mango",
        },
      ],
      sides: [
        {
          name: "Add Fountain Drink/Coffee",
          price: 2.29,
        },
      ],
    },
  ],
};

const TofinosMenu: Menu = {
  vendor_name: VENDOR_NAMES.TOFINOS,
  sections: [
    {
      name: "Pasta",
      items: [
        {
          name: "Daily Pasta",
          price: 9.99,
          description: "Includes breadstick",
        },
      ],
    },
    {
      name: "Pizza",
      description: "Local fresh options rotate daily",
      items: [
        {
          name: "1x Slice",
          price: 5.0,
        },
        {
          name: "2x Slices",
          price: 9.0,
        },
      ],
      sides: [
        {
          name: "Add Bread Stick",
          price: 1.99,
        },
        {
          name: "Add Fountain Drink 24oz",
          price: 2.29,
        },
        {
          name: "Add Coffee/Tea 12oz",
          price: 2.29,
        },
      ],
    },
  ],
};

// GradHouse Building
const GradHouseMenu: Menu = {
  vendor_name: VENDOR_NAMES.GRADHOUSE,
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
          description:
            "We took a yam and then we cut it into fry shapes. Served with chipotle mayo.",
        },
        {
          name: "Fries",
          price: 5,
          description:
            "If you need clarification on this one, you're on your own.",
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
          description:
            "A lentil and rice stew – all your vitamins in one bowl.",
        },
      ],
    },
    {
      name: "Burgers, Wraps & Salads",
      items: [
        {
          name: "Beef Burger",
          price: 14.5,
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
          price: 13.5,
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
          price: 9.5,
          description:
            "Spinach, arugula, cucumber, grape tomatoes, and mushrooms tossed in balsamic vinaigrette and topped with feta and walnuts. Ask to make vegetarian or vegan.",
        },
      ],
    },
  ],
};

// Library Building
const biblioCafe: Menu = {
  vendor_name: VENDOR_NAMES.BIBLIO,
  sections: [
    {
      name: "Hot Beverages",
      description:
        "All Flavouring Syrups are $0.70, Soy Subtitute / Soy Sub for Coffee $0.80",
      items: [
        {
          name: "Drip Coffee",
          price: 2.65,
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 },
          ],
        },
        {
          name: "Tea",
          price: 2.65,
          sizes: [
            { name: "12oz", price: 2.65 },
            { name: "16oz", price: 2.95 },
            { name: "20oz", price: 3.25 },
          ],
        },
        {
          name: "Americano",
          price: 3.65,
          sizes: [
            { name: "12oz", price: 3.65 },
            { name: "16oz", price: 4.25 },
            { name: "20oz", price: 4.65 },
          ],
        },
        {
          name: "Cappuccino",
          price: 4.25,
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 4.85 },
            { name: "20oz", price: 5.45 },
          ],
        },
        {
          name: "Latte",
          price: 4.45,
          sizes: [
            { name: "12oz", price: 4.45 },
            { name: "16oz", price: 4.95 },
            { name: "20oz", price: 5.45 },
          ],
        },
        {
          name: "Latte Vanilla",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 },
          ],
        },
        {
          name: "Caramel Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "White Chocolate Macchiato",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Espresso",
          price: 2.95,
          sizes: [
            { name: "Single", price: 2.95 },
            { name: "Double", price: 3.25 },
          ],
        },
        {
          name: "Mocha",
          price: 4.85,
          sizes: [
            { name: "12oz", price: 4.85 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.85 },
          ],
        },
        {
          name: "Hot Chocolate",
          price: 4.25,
          sizes: [
            { name: "12oz", price: 4.25 },
            { name: "16oz", price: 4.45 },
            { name: "20oz", price: 4.65 },
          ],
        },
        {
          name: "Steamed Milk",
          price: 3.25,
          sizes: [
            { name: "12oz", price: 3.25 },
            { name: "16oz", price: 3.35 },
            { name: "20oz", price: 3.75 },
          ],
        },
        {
          name: "London Fog",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Chai Latte",
          price: 4.95,
          sizes: [
            { name: "12oz", price: 4.95 },
            { name: "16oz", price: 5.45 },
            { name: "20oz", price: 5.75 },
          ],
        },
        {
          name: "Matcha Latte",
          price: 5.25,
          sizes: [
            { name: "12oz", price: 5.25 },
            { name: "16oz", price: 5.75 },
            { name: "20oz", price: 6.25 },
          ],
        },
      ],
    },
    {
      name: "Cold Drinks",
      items: [
        {
          name: "Iced Coffee",
          price: 4.95,
          sizes: [{ name: "16oz", price: 4.95 }],
        },
        {
          name: "Coffee Frappe",
          price: 5.95,
          sizes: [{ name: "16oz", price: 5.95 }],
        },
        {
          name: "Mocha Frappe",
          price: 5.95,
          sizes: [{ name: "16oz", price: 5.95 }],
        },
        {
          name: "Caramel Coffee Frappe",
          price: 5.95,
          sizes: [{ name: "16oz", price: 5.95 }],
        },
        {
          name: "Green Tea Matcha Frappe",
          price: 5.95,
          sizes: [{ name: "16oz", price: 5.95 }],
        },
        {
          name: "Fruit Smoothie",
          price: 5.95,
          sizes: [{ name: "16oz", price: 5.95 }],
        },
      ],
    },
    {
      name: "Grab + Go",
      items: [
        {
          name: "Wedge Sandwich",
          price: 5.0,
        },
        {
          name: "Deluxe Sandwich",
          price: 9.49,
        },
        {
          name: "Premium Sandwich",
          price: 9.99,
        },
        {
          name: "Green Salad",
          price: 8.29,
        },
        {
          name: "Specialty Salad",
          price: 9.99,
        },
        {
          name: "Rolls (Beef & Veggie)",
          price: 3.49,
        },
        {
          name: "Samosas (Chicken & Veggie)",
          price: 5.0,
        },
        {
          name: "Veggies + Hummus",
          price: 6.29,
        },
        {
          name: "Veggies + Dip",
          price: 6.29,
        },
        {
          name: "Fruit + Cheese",
          price: 6.29,
        },
        {
          name: "Parfait",
          price: 6.49,
        },
      ],
    },
  ],
};

const menuExample = [
  greensMenuExample,
  EntreeMenu,
  ShawarmaMenu,
  StirFryMenu,
  DeliCoveMenu,
  SoupSaladCoveMenu,
  PizzaCoveMenu,
  GrillCoveMenu,

  starbucksMenu,
  uniclubMenuExample,
  GradHouseMenu,
  MacMenu,

  felicitasMenu,
  theGrillMenu,
  BeanThereMenu,
  HealthFBMenu,
  MunchieBarMenu,

  FrescoMenu,
  ChopBoxMenu,
  TreksMenu,
  FlaminChickenMenu,
  GeneralStoreMenu,
  BoardwalkCafeMenu,
  BoosterMenu,
  PickleSpiceMenu,
  TofinosMenu,

  biblioCafe,
];

const STATIC_GetMenuForVendor = (vendorName: string): Menu => {
  const menu = menuExample.find((menu) => menu.vendor_name === vendorName);

  if (menu) {
    return menu;
  }

  //console.warn(`NO MENU FOR: ${vendorName}`);
  return noMenu;
};

export { Menu, MenuItem, MenuItemTag, STATIC_GetMenuForVendor };
