/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 19:53:14
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 20:01:50
 */
import { createContext, useContext, useState } from 'react';
import { Theme, ThemeContextValue, ThemeProviderProps } from '../type';

// 1. 创建 Context
const ThemeContext = createContext<ThemeContextValue | null>(null);

// 2. 创建 Provider 组件
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 自定义 Hook 方便调用
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
