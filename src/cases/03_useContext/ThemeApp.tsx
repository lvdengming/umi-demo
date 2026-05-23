/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 19:52:40
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 20:15:01
 */
import ThemeButton from './components/ThemeButton/ThemeButton';
import ThemePanel from './components/ThemePanel/ThemePanel';
import { ThemeProvider } from './contexts/ThemeContext';

export default () => {
  return (
    <ThemeProvider>
      <ThemeButton />
      <ThemePanel />
    </ThemeProvider>
  );
};
