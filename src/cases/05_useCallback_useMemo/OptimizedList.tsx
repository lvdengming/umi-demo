/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 21:19:44
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 21:52:17
 */
import { memo, useCallback, useMemo, useState } from 'react';
import './OptimizedList.less';
import { FilterType, TodoItemProps, TodoItemRecord } from './type';

// 子组件使用 memo 避免不必要的重新渲染
const TodoItem = memo(({ todo, onToggle }: TodoItemProps) => {
  console.log(`渲染 TodoItem ${todo.id}...`);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={'ml-8 ' + (todo.completed ? 'line-through' : '')}>
        {todo.text}
      </span>
    </li>
  );
});

export default () => {
  const [todoList, setTodoList] = useState<Array<TodoItemRecord>>([
    { id: 1, text: '学习 useCallback', completed: false },
    { id: 2, text: '掌握 useMemo', completed: false },
    { id: 3, text: '成为 React 专家', completed: false },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [count, setCount] = useState<number>(0);

  // useMemo: 缓存计算结果，只有 todoList 或 filter 变化时才重新计算
  const filteredList = useMemo(() => {
    console.log('重新计算过滤列表...');

    switch (filter) {
      case 'active':
        return todoList.filter((item) => !item.completed);
      case 'completed':
        return todoList.filter((item) => item.completed);
      default:
        return todoList;
    }
  }, [todoList, filter]);

  // useCallback: 缓存函数，依赖不变则函数引用不变
  // 如果依赖为空，则函数永远不变
  const handleToggle = useCallback((id: number) => {
    setTodoList((prev: Array<TodoItemRecord>) =>
      prev.map((item: TodoItemRecord) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }, []);

  // 另一个昂贵计算案例
  // 只有 count 变化时才重新计算 expensiveNum
  const expensiveNum = useMemo(() => {
    console.log('执行昂贵计算...');

    // 模拟耗时操作
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
      sum += i;
    }

    return sum + count;
  }, [count]);

  return (
    <div>
      <h2>待办事项</h2>

      <div>
        <span>过滤：</span>
        <button className="ml-8" onClick={() => setFilter('all')}>
          全部
        </button>
        <button className="ml-8" onClick={() => setFilter('active')}>
          未完成
        </button>
        <button className="ml-8" onClick={() => setFilter('completed')}>
          已完成
        </button>
      </div>

      <ul>
        {filteredList.map((item: TodoItemRecord) => (
          <TodoItem key={item.id} todo={item} onToggle={handleToggle} />
        ))}
      </ul>

      <hr />

      <div>
        <p>昂贵计算结果: {expensiveNum}</p>

        <button className="ml-8" onClick={() => setCount((c: number) => c + 1)}>
          增加计数 {count}
        </button>
      </div>
    </div>
  );
};
