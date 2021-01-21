import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function GroceryList(props) {
  return <ul className="grocery-list row">
    {props.list.length > 0 ? props.list.map((item, index) => {
      return <li className="grocery-item" key={index}>{item.item_name}</li>
    }) : <li className="grocery-item">You have no items</li>}
  </ul>
}

const addGroceryItemDB = (newItem) => {
  let _newItem = {
    grocerylist_id: newItem.grocerylist_id,
    item_name: newItem.item_name
  };

  axios.post('http://localhost:9000/groceryitem', _newItem);
}

function App() {
  const [groceryList, addGroceryItem] = useState([])
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:9000/grocerylist/1`)
      .then(res => {
        addGroceryItem(res.data);
      })
      .catch(error => {
        console.log("ERROR");
        return error;
      })
  }, []);

  function onSubmit(groceryList, input) {
    const _newItem = {
      grocerylist_id: 1,
      item_name: input
    }

    //update grocerylist client-side, update database, then clear user input
    addGroceryItem([...groceryList, _newItem]);
    addGroceryItemDB(_newItem);
    setInput(""); 
  }

  return (
    <div className="App">
      <header className="App-header row">
        <h1>Shopping List</h1>
      </header>
      
      <GroceryList list={groceryList} />
      
      <div className="row">
        <input name="item_name" placeholder="Add a new item." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="submit-grocery-item" onClick={() => onSubmit(groceryList, input)}>Submit</button>
      </div>
    </div>
  );
}

export default App;
