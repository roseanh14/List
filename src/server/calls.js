
import mockData from './mockData';

const Calls = {
  async call(method, endpoint, dtoIn, clientOptions) {
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    
    if (endpoint.startsWith('shopping-lists')) {

      return { data: mockData.shoppingLists };
    } else {
    
      throw new Error('Invalid endpoint');
    }
  },

  async loadShoppingLists() {
    const endpoint = 'shopping-lists';
    return Calls.call('get', endpoint, {});
  },

  async addShoppingList(newShoppingList) {
    const endpoint = 'shopping-lists';
  
    mockData.shoppingLists.push(newShoppingList);
    return Calls.call('post', endpoint, { data: newShoppingList });
  },

  async updateShoppingList(updatedShoppingList) {
    const endpoint = `shopping-lists/${updatedShoppingList.id}`;
    
    const index = mockData.shoppingLists.findIndex(
      (list) => list.id === updatedShoppingList.id
    );
    if (index !== -1) {
      mockData.shoppingLists[index] = updatedShoppingList;
      return Calls.call('put', endpoint, { data: updatedShoppingList });
    } else {
      throw new Error('Shopping list not found');
    }
  },

  async deleteShoppingList(shoppingListId) {
    const endpoint = `shopping-lists/${shoppingListId}`;
    
    const index = mockData.shoppingLists.findIndex(
      (list) => list.id === shoppingListId
    );
    if (index !== -1) {
      mockData.shoppingLists.splice(index, 1);
      return Calls.call('delete', endpoint, { data: shoppingListId });
    } else {
      throw new Error('Shopping list not found');
    }
  },
};

export default Calls;