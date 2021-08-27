import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { DUMMY_PRODUCTS } from '../../store/dummyProducts';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              title={product.title}
              price={product.price}
              description={product.description}
              key={product.id}
              id={product.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
