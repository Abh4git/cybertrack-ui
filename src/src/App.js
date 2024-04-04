import logo from './logo.svg';
import './App.css';
import React from 'react';
import InventoryList from './InventoryList';

const inventoryData = [
  { id: 1, name: 'Item 1', quantity: 10, price: 20 },
  { id: 2, name: 'Item 2', quantity: 15, price: 25 },
  // Add more inventory items as needed
];
function App() {
  return (
    <div className="App">
    <h1>Inventory List</h1>
    <InventoryList inventory={inventoryData} />
  </div>
  );
}

export default App;
