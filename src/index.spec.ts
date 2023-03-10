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

import test from "ava";
import { greet } from "./index.js";

test("greet - uses default value", (t) => {
  const greetMsg = greet();

  t.is(greetMsg, "Hello, World!");
});

test("greet - uses provided name", (t) => {
  const greetMsg = greet("Matt");

  t.is(greetMsg, "Hello, Matt!");
});
