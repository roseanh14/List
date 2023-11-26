import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ShoppingListDetails = ({ shoppingList, isOwner, onUpdate, onSwitchRole }) => {
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState(shoppingList.name);

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
    onUpdate({
      ...shoppingList,
      name: editedName,
    });
  };

  return (
    <div>
      <h2>
        {editingName ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Button variant="secondary" onClick={handleSaveName}>Save Name</Button>
          </>
        ) : (
          <>
            {shoppingList.name}
            {isOwner && (
              <Button variant="info" onClick={handleEditName}>Edit Name</Button>
            )}
          </>
        )}
      </h2>
      <p>{isOwner ? `Owner: ${shoppingList.owner}` : `Member: ${shoppingList.members.join(', ')}`}</p>
      <Button variant="secondary" onClick={onSwitchRole}>Switch Role</Button>
    </div>
  );
};

export default ShoppingListDetails;