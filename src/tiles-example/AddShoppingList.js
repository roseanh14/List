import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const AddShoppingList = ({ handleAddShoppingList }) => {
  const [newShoppingListName, setNewShoppingListName] = useState('');
  const [newShoppingListItem, setNewShoppingListItem] = useState('');
  const [newShoppingListItems, setNewShoppingListItems] = useState([]);

  const handleAddList = () => {
    if (newShoppingListName.trim() !== '' && newShoppingListItems.length > 0) {
      handleAddShoppingList(newShoppingListName, newShoppingListItems);

      setNewShoppingListName('');
      setNewShoppingListItem('');
      setNewShoppingListItems([]);
    } else {
      alert('Please enter a name and at least one item for the shopping list.');
    }
  };

  const handleAddItem = () => {
    if (newShoppingListItem.trim() !== '') {
      setNewShoppingListItems([...newShoppingListItems, newShoppingListItem]);
      setNewShoppingListItem('');
    } else {
      alert('Please enter an item for the shopping list.');
    }
  };

  return (
    <div style={tileStyle}>
      <h3>Create Shopping List</h3>
      <input
        type="text"
        value={newShoppingListName}
        onChange={(e) => setNewShoppingListName(e.target.value)}
        placeholder="Enter a name"
      />
      <div>
        <textarea
          value={newShoppingListItem}
          onChange={(e) => setNewShoppingListItem(e.target.value)}
          placeholder="Enter an item"
        />
        <Button variant="success" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>
      <ul>
        {newShoppingListItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Button variant="success" onClick={handleAddList}>
        Create
      </Button>
    </div>
  );
};

const tileStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '350px',
};

export default AddShoppingList;