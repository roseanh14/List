import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ShoppingListMembers = ({ shoppingList, isOwner, onAddMember, onRemoveMember, onUnsubscribe }) => {
  const [newMember, setNewMember] = useState('');

  return (
    <div>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Enter new member name"
      />
      <button onClick={() => onAddMember(newMember)}>Add Member</button>
      <ul>
        {shoppingList.members.map((member) => (
          <li key={member}>
            {member}{' '}
            <Button
              variant={isOwner ? 'danger' : 'warning'}
              onClick={() => (isOwner ? onRemoveMember(member) : onUnsubscribe(member))}
            >
              {isOwner ? 'Delete' : 'Unsubscribe'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListMembers;