/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 20:49:10
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 21:00:45
 */
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartReducer = (state: CartState, action: CartAction) => CartState;

export interface CartState {
  items: Array<CartItem>;
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'CLEAR_CART' };
