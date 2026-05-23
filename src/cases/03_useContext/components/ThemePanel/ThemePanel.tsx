/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 20:09:26
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 20:13:51
 */
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemePanel.module.less';

export default () => {
  const { theme } = useTheme();

  return (
    <div className={styles['theme-panel'] + ' ' + styles[theme]}>
      这个面板颜色随主题变化
    </div>
  );
};
