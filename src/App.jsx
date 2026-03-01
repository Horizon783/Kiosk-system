import MenuGrid from "./components/MenuGrid.jsx";
import './App.css';
import CategoryList from "./components/CategoryList.jsx";
import { useState } from "react";
import Cart from "./components/Cart.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  /* 
  cartItems is an array of objects with the following structure:
   {

     itemId, quantity
   }
  */

  function handleAddToCart(itemId, option="+"){
    setCartItems(prevItems => {
      // console.log(`Adding item with id ${itemId} to cart called state-setter`);
      // console.log(prevItems);
      const existingItem = prevItems.find(item => item.itemId === itemId);
      // console.log(`existingItem:`, existingItem);
      // if item already exists in cart, increase quantity
      if(existingItem){
        // can remove {} from map and it will implicily return the object
        if(option === "-"){
          // if quantity is 1 and we want to decrease it, we remove the item from cart
          let quantity = existingItem.quantity;
          if(quantity === 1){
            return prevItems.filter(item => item.itemId !== itemId);
          }
          // else we decrease the quantity by 1
          return prevItems.map(item => item.itemId === itemId ? {...item, quantity: quantity -1}: item);
        }

        return prevItems.map(item => 
          item.itemId === itemId ? {...item, quantity: item.quantity + 1}: item
        )

        
      }
      // if item does not exist in cart, add it with quantity 1
      return [...prevItems, {itemId, quantity: 1}];
    })
  } 

  return (
    <div className="dashboard">
      <aside className="sidebar left" >
        <h3>Categories</h3>
        <CategoryList onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
      </aside>

      <main>
        <MenuGrid selectedCategory={selectedCategory} onAddToCart = {handleAddToCart}/>
      </main>

      <aside className="sidebar right" >
        <h3>Cart Items</h3>
        <Cart cartItems={cartItems} setQuantity={handleAddToCart}/>
      </aside>
      
    </div>
  );
}

export default App;