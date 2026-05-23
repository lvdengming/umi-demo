/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-05-23 21:24:12
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-05-23 21:51:58
 */
export interface TodoItemRecord {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: TodoItemRecord;
  onToggle: (id: number) => void;
}

export type FilterType = 'all' | 'active' | 'completed';
