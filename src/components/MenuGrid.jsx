import menu from '../data/menu.json';

function MenuGrid({selectedCategory , onAddToCart}){
    const filteredMenu = selectedCategory ?
        menu.filter(item => item.categoryId === selectedCategory):
        menu;

    return (
        <div>
            <h2>Menu</h2>
            {filteredMenu.map(item => (
                <div key={item.id}>
                    <strong>{item.name}</strong> ₹{item.price}  
                    {/* <span>{item.categoryId}</span> */}
                    <button onClick={()=>  onAddToCart(item.id)}>
                        Add
                    </button>
                </div>
                
            ))}
        </div>
    );

}

export default MenuGrid;