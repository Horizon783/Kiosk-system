 import menu from '../data/menu.json';

 const newMenu = Object.fromEntries(menu.map(item => [item.id, item]));
 console.log(`newMenu:`, newMenu);

 export default newMenu;