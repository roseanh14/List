import React, { useState, useEffect } from 'react';
import ShoppingListTile from '../tiles-example/ShoppingListTile';
import AddShoppingList from '../tiles-example/AddShoppingList';
import Calls from '../server/calls';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const TilesPage = () => {
  const { t } = useTranslation();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedVisible, setArchivedVisible] = useState(false);
  const [isJohnOwner, setIsJohnOwner] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleArchivedVisibility = () => {
    setArchivedVisible(!archivedVisible);
  };

  const switchRoleButtonStyle = {
    marginLeft: '16px',
  };

  const handleAddShoppingList = async (name, items) => {
    const newShoppingList = {
      id: shoppingLists.length + 1,
      name: name,
      items: items,
      archived: false,
      owner: 'John',
      members: ['Jane'],
    };

    try {
      setLoading(true);

      await Calls.addShoppingList(newShoppingList);

      const response = await Calls.loadShoppingLists();

      if (response && Array.isArray(response.data)) {
        setShoppingLists(response.data);
      } else {
        console.error('Invalid data format:', response);
      }
    } catch (error) {
      console.error('Error adding shopping list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveShoppingList = async (shoppingListId) => {
    const shoppingListToRemove = shoppingLists.find(
      (list) => list.id === shoppingListId
    );

    try {
      setLoading(true);

      if (!shoppingListToRemove) {
        alert(t('shoppingListNotFound'));
        return;
      }

      const currentUser = isJohnOwner ? 'John' : 'Jane';

      if (shoppingListToRemove.owner !== currentUser) {
        alert(t('deletePermissionError', { owner: shoppingListToRemove.owner }));
        return;
      }

      await Calls.deleteShoppingList(shoppingListId);

      const response = await Calls.loadShoppingLists();

      console.log('Received data after removing:', response);

      if (response && Array.isArray(response.data)) {
        setShoppingLists(response.data);
      } else {
        console.error('Invalid data format after removing:', response);
      }
    } catch (error) {
      console.error('Error deleting shopping list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await Calls.loadShoppingLists();

        console.log('Received data on mount:', response);

        if (response && Array.isArray(response.data)) {
          setShoppingLists(response.data);
        } else {
          console.error('Invalid data format on mount:', response);
        }
      } catch (error) {
        console.error('Error loading shopping lists:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSwitchRole = () => {
    setIsJohnOwner((prevIsJohnOwner) => !prevIsJohnOwner);
  };

  return (
    <div>
      <h2>{t('tilesPage')}</h2>
      <Button variant="primary" onClick={toggleArchivedVisibility}>
        {archivedVisible ? t('hideArchived') : t('showArchived')}
      </Button>
      <Button variant="secondary" onClick={handleSwitchRole} style={switchRoleButtonStyle}>
        {t('switchRole')}
      </Button>
      {loading && <p>{t('loading')}</p>}
      <div style={containerStyle}>
        {shoppingLists
          .filter(
            (shoppingList) =>
              (archivedVisible ? shoppingList.archived : true)
          )
          .map((shoppingList) => (
            <ShoppingListTile
              key={shoppingList.id}
              shoppingList={shoppingList}
              isJohnOwner={isJohnOwner}
              handleRemoveShoppingList={handleRemoveShoppingList}
            />
          ))}
        {!archivedVisible && (
          <AddShoppingList handleAddShoppingList={handleAddShoppingList} />
        )}
      </div>
    </div>
  );
};

export default TilesPage;