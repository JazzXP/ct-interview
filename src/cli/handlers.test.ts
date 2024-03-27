import test, { afterEach, beforeEach } from "node:test";
import readline from "node:readline/promises";
import {
  handleAddTaskMenu,
  handleCompleteTaskMenu,
  handleEditTaskMenu,
  handleRemoveTaskMenu,
} from "./handlers";
import assert from "assert/strict";
import { addTask, allTasks, clear, getTask } from "../tasklist/tasklist";
import { stdin, stdout } from "process";
import { createTask } from "../task/task";
import { Interface } from "readline/promises";
import { renderer } from "./renderers";

let rl: Interface;
let oldRendererOut: (message?: any, ...optionalParams: any[]) => void;
beforeEach(() => {
  // Surpress renderer output for tests
  oldRendererOut = renderer.out;
  renderer.out = () => {};
  rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  clear();
  addTask(createTask("Test Title", "Test Description"));
});

afterEach(() => {
  // Reset renderer
  renderer.out = oldRendererOut;
});

test("Can add task via menu", async () => {
  rl.question = async () => "Test";
  await handleAddTaskMenu(rl);
  assert.strictEqual(allTasks().length, 2);
  assert.strictEqual(getTask(1)?.title, "Test");
  assert.strictEqual(getTask(1)?.description, "Test");
  rl.close();
});

test("Can remove task via menu", async () => {
  rl.question = async () => "1";

  await handleRemoveTaskMenu(rl);
  assert.strictEqual(allTasks().length, 0);
  rl.close();
});

test("Shows invalid message when removing an invalid task", async () => {
  let questionNum = 0;
  rl.question = async () => ["x", "b"][questionNum++];
  renderer.out = (message) => {
    console.log(message);
    if (`${message}`.includes("Invalid Task")) {
      console.log("Blah");
      assert.strictEqual(`${message}`.includes("Invalid Task"), true);
      rl.close();
    }
  };
  await handleRemoveTaskMenu(rl);
});

test("Can edit task via menu", async () => {
  let questionNum = 0;
  rl.question = async () =>
    ["1", "New Title", "New Description"][questionNum++];
  await handleEditTaskMenu(rl);
  assert.strictEqual(getTask(0)?.title, "New Title");
  assert.strictEqual(getTask(0)?.description, "New Description");
  rl.close();
});

test("Shows invalid message when editing an invalid task", async () => {
  let questionNum = 0;
  rl.question = async () => ["x", "b"][questionNum++];
  renderer.out = (message) => {
    if (`${message}`.includes("Invalid Task")) {
      assert.strictEqual(`${message}`.includes("Invalid Task"), true);
      rl.close();
    }
  };
  await handleEditTaskMenu(rl);
});

test("Can complete task via menu", async () => {
  rl.question = async () => "1";
  await handleCompleteTaskMenu(rl);
  assert.strictEqual(getTask(0)?.complete, true);
  rl.close();
});

test("Shows invalid message when editing an invalid task", async () => {
  let questionNum = 0;
  rl.question = async () => ["x", "b"][questionNum++];
  renderer.out = (message) => {
    if (`${message}`.includes("Invalid Task")) {
      assert.strictEqual(`${message}`.includes("Invalid Task"), true);
      rl.close();
    }
  };
  await handleCompleteTaskMenu(rl);
});
