/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 20:48:24
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 21:14:15
 */
import { useReducer } from 'react';
import './ShoppingCart.less';
import { CartAction, CartItem, CartState, Product } from './type';

export default () => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const products: Array<Product> = [
    { id: 1, name: 'React 教程', price: 99 },
    { id: 2, name: 'TypeScript 进阶', price: 129 },
    { id: 3, name: 'Node.js 实战', price: 149 },
  ];
  const total = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2>商品列表</h2>
      {products.map((product: Product) => (
        <div key={product.id}>
          <span>
            {product.name} - ¥{product.price.toFixed(2)}
          </span>
          <button
            className="ml-8"
            onClick={() => dispatch({ type: 'ADD_ITEM', product })}
          >
            加入购物车
          </button>
        </div>
      ))}

      <h2>购物车</h2>
      {cart.items.length === 0 && <p>购物车为空</p>}
      {cart.items.map((item: CartItem) => (
        <div key={item.id}>
          <span>
            {item.name} ✖️ {item.quantity} = ¥
            {(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            className="ml-8"
            onClick={() =>
              dispatch({
                type: 'UPDATE_QUANTITY',
                productId: item.id,
                quantity: item.quantity - 1,
              })
            }
          >
            -1
          </button>
          <button
            className="ml-8"
            onClick={() =>
              dispatch({
                type: 'UPDATE_QUANTITY',
                productId: item.id,
                quantity: item.quantity + 1,
              })
            }
          >
            +1
          </button>
          <button
            className="ml-8"
            onClick={() =>
              dispatch({ type: 'REMOVE_ITEM', productId: item.id })
            }
          >
            删除
          </button>
        </div>
      ))}

      <p>总计: ¥{total.toFixed(2)}</p>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        清空购物车
      </button>
    </div>
  );
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.product.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item: CartItem) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.product, quantity: 1 }],
        };
      }
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item: CartItem) =>
          item.id === action.productId
            ? { ...item, quantity: Math.max(0, action.quantity) }
            : item,
        ),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item: CartItem) => item.id !== action.productId,
        ),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}
