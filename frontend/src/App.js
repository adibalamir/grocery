import './App.css';
import React, { useState, useEffect } from 'react';

function GroceryList(props) {
  return <ul className="grocery-list row">
    {props.list.length > 0 ? props.list.map(item => {
      return <li className="grocery-item" key={item.id}>{item.item_name}</li>
    }) : <li className="grocery-item">You have no items</li>}
  </ul>
}

function App() {
  const [groceryList, addGroceryItem] = useState([])
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/groceryitems/1`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        addGroceryItem(data);
      })
      .catch(error => {
        return error;
      })
  })

  function onSubmit(groceryList, input) {
    addGroceryItem([...groceryList, input]);
    setInput("");
  }

  return (
    <div className="App">
      <header className="App-header row">
        <h1>Shopping List</h1>
      </header>
      
      <GroceryList list={groceryList} />
      
      <div className="row">
        <input name="new-grocery-item" placeholder="Add a new item." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="submit-grocery-item" onClick={() => onSubmit(groceryList, input)}>Submit</button>
      </div>
    </div>
  );
}

export default App;
