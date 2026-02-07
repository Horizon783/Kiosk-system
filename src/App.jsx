import MenuGrid from "./components/MenuGrid.jsx";
import './App.css';
import CategoryList from "./components/CategoryList.jsx";
import { useState } from "react";
import Cart from "./components/Cart.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  /* 
  cartItems is an array if objects with the following structure:
   {
     itemId, quantity
   }
  */

  function handleAddToCart(itemId){
    setCartItems(prevItems => {
      // console.log(`Adding item with id ${itemId} to cart called state-setter`);
      // console.log(prevItems);
      const existingItem = prevItems.find(item => item.itemId === itemId);
      // console.log(`existingItem:`, existingItem);
      // if item already exists in cart, increase quantity
      if(existingItem){
        // can remove {} from map and it will implicily return the object
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
        <Cart cartItems={cartItems}/>
      </aside>
      
    </div>
  );
}

export default App;