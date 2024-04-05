import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { InsertDriveFile as FileIcon } from '@mui/icons-material';
import{makeStyles} from '@mui/styles';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#1e88e5', // Dark blue
  },
  tableHeadText: {
    color: 'white', // White text color
    font: 'verdana',
  },
  tableRow: {
    backgroundColor: '#e3f2fd', // Light blue
  },
});

function AssetsTable() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Inventory
  const classes = useStyles();
  const [csvData, setCsvData] = useState('');  
 
  const exportToCsv = () => {
    const csvRows = [];
    const headers = Object.keys(inventory[0]);
    csvRows.push(headers.join(','));

    inventory.forEach(item => {
      const values = headers.map(header => item[header]);
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    setCsvData(csvString);
  };

  // Filter the columns you want to display
  const filteredInventory = inventory.map(item => ({
    Identifier: item.identifier,
    Name: item.name,
    Description: item.description,
    URL: item.url
    // Add more properties as needed
  }));

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
    <Button variant="contained" onClick={exportToCsv} style={{ marginBottom: '20px' }}>
      Export to CSV
    </Button>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="inventory table">
        <TableHead className={classes.tableHead}>
          <TableRow>
          <TableCell>Icon</TableCell>
            {Object.keys(filteredInventory[0]).map((key, index) => (
              <TableCell key={index} className={classes.tableHeadText}>{key}</TableCell>
              
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInventory.map((item, index) => (
            <TableRow key={index} className={classes.tableRow}>
              <TableCell><FileIcon /></TableCell>
              {Object.keys(item).map((key, i) => (
                <TableCell font={'verdana'} key={i}>{item[key]}</TableCell>
              ))}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {csvData && (
      <div>
        <h2>CSV Data:</h2>
        <textarea rows="10" cols="50" value={csvData} readOnly />
      </div>
    )}
  </div>
  );
}

export default AssetsTable;
