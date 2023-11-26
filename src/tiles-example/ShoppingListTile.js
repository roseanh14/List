import React from 'react';
import Button from 'react-bootstrap/Button';

const ShoppingListTile = ({ shoppingList, isJohnOwner, handleRemoveShoppingList }) => {
  const tileStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '300px',
    backgroundColor: isJohnOwner ? '#b3d9ff' : '#c2f0c2', 
  };

  const ownerTextStyle = {
    color: isJohnOwner ? 'blue' : 'green', 
  };

  return (
    <div style={tileStyle}>
      <h3 style={ownerTextStyle}>{shoppingList.name}</h3>
      <p style={ownerTextStyle}>
        {isJohnOwner ? `Owner: ${shoppingList.owner}` : `Member: ${shoppingList.members.join(', ')}`}
      </p>
      <ul>
        {shoppingList.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div> 
        <Button variant="danger" onClick={() => handleRemoveShoppingList(shoppingList.id)}>Delete</Button>
        <Button variant="info">Detail</Button>
      </div>
    </div>
  );
};


export default ShoppingListTile;