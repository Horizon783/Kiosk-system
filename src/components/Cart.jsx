import menu from '../data/menu.json';

function Cart({cartItems}){
    // console.log(`printing cartItems before display:`, cartItems);
    if(cartItems.length === 0){
        return <p>No Items in the cart</p>
    }
    return (
        <ul>
            {
                cartItems.map(item => {
                    const menuItem = menu.find(menuItem => menuItem.id === item.itemId);
                    return <li key={item.itemId}>
                        {menuItem.name} x {item.quantity}
                    </li>
                    
                })
            }
        </ul>
    );
}

export default Cart;