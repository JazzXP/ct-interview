import chalk, { ChalkInstance } from "chalk";
import { Task } from "../task/task";
import { allTasks } from "../tasklist/tasklist";

export const renderer = {
  out: console.log,
};

export const renderMainMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|       " + chalk.yellow("Task List") + "       |"));
  renderer.out(chalk.blue("=".repeat(25)));
  renderLine("1. List Tasks", chalk.yellow);
  renderLine("2. Add Task", chalk.yellow);
  renderLine("3. Remove Task", chalk.yellow);
  renderLine("4. Edit Task", chalk.yellow);
  renderLine("5. Complete Task", chalk.yellow);
  renderLine("q. Quit", chalk.yellow);
  renderer.out(chalk.blue("=".repeat(25)));
};

export const renderAddTaskMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|       " + chalk.yellow("Add Task") + "        |"));
  renderer.out(chalk.blue("=".repeat(25)));
};

export const renderRemoveTaskMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|      " + chalk.yellow("Remove Task") + "      |"));
  renderer.out(chalk.blue("=".repeat(25)));
  renderTasks(allTasks());
  renderLine("b. Back", chalk.yellow);
  renderer.out(chalk.blue("=".repeat(25)));
};

export const renderEditTaskMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|      " + chalk.yellow("Edit Task") + "      |"));
  renderer.out(chalk.blue("=".repeat(25)));
  renderTasks(allTasks());
  renderer.out(chalk.blue("| b. " + chalk.yellow("Back") + "               |"));
  renderer.out(chalk.blue("=".repeat(25)));
};

export const renderCompleteTaskMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|    " + chalk.yellow("Complete Task") + "    |"));
  renderer.out(chalk.blue("=".repeat(25)));
  renderTasks(allTasks());
  renderLine("b. Back", chalk.yellow);
  renderer.out(chalk.blue("=".repeat(25)));
};

export const renderTasksMenu = () => {
  renderer.out(chalk.blue("=".repeat(25)));
  renderer.out(chalk.blue("|     " + chalk.yellow("List of tasks") + "     |"));
  renderer.out(chalk.blue("=".repeat(25)));
  renderTasks(allTasks(), true);
  renderer.out(chalk.blue("=".repeat(25)));
};

const renderTasks = (tasks: Task[], showDescription: boolean = false) => {
  if (tasks.length === 0) {
    renderLine("No tasks specified", chalk.cyan);
    return;
  }
  tasks.forEach((t, i) => {
    renderLine(
      `${i + 1}. ${t.title}${t.complete ? " (complete)" : ""}`,
      chalk.yellow
    );
    if (showDescription && t.description) {
      renderLine(`-  ${t.description}`, chalk.grey);
    }
  });
};

/* Convenience method to wrap | around the line with the correct spacing. Will omit last | if the line is too long */
const renderLine = (text: string, colour: ChalkInstance) => {
  renderer.out(
    chalk.blue(
      "| " +
        colour(text) +
        (text.length < 22
          ? " ".repeat(Math.max(0, 22 - text.length)) + "|"
          : "")
    )
  );
};
