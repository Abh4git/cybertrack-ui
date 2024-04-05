import React, { useState, useEffect } from 'react';

function AssetList() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        const response = await fetch('http://localhost:8084/api/asset');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setInventory(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllAssets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Asset List</h1>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>{item.name}: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default AssetList;
