import logo from './logo.svg';
import './App.css';
import React from 'react';
import InventoryList from './InventoryList';
import AssetList from './AssetList';
import AssetsTable from './AssetsTable';
const inventoryData = [
  { id: 1, name: 'Item 1', quantity: 10, price: 20 },
  { id: 2, name: 'Item 2', quantity: 15, price: 25 },
  // Add more inventory items as needed
   //<InventoryList inventory={inventoryData} />
];
function App() {
  return (
    <div className="App">
    <h1>Inventory List</h1>
    
    <AssetsTable />
  </div>
  );
}

export default App;
