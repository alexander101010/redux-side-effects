import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
import { FIREBASE_ROOT_URL } from '../js/config';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_ROOT_URL}cart.json`);

      if (!response.ok) {
        throw new Error('Could not fetch cart data.');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [], // to prevent items property from being undefined
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Retreiving cart data failed.',
        })
      );
    }
  };
};

// CUSTOM ACTION CREATOR: a function that returns another function
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_ROOT_URL}cart.json`, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalAmount: cart.totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Cart data sent successfully.',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed.',
        })
      );
    }
  };
};
