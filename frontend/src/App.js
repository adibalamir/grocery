import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroceryList(props) {
  return <ul className="grocery-list row">
    {props.list.length > 0 ? props.list.map(item => {
      return <li className="grocery-item" key={item.id}>{item.item_name}</li>
    }) : <li className="grocery-item">You have no items</li>}
  </ul>
}

const addGroceryItemDB = (item) => {
  let _data = {
    grocerylist_id: item.grocerylist_id,
    id: item.id,
    item_name: item.item_name
  };

  console.log(_data);

  // axios.post('http://localhost:9000/groceryitems', _data)
  //   .then(function(response) {
  //     console.log(response);
  //   })

  let request = new Request('http://localhost:9000/groceryitems',{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(_data)
  })

  fetch(request);
}

function App() {
  const [groceryList, addGroceryItem] = useState([])
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/groceryitems/1`)
      .then(res => {
        console.log("Getting grocerylist...");
        return res.json();
      })
      .then(json => {
        addGroceryItem(json);
      })
      .catch(error => {
        console.log("ERROR");
        return error;
      })
  }, []);

  function onSubmit(groceryList, input) {
    const newItem = {
      grocerylist_id: 1,
      id: 3,
      item_name: input
    }
     
    console.log(input);
    addGroceryItem([...groceryList, newItem]);
    addGroceryItemDB(newItem);
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
