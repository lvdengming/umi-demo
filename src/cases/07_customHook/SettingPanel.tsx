/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-24 00:55:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-24 01:23:18
 */
import { useLocalStorage } from './hooks/useLocalStorage';
import styles from './SettingPanel.module.less';

export default () => {
  const [username, setUsername] = useLocalStorage<string>('username', 'Guest');
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div className={styles['panel-wrapper'] + ' ' + styles[theme]}>
      <h2>设置面板（数据自动保存到 localStorage）</h2>

      <div>
        <label>用户名: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ margin: '16px 0' }}>
        <label>主题: </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>

      <p>
        当前用户名: {username} | 当前主题: {theme}
      </p>
    </div>
  );
};
