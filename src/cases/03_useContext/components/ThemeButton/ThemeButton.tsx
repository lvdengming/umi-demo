/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 20:02:40
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 20:08:37
 */
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeButton.module.less';

// 使用示例组件
export default () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles['toggle-button'] + ' ' + styles[theme]}
      onClick={toggleTheme}
    >
      当前主题: {theme}
    </button>
  );
};
