/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-19 22:57:06
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-19 22:57:22
 */
import UserStatus from '@/cases/02_useEffect/UserStatus';
import { useState } from 'react';

export default () => {
  const [id, setId] = useState<number>(1);
  const increment = () => {
    setId((prev: number) => prev + 1);
  };

  return (
    <>
      <button onClick={increment}>ChangeId</button>
      <p>Count: {id}</p>
      <UserStatus userId={id.toString()} />
    </>
  );
};
