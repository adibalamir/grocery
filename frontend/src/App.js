import './App.css';
import React, { useState, useEffect } from 'react';

function GroceryList(props) {
  return <ul className="grocery-list">
    {props.list.length > 0 ? props.list.map(item => {
      return <li className="grocery-item" key={item.length}>{item}</li>
    }) : <li className="grocery-item">You have no items</li>}
  </ul>
}

function App() {
  const [groceryList, addGroceryItem] = useState([])
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`https://localhost:9000/testAPI`)
      .then(res => {
        console.log(res);
      })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shopping List</h1>
      </header>
      
      <input name="new-grocery-item" placeholder="Add a new item." value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="submit-grocery-item" onClick={() => addGroceryItem([...groceryList, input])}>Submit</button>
      <GroceryList list={groceryList} />
    </div>
  );
}

export default App;
