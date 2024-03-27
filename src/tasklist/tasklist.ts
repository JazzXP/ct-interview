import { Task } from "../task/task";

export interface TaskList {
  tasks: Task[];
}

const taskList: TaskList = { tasks: [] };

export const clear = () => (taskList.tasks = []);

export const addTask = (t: Task) => (taskList.tasks = [...taskList.tasks, t]);

export const removeTask = (num: number) => {
  if (num >= 0 && num < taskList.tasks.length) {
    taskList.tasks = taskList.tasks.filter((t, i) => i !== num);
    return true;
  }
  return false;
};

export const getTask = (num: number) => {
  if (num >= 0 && num < taskList.tasks.length) {
    return taskList.tasks[num];
  }
  return null;
};

export const updateTask = (t: Task) =>
  (taskList.tasks = taskList.tasks.map((task) =>
    task.id === t.id ? t : task
  ));

export const completeTask = (t: Task) => updateTask({ ...t, complete: true });

export const allTasks = () => taskList.tasks;
