import test from "node:test";
import { createTask } from "./task";
import assert from "node:assert/strict";

test("Can create a task", () => {
  const t = createTask("Test Title", "Test Description");
  assert.strictEqual(t.title, "Test Title");
  assert.strictEqual(t.description, "Test Description");
});
