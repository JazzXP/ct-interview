import test, { beforeEach } from "node:test";
import { v4 as uuid } from "uuid";

import {
  addTask,
  allTasks,
  clear,
  completeTask,
  getTask,
  removeTask,
  updateTask,
} from "./tasklist";
import { createTask } from "../task/task";
import assert from "node:assert/strict";

beforeEach(() => {
  clear();
});

test("Can clear tasks", () => {
  addTask(createTask("Test Title", "Test Description"));
  assert.strictEqual(allTasks().length, 1);
  clear();
  assert.strictEqual(allTasks().length, 0);
});

test("Can add a task", () => {
  addTask(createTask("Test Title", "Test Description"));
  assert.strictEqual(allTasks().length, 1);
  const task = getTask(0);
  assert.strictEqual(task?.title, "Test Title");
  assert.strictEqual(task?.description, "Test Description");
});

test("Can remove a task", () => {
  addTask(createTask("Test Title 1", "Test Description 1"));
  addTask(createTask("Test Title 2", "Test Description 2"));
  addTask(createTask("Test Title 3", "Test Description 3"));
  assert.strictEqual(allTasks().length, 3);
  const result = removeTask(1);
  assert.strictEqual(result, true);
  assert.strictEqual(allTasks().length, 2);
  assert.strictEqual(getTask(0)?.title, "Test Title 1");
  assert.strictEqual(getTask(1)?.title, "Test Title 3");
});

test("Can update a task when incomplete", () => {
  addTask(createTask("Test Title", "Test Description"));
  assert.strictEqual(allTasks().length, 1);
  const task = { ...getTask(0)! };
  task.title = "New Title";
  updateTask(task);
  const taskUpdated = getTask(0);
  assert.strictEqual(taskUpdated?.title, "New Title");
  assert.strictEqual(taskUpdated?.description, "Test Description");
  assert.strictEqual(taskUpdated?.complete, false);
});

test("Can update a task when complete", () => {
  addTask({ ...createTask("Test Title", "Test Description"), complete: true });
  assert.strictEqual(allTasks().length, 1);
  const task = { ...getTask(0)! };
  task.title = "New Title";
  updateTask(task);
  const taskUpdated = getTask(0);
  assert.strictEqual(taskUpdated?.title, "New Title");
  assert.strictEqual(taskUpdated?.description, "Test Description");
  assert.strictEqual(taskUpdated?.complete, true);
});
test("Can complete a task", () => {
  addTask(createTask("Test Title", "Test Description"));
  assert.strictEqual(allTasks().length, 1);
  completeTask(getTask(0)!);
  const taskUpdated = getTask(0);
  assert.strictEqual(taskUpdated?.complete, true);
});

test("Remove invalid task doesn't remove anything and returns a false result", () => {
  addTask(createTask("Test Title 1", "Test Description 1"));
  assert.strictEqual(allTasks().length, 1);
  const result = removeTask(1);
  assert.strictEqual(result, false);
  assert.strictEqual(allTasks().length, 1);
});

test("Doesn't update an invalid task", () => {
  addTask(createTask("Test Title", "Test Description"));
  assert.strictEqual(allTasks().length, 1);
  const task = {
    id: uuid(),
    title: "Invalid",
    description: "Invalid",
    complete: false,
  };
  updateTask(task);
  const taskUpdated = getTask(0);
  assert.strictEqual(taskUpdated?.title, "Test Title");
  assert.strictEqual(taskUpdated?.description, "Test Description");
  assert.strictEqual(allTasks().length, 1);
});
