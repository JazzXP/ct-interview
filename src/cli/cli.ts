import chalk from "chalk";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { renderMainMenu, renderTasksMenu, renderer } from "./renderers";
import {
  handleAddTaskMenu,
  handleRemoveTaskMenu,
  handleEditTaskMenu,
  handleCompleteTaskMenu,
} from "./handlers";

let rl: readline.Interface;

/* Main entrypoint - this should only be executed once */
export const displayMenu = async () => {
  rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  let quit = false;
  while (!quit) {
    renderer.out("");
    renderMainMenu();
    const selection = await rl.question(chalk.blue("Enter Selection: "));
    renderer.out("");
    switch (selection) {
      case "1":
        renderTasksMenu();
        break;
      case "2":
        await handleAddTaskMenu(rl);
        break;
      case "3":
        await handleRemoveTaskMenu(rl);
        break;
      case "4":
        await handleEditTaskMenu(rl);
        break;
      case "5":
        await handleCompleteTaskMenu(rl);
        break;
      case "q":
        quit = true;
        break;
      default:
    }
  }
  rl.close();
};
