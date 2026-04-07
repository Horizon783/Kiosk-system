import MenuGrid from "./components/MenuGrid.jsx";
import './App.css';
import CategoryList from "./components/CategoryList.jsx";
import { useEffect, useState } from "react";
import Cart from "./components/Cart.jsx";
import newMenu from "./data/new_menu.js";

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
    const total = cartItems.reduce((sum, item)=>{
      return sum + newMenu[item.itemId].price*item.quantity;
    },0);

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
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
  
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
},[cartItems]);

useEffect(()=>{

    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
},[orderHistory]);



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
              {orderHistory.length > 0 && (
                <div>
                  <h3>Last Order Summary</h3>
                  {
                    orderHistory[orderHistory.length -1].items.map(item =>(
                      <p key={item.itemId}>
                        {newMenu[item.itemId].name} x {item.quantity}
                      </p>
                    ))
                  }
                  <h4>Total: ₹{orderHistory[orderHistory.length -1].total}</h4>
                </div>
              )}
              <button onClick={()=>setOrderPlaced(false)}>New Order </button>
            </div>
          )
           : (<MenuGrid selectedCategory={selectedCategory} onAddToCart = {handleAddToCart}/> ) } 
        
      </main>

      <aside className="sidebar right" >
        <h3>Cart Items</h3>
        <Cart cartItems={cartItems} setQuantity={handleAddToCart} onPlaceOrder={handlePlaceOrder} />
      </aside>

      <ul>
        <h3>Order History</h3>
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