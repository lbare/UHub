
import {menuExample, Menu, MenuItem} from '../models/Menu';

class MenuSearch {

    private getAllMenuItems = (() => {
        let allMenu = [menuExample.entree, menuExample.felicitas, menuExample.greens, menuExample.starbucks, menuExample.theGrill, menuExample.uniclub];
        let allMenuItem : MenuItem[] = [];

        allMenu.forEach((menu: Menu) => {
            menu.sections.forEach((section: any) => {
                section.items.forEach((item: any) => {
                    allMenuItem.push(item);
                });
            });
        });

        return allMenuItem;
    });

    public searchAllMenuItems = (search : string): MenuItem[] => {
        let filteredMenu = this.getAllMenuItems().filter((menuItem: MenuItem) => {
            //straight forward search for now to be improved with a library
            return menuItem.name.toLowerCase().includes(search.toLowerCase());
        });

        return filteredMenu;
    }
}