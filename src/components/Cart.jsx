// import menu from '../data/menu.json';
import newMenu from '../data/new_menu.js';


function Cart({cartItems, setQuantity}){
    // console.log(`printing cartItems before display:`, cartItems);
    /* cartItems is a state variable in App.jsx which is an array of objects with following structure:
    {
    itemId, quantity
    }
    this state variablr is used to keep track of menu items ordered by the user or customer.
    */

    // if the cart is empty we returna a message saying "No items in the cart"
    if(cartItems.length === 0){
        return <p>No Items in the cart</p>
    }

    /*
    we calculate the total price from cartItemsby using reduce method. Here we are iterating through menu.json for each item in the 
    cartItems to find the corresponding item and its price.
    */

    const total = cartItems.reduce((sum, CartItem)=>{
        let id = CartItem.itemId;
        return sum + newMenu[id].price * CartItem.quantity;
    },0);
    
    return (
            // when we have items in the cart, we render them using a map as it returns a new reference and react re-render by comparing the original
            // and new reference.
            // here we use the itemId from cartItems to use it as a primary key to derive item name and price from the menu.json for both 
            // display and total calculation.
        <ul>
            {
                cartItems.map(item => {
                    // const menuItem = menu.item.itemId;
                    let id = item.itemId;
                    return <li key={item.itemId}>
                        {newMenu[id].name} x {item.quantity}
                        <button onClick={()=> setQuantity(id)}>Plus</button>
                        <button onClick={()=> setQuantity(id,"-")}>Minus</button>
                    </li>
                    
                })
            }
            <hr />
            <h3>{`Total: Rs ${total}`}</h3>
        </ul>
    );
}

export default Cart;