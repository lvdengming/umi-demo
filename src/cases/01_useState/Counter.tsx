/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-19 07:05:37
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-19 07:10:11
 */
import { useState } from 'react';
import styles from './Counter.module.less';

export default () => {
  // 生命状态变量 count，初始值为 0
  const [count, setCount] = useState<number>(0);

  // 基于当前值更新（函数式更新，避免闭包陷阱）
  const increment = () => {
    setCount((prev: number) => prev + 1);
  };

  const decrement = () => {
    setCount((prev: number) => prev - 1);
  };

  // 重置
  const reset = () => {
    setCount(0);
  };

  return (
    <div className={styles['counter-wrapper']}>
      <h2>计数器: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  );
};
