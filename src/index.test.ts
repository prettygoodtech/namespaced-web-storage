/*
 * Copyright 2023 Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import anyTest, { TestFn } from "ava";
import { NamespacedStorage } from "./index.js";
import StorageShim from "node-storage-shim";

type TestContext = {
  storage: Storage;
};

const test = anyTest as TestFn<TestContext>;

test.before((t) => {
  t.context.storage = new StorageShim();
});

test.beforeEach((t) => {
  t.context.storage.clear();
});

test("NamespacedStorage - constructor", (t) => {
  t.notThrows(() => new NamespacedStorage(t.context.storage, "foo"));
});

test("NamespacedStorage - setItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  nsStorage.setItem("user-id", "1234");

  t.is(t.context.storage.getItem("foo:user-id"), "1234");
});

test("NamespacedStorage - getItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("user-id", "5678");

  t.is(nsStorage.getItem("user-id"), "1234");
});

test("NamespacedStorage - removeItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("user-id", "5678");

  nsStorage.removeItem("user-id");

  t.is(t.context.storage.getItem("foo:user-id"), null);
  t.is(t.context.storage.getItem("user-id"), "5678");
});

test("NamespacedStorage - clear", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("foo:preferred-theme", "dark");
  t.context.storage.setItem("user-id", "5678");

  nsStorage.clear();

  t.is(t.context.storage.getItem("foo:user-id"), null);
  t.is(t.context.storage.getItem("foo:preferred-theme"), null);
  t.is(nsStorage.length, 0);
  t.is(t.context.storage.getItem("user-id"), "5678");
});

test("NamespacedStorage - length", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("foo:preferred-theme", "dark");
  t.context.storage.setItem("user-id", "5678");

  t.is(nsStorage.length, 2);
});

test("NamespacedStorage - key", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234"); // idx 0, ns_idx 0
  t.context.storage.setItem("user-id", "5678"); // idx 1, ns_idx -
  t.context.storage.setItem("foo:preferred-theme", "dark"); // idx 2, ns_idx 1

  t.is(nsStorage.key(0), "user-id");
  t.is(nsStorage.key(1), "preferred-theme");
});
