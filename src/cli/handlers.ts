import chalk from "chalk";
import { Interface as rlInterface } from "node:readline/promises";
import { createTask } from "../task/task";
import {
  addTask,
  removeTask,
  getTask,
  updateTask,
  completeTask,
} from "../tasklist/tasklist";
import {
  renderAddTaskMenu,
  renderRemoveTaskMenu,
  renderEditTaskMenu,
  renderCompleteTaskMenu,
  renderer,
} from "./renderers";

export const handleAddTaskMenu = async (rl: rlInterface) => {
  renderAddTaskMenu();
  const title = await rl.question(chalk.blue("Title: "));
  const description = await rl.question(chalk.blue("Description: "));
  addTask(createTask(title, description));
};

export const handleRemoveTaskMenu = async (rl: rlInterface) => {
  let validTask = false;
  while (!validTask) {
    renderRemoveTaskMenu();
    const taskResp = await rl.question(chalk.blue("Remove Task Number: "));
    if (taskResp !== "b") {
      // Because we're 1 based for user selection, we can assume a parsed number of 0 is an invalid input
      const taskNum = Number(taskResp);

      if (removeTask(taskNum - 1)) {
        validTask = true;
      } else {
        renderer.out(chalk.red("Invalid Task"));
      }
    } else {
      validTask = true;
    }
  }
};

export const handleEditTaskMenu = async (rl: rlInterface) => {
  let validTask = false;
  while (!validTask) {
    renderEditTaskMenu();
    const taskResp = await rl.question(chalk.blue("Edit Task Number: "));
    if (taskResp !== "b") {
      // Because we're 1 based for user selection, we can assume a parsed number of 0 is an invalid input
      const taskNum = Number(taskResp);
      const t = getTask(taskNum - 1);

      if (t) {
        validTask = true;
        const newTask = { ...t }; // Make a copy to keep things nice and clean
        const newTitle = await rl.question(
          chalk.blue("New Title (Blank to keep existing): ")
        );
        const newDescription = await rl.question(
          chalk.blue("New Description (Blank to keep existing): ")
        );
        if (newTitle.length > 0) {
          newTask.title = newTitle;
        }
        if (newDescription.length > 0) {
          newTask.description = newDescription;
        }
        updateTask(newTask);
      } else {
        renderer.out(chalk.red("Invalid Task"));
      }
    } else {
      validTask = true;
    }
  }
};

export const handleCompleteTaskMenu = async (rl: rlInterface) => {
  let validTask = false;
  while (!validTask) {
    renderCompleteTaskMenu();
    const taskResp = await rl.question(chalk.blue("Edit Task Number: "));
    if (taskResp !== "b") {
      // Because we're 1 based for user selection, we can assume a parsed number of 0 is an invalid input
      const taskNum = Number(taskResp);
      const t = getTask(taskNum - 1);

      if (t) {
        completeTask(t);
        validTask = true;
      } else {
        renderer.out(chalk.red("Invalid Task"));
      }
    } else {
      validTask = true;
    }
  }
};
