import MenuGrid from "./components/MenuGrid.jsx";
import './App.css';
import CategoryList from "./components/CategoryList.jsx";
import { useEffect, useState } from "react";
import Cart from "./components/Cart.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem("orderHistory");
    return saved ? JSON.parse(saved): [];
  })
  /* 
  cartItems is an array of objects with the following structure:
   {

     itemId, quantity
   }
  */

   function handlePlaceOrder(){
    console.log("order placed",cartItems);
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      timeStamp: new Date().toLocaleString()
    };
    
    setOrderHistory(prev => [...prev, newOrder]);
    setCartItems([]);
    setOrderPlaced(true);
   }

  function handleAddToCart(itemId, option = "+") {

  setCartItems(prevItems => {

    const existingItem = prevItems.find(item => item.itemId === itemId);

    if(option === "remove"){
      return prevItems.filter(item => item.itemId !== itemId);
    }

    if(option === "-"){

      if(!existingItem) return prevItems;

      if(existingItem.quantity === 1){
        return prevItems.filter(item => item.itemId !== itemId);
      }

      return prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    if(existingItem){
      return prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prevItems, { itemId, quantity: 1 }];

  });

}

useEffect(()=>{
  // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
},[cartItems,orderHistory]);



  return (
    <div className="dashboard">
      <aside className="sidebar left" >
        <h3>Categories</h3>
        <CategoryList onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
      </aside>

      <main>
          { orderPlaced ? (
            <div>
              <h2>Order Confirmed! 🎉</h2> 
              <button onClick={()=>setOrderPlaced(false)}>New Order </button>
            </div>
          )
           : (<MenuGrid selectedCategory={selectedCategory} onAddToCart = {handleAddToCart}/> ) } 
        
      </main>

      <aside className="sidebar right" >
        <h3>Cart Items</h3>
        <Cart cartItems={cartItems} setQuantity={handleAddToCart} onPlaceOrder={handlePlaceOrder} />
      </aside>

      <h3>Order History</h3>
      <ul>
        {orderHistory.map(order =>(
          <li key={order.id}>
            Order at {order.timeStamp}
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;