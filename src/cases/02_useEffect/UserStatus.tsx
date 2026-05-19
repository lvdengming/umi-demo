/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-19 22:39:17
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-19 22:55:30
 */
import { useEffect, useState } from 'react';

export interface UserStatusProps {
  userId: string;
}

export interface User {
  name: string;
  email: string;
}

export default ({ userId }: UserStatusProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. 组件挂载 + userId 变化时执行
    console.log(`Fetching user ${userId}...`);
    // 防止组件卸载后设置状态
    let isMounted = true;

    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
        }
      });

    // 2. 清理函数，组件卸载或下次 effect 执行前调用
    return () => {
      isMounted = false;
      console.log(`Cleaning up for user ${userId}...`);
    };
  }, [userId]);

  // 另一个副作用，更新页面标题
  useEffect(() => {
    if (user) {
      document.title = `${user.name} 的资料`;
    }

    return () => {
      // 清理
      document.title = 'React App';
    };
  }, [user]);

  return loading ? (
    <p>加载中...</p>
  ) : (
    <div>
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
    </div>
  );
};
