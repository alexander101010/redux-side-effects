import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartBtnToggleHandler = () => {
    dispatch(uiActions.toogleCart());
  };

  const items = useSelector((state) => state.cart.items);
  const numberOfItems = items.reduce((curNum, item) => {
    return curNum + item.quantity;
  }, 0);

  return (
    <button className={classes.button} onClick={cartBtnToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default CartButton;
