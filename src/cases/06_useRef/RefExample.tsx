/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-24 00:22:49
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-24 00:50:44
 */
import { useEffect, useRef, useState } from 'react';
import './RefExample.less';

export default () => {
  // 1. DOM 引用
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
    inputRef.current.value = '我被聚焦了';
  };

  // 2. 保存定时器 ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  const startTimer = () => {
    if (timerRef.current) {
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((prev: number) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 清理定时器
  useEffect(() => {
    return () => stopTimer();
  }, []);

  // 3. 保存前一个状态值
  // setSeconds 后先执行渲染，再执行 useEffect，所以渲染拿到的 prevSeconds 是上一次的值
  // prevSecondsRef.current 赋值不会触发新的渲染
  const prevSecondsRef = useRef<number>(0);
  useEffect(() => {
    prevSecondsRef.current = seconds;
  }, [seconds]);
  const prevSeconds = prevSecondsRef.current;

  return (
    <div>
      <h2>useRef 示例</h2>

      <div>
        <input ref={inputRef} type="text" placeholder="点击按钮聚焦我" />
        <button className="ml-8" onClick={focusInput}>
          聚焦输入框
        </button>
      </div>

      <hr />

      <div className="mt-20">
        <p>
          计时器：{seconds} 秒，上一次：{prevSeconds} 秒
        </p>
        <button onClick={startTimer}>开始</button>
        <button className="ml-8" onClick={stopTimer}>
          停止
        </button>
      </div>

      <hr />

      <div className="mt-20">
        <p>useRef 保存的值不会触发组件重新渲染：</p>
        <button
          onClick={() => {
            // 不会导致组件更新
            timerRef.current = 0 as never;
            console.log('timerRef 现在为：', timerRef.current);
          }}
        >
          修改 ref，但不触发更新
        </button>
      </div>
    </div>
  );
};
