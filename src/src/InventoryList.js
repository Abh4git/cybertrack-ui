import React, { useState } from 'react';
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
  },
  tableRow: {
    backgroundColor: '#e3f2fd', // Light blue
  },
});

function InventoryList({ inventory }) {
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
              {Object.keys(inventory[0]).map((key, index) => (
                <TableCell key={index} className={classes.tableHeadText}>{key}</TableCell>
                
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell><FileIcon /></TableCell>
                {Object.keys(item).map((key, i) => (
                  <TableCell key={i}>{item[key]}</TableCell>
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

export default InventoryList;
