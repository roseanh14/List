import React, { useState, useEffect } from 'react';
import ShoppingListDetails from '../shopping-list-detail/ShoppingListDetails';
import ShoppingListMembers from '../shopping-list-detail/ShoppingListMembers';
import ShoppingListItems from '../shopping-list-detail/ShoppingListItems';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShoppingList = ({ shoppingList, onUpdate }) => {
  const [newMember, setNewMember] = useState('');
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false);
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    console.log('ShoppingList component rendered');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ShoppingListDetails
        shoppingList={shoppingList}
        isOwner={isOwner}
        onUpdate={onUpdate}
        onSwitchRole={() => setIsOwner((prevIsOwner) => !prevIsOwner)}
      />
      <ShoppingListMembers
        shoppingList={shoppingList}
        isOwner={isOwner}
        newMember={newMember}
        onAddMember={(member) => {
          setNewMember('');
          onUpdate({ ...shoppingList, members: [...shoppingList.members, member] });
        }}
        onRemoveMember={(member) => {
          // Handle removing member logic
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
        onUnsubscribe={(member) => {
          // Handle unsubscribe logic for members
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
      />
      <ShoppingListItems
        shoppingList={shoppingList}
        showUncheckedOnly={showUncheckedOnly}
        onUpdate={onUpdate}
        onToggleShowUncheckedOnly={() => setShowUncheckedOnly(!showUncheckedOnly)}
      />
    </div>
  );
};

export default ShoppingList;