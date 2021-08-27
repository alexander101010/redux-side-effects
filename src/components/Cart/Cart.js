import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const { items, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(items, totalAmount);
  }, [items, totalAmount]);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                total: item.totalPrice,
                price: item.price,
                quantity: item.quantity,
              }}
            />
          );
        })}
      </ul>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
    </Card>
  );
};

export default Cart;
