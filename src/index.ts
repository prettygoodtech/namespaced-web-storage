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

const PREFIX_SEPARATOR = ":";

const prefixKey = (prefix: string, key: string): string => {
  return [prefix, key].join(PREFIX_SEPARATOR);
};

const removePrefixFromKey = (prefix: string, prefixedKey: string): string => {
  const prefixTotalLength = prefix.length + PREFIX_SEPARATOR.length;

  return prefixedKey.slice(prefixTotalLength);
};

const isKeyPrefixed = (key: string, prefix: string): boolean => {
  return key.startsWith(prefix + PREFIX_SEPARATOR);
};

export class NamespacedStorage implements Storage {
  /**
   * Creates a new instance of `NamespacedStorage` based on the given
   * `storage` implementation.
   *
   * All methods will operate on the given `storage` object using the given
   * `prefix` to create a namespace for keys.
   */
  constructor(private storage: Storage, private prefix: string) {}

  /** Returns the number of key/value pairs in the namespace. */
  public get length(): number {
    return this.getNamespacedEntries().length;
  }

  /**
   * Sets the given key/value pair in the namespace. If an entry with the given
   * key already exists, its value will be updated.
   */
  public setItem(key: string, value: string): void {
    return this.storage.setItem(prefixKey(this.prefix, key), value);
  }

  /**
   * Returns the current value associated with the given key in the namespace,
   * or null if the given key does not exist.
   */
  public getItem(key: string): string | null {
    return this.storage.getItem(prefixKey(this.prefix, key));
  }

  /**
   * Removes the key/value pair with the given key in the namespace, if a
   * key/value pair with the given key exists.
   */
  public removeItem(key: string): void {
    return this.storage.removeItem(prefixKey(this.prefix, key));
  }

  /**
   * Removes all key/value pairs in the namespace, if there are any.
   *
   * Key/value pairs outside the namespace are unaffected.
   */
  public clear(): void {
    this.getNamespacedEntries().forEach(([key]) =>
      this.storage.removeItem(key)
    );
  }

  /**
   * Returns the name of the nth key in the namespace. If the index does not
   * exist, null is returned.
   *
   * The order of keys for the regular Storage API is user-agent defined, so
   * it is quite unreliable. Consequently, this namespaced implementation is
   * also very unreliable. Use it at your own risk.
   */
  public key(index: number): string | null {
    const key = this.getNamespacedEntries()[index][0];
    return key ? removePrefixFromKey(this.prefix, key) : null;
  }

  private getNamespacedEntries(): [string, string | null][] {
    return Object.entries(this.storage).filter(([key]) =>
      isKeyPrefixed(key, this.prefix)
    );
  }
}