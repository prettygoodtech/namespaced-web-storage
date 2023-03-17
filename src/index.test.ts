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

test.serial("NamespacedStorage - constructor", (t) => {
  t.notThrows(() => new NamespacedStorage(t.context.storage, "foo"));
});

test.serial("NamespacedStorage - setItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  nsStorage.setItem("user-id", "1234");

  t.is(t.context.storage.getItem("foo:user-id"), "1234");
});

test.serial("NamespacedStorage - getItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("user-id", "5678");

  t.is(nsStorage.getItem("user-id"), "1234");
});

test.serial("NamespacedStorage - removeItem", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("user-id", "5678");

  nsStorage.removeItem("user-id");

  t.is(t.context.storage.getItem("foo:user-id"), null);
  t.is(t.context.storage.getItem("user-id"), "5678");
});

test.serial("NamespacedStorage - clear", (t) => {
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

test.serial("NamespacedStorage - length", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("foo:preferred-theme", "dark");
  t.context.storage.setItem("user-id", "5678");

  t.is(nsStorage.length, 2);
});

test.serial("NamespacedStorage - key", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user-id", "1234"); // idx 0, ns_idx 0
  t.context.storage.setItem("user-id", "5678"); // idx 1, ns_idx -
  t.context.storage.setItem("foo:preferred-theme", "dark"); // idx 2, ns_idx 1

  t.is(nsStorage.key(0), "user-id");
  t.is(nsStorage.key(1), "preferred-theme");
});

test.serial("NamespacedStorage - dot notation - assignment", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  nsStorage.user_id = "1234";

  t.is(t.context.storage.getItem("foo:user_id"), "1234");
});

test.serial(
  "NamespacedStorage - dot notation - don't overwrite methods",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");

    // @ts-ignore, TypeScript already prevents overwriting methods because of type
    // mismatch, but a test is necessary for plain JS use.
    nsStorage.setItem = "1234";

    t.is(typeof nsStorage.setItem, "function");
  }
);

test.serial("NamespacedStorage - dot notation - access key/value pair", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user_id", "5678");

  t.is(nsStorage.user_id, "5678");
});

test.serial("NamespacedStorage - dot notation - access storage method", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.is(typeof nsStorage.setItem, "function");
});

test.serial("NamespacedStorage - dot notation - delete key/value pair", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  t.context.storage.setItem("foo:user_id", "5678");

  // Check key/value pair is actually available
  t.is(nsStorage.user_id, "5678");
  delete nsStorage.user_id;
  t.is(nsStorage.user_id, null);
});

test.serial(
  "NamespacedStorage - dot notation - don't delete storage method",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");

    // @ts-ignore, TypeScript already prevents deleting explicitly defined,
    // non-optional properties, but a test is necessary for plain JS use.
    delete nsStorage.setItem;
    t.is(typeof nsStorage.setItem, "function");
  }
);

test.serial("NamespacedStorage - bracket notation - assignment", (t) => {
  const nsStorage = new NamespacedStorage(t.context.storage, "foo");
  nsStorage["user_id"] = "1234";

  t.is(t.context.storage.getItem("foo:user_id"), "1234");
});

test.serial(
  "NamespacedStorage - bracket notation - don't overwrite methods",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");

    // @ts-ignore, TypeScript already prevents overwriting methods because of type
    // mismatch, but a test is necessary for plain JS use.
    nsStorage["setItem"] = "1234";

    t.is(typeof nsStorage["setItem"], "function");
  }
);

test.serial(
  "NamespacedStorage - bracket notation - access key/value pair",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");
    t.context.storage.setItem("foo:user_id", "5678");

    t.is(nsStorage["user_id"], "5678");
  }
);

test.serial(
  "NamespacedStorage - bracket notation - access storage method",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");

    t.is(typeof nsStorage["setItem"], "function");
  }
);

test.serial(
  "NamespacedStorage - bracket notation - delete key/value pair",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");
    t.context.storage.setItem("foo:user_id", "5678");

    // Check key/value pair is actually available
    t.is(nsStorage["user_id"], "5678");
    delete nsStorage["user_id"];
    t.is(nsStorage["user_id"], null);
  }
);

test.serial(
  "NamespacedStorage - bracket notation - don't delete storage method",
  (t) => {
    const nsStorage = new NamespacedStorage(t.context.storage, "foo");

    // @ts-ignore, TypeScript already prevents deleting explicitly defined,
    // non-optional properties, but a test is necessary for plain JS use.
    delete nsStorage["setItem"];
    t.is(typeof nsStorage["setItem"], "function");
  }
);

test.serial("NamespacedStorage - Object.keys", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.keys(nsStorage), ["user-id", "preferred-theme"]);
});

test.serial("NamespacedStorage - Object.values", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.values(nsStorage), ["1234", "dark"]);
});

test.serial("NamespacedStorage - Object.entries", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.entries(nsStorage), [
    ["user-id", "1234"],
    ["preferred-theme", "dark"],
  ]);
});

test.serial("NamespacedStorage - Object.getOwnPropertyNames", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.getOwnPropertyNames(nsStorage), [
    "user-id",
    "preferred-theme",
  ]);
});

test.serial("NamespacedStorage - Object.getOwnPropertyDescriptor", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.getOwnPropertyDescriptor(nsStorage, "preferred-theme"), {
    configurable: true,
    enumerable: true,
    value: "dark",
    writable: true,
  });
});

test.serial("NamespacedStorage - Object.getOwnPropertyDescriptors", (t) => {
  t.context.storage.setItem("foo:user-id", "1234");
  t.context.storage.setItem("banner-closed", "true");
  t.context.storage.setItem("foo:preferred-theme", "dark");

  const nsStorage = new NamespacedStorage(t.context.storage, "foo");

  t.deepEqual(Object.getOwnPropertyDescriptors(nsStorage), {
    "user-id": {
      configurable: true,
      enumerable: true,
      value: "1234",
      writable: true,
    },
    "preferred-theme": {
      configurable: true,
      enumerable: true,
      value: "dark",
      writable: true,
    },
  });
});
