import { createSlice } from '@reduxjs/toolkit';

const initialStateCart = {
  items: [{ title: 'Test', quantity: 5, total: 24, price: 6 }],
  totalAmount: 0,
  showCart: true,
  id: 100,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateCart,
  reducers: {
    addItemToCart(state, action) {
      // action.payload.item will be item object

      state.totalAmount = state.totalAmount + action.payload.item.total;

      // check to see if item exists in cart already
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.item.quantity,
        };
        state.items[existingCartItemIndex] = updatedItem;
        // const updatedItems = [...state.items];
        // updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        state.items = state.items.concat(action.payload.item);
      }
    },

    removeItemFromCart(state, action) {
      const existingCartItemIndex = state.items.find(
        (item) => item.id === action.payload.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if (existingCartItem.quantity === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.item.id
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      state.items = updatedItems;
    },
    clearCart(state, action) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
