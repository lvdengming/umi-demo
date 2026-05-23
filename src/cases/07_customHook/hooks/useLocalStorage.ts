/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-24 00:59:58
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-24 01:10:50
 */
import { useEffect, useState } from 'react';

// 自定义 Hook，名称必须以 "use" 开头
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // 惰初始化函数，避免每次渲染都读取 localStorage
  // useState 初始值为函数时，叫惰性初始化函数，只有在组件初次渲染时才会执行，它的返回值作为 useState 的初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 封装 setValue，同时更新 state 和 localStorage
  const setValue = (value: T): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听其它标签页的变化（可选）
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(JSON.parse(event.newValue ?? ''));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
