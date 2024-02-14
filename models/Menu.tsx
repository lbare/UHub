enum MenuItemTag {
    Vegan = "Vegan",
    Spicy = "Spicy",
    GlutenFree = "Gluten-Free",
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
    image?: string;
    description?: string;
    sizes?: MenuItemSize[];
    sides?: MenuItemSide[];
};

type MenuSection = {
    name: string;
    items: MenuItem[];
};

type Menu = {
    sections: MenuSection[];
};

const menuExample: Menu = {
    sections: [
        {
            name: "Appetizers",
            items: [
                {
                    name: "Chicken Wings",
                    price: 8.98,
                    description: "Spicy buffalo wings served with ranch dressing.",
                    sizes: [
                        { name: "Small", price: 8.99 },
                        { name: "Large", price: 12.99 },
                    ],
                    sides: [
                        { name: "Fries", price: 2.99 },
                        { name: "Onion Rings", price: 3.99 },
                    ],
                },
                {
                    name: "Caesar Salad",
                    price: 6.99,
                    description: "Fresh romaine lettuce with Caesar dressing.",
                    sizes: [{ name: "Regular", price: 6.99 }],
                },
            ],
        },
        {
            name: "Main Course",
            items: [
                {
                    name: "Cheeseburger",
                    price: 10.99,
                    description: "Classic cheeseburger with lettuce, tomato, and pickles.",
                    sizes: [
                        { name: "Single", price: 10.99 },
                        { name: "Double", price: 13.99 },
                    ],
                    sides: [
                        { name: "Fries", price: 2.99 },
                        { name: "Side Salad", price: 3.99 },
                    ],
                },
                {
                    name: "Margherita Pizza",
                    price: 12.99,
                    description: "Traditional Italian pizza with tomato, mozzarella, and basil.",
                    sizes: [{ name: "Regular", price: 12.99 }],
                },
            ],
        },
    ],
};

export { Menu, MenuItem, menuExample };
