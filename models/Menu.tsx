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
    sections: MenuSection[];
};

//Menu Example from Greens in Cove from Feburary 13th 2024
const menuExample: Menu = {
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

export { Menu, MenuItem, menuExample };
