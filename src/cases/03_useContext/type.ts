/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 19:57:11
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 19:57:14
 */

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
