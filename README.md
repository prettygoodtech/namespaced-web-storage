# Namespaced Web Storage
[![npm version][badge_npm_version]][badge_npm_version_url]
[![github_workflow][badge_build]][badge_build_url]
[![codecov][badge_codecov]][badge_codecov_url]
[![GitHub][badge_license]][license_local]

A thin wrapper to use the [Web Storage API][mdn_web_storage] with namespaces,
easily, and safely. Built with [TypeScript][typescript].

## Features
- Works with `localStorage`, `sessionStorage`, and any
[Storage][mdn_storage_interface]-compatible implementation like [node-storage-shim][node_storage_shim]
for Node.js.
- Supports `setItem`, `getItem`, `deleteItem`, `clear`, and `key` methods.
- Supports `length` property.
- Supports dot and bracket property accessors.
- Supports `Object.keys`, `Object.values`, and `Object.entries` static methods.
- Small footprint with zero dependencies.
- TypeScript declarations.

## Installation and Usage
First, install the package:

```shell
$ npm install @prettygoodtech/namespaced-web-storage
```

Now you can use `NamespacedStorage` to create a new instance based on your
[Storage][mdn_storage_interface] implementation of choice:

```javascript
import { NamespacedStorage } from "@prettygoodtech/namespaced-web-storage";

const nsStorage = new NamespacedStorage(window.localStorage, "my-prefix");

// Will store with key my-prefix:preferred-theme
nsStorage.setItem("preferred-theme", "dark");

// Will retrieve item with key my-prefix:last-accessed-on
const lastAccessedOn = nsStorage.getItem("last-accessed-on");

// Dot notation, will use key my-prefix:favorite
nsStorage.favorite = "sport-section"; 
delete nsStorage.favorite;

// Bracket notation, will use key my-prefix:favorite
nsStorage["favorite"] = "sport-section";
delete nsStorage["favorite"];
```

### Caveats
- This package is still in its infancy and some features are not available yet.
- While you can use third-party `Storage` implementations, they might not follow
the spec comprehensively. This means that any quirks they might have will still
be present when using this package, and may even lead to unexpected errors.
Your mileage may vary.

## Contributing
Please read the [Contributing Guidelines][contributing] and abide by the [Code of Conduct][code_of_conduct].

## License
Copyright 2023 Matei Bogdan Radu.

Project licensed under the Apache License, Version 2.0 (the "License"). A copy
of the License is included with this project at [LICENSE][license_local].
Alternatively, you may obtain a copy of the License at [https://www.apache.org/licenses/LICENSE-2.0][license_upstream].

[mdn_web_storage]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
[mdn_storage_interface]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[typescript]: https://www.typescriptlang.org/
[node_storage_shim]: https://github.com/mnahkies/node-storage-shim
[code_of_conduct]: CODE_OF_CONDUCT.md
[contributing]: CONTRIBUTING.md
[license_local]: LICENSE
[license_upstream]: https://www.apache.org/licenses/LICENSE-2.0
[badge_npm_version]: https://img.shields.io/npm/v/@prettygoodtech/namespaced-web-storage/latest?label=npm%20package&style=flat-square
[badge_npm_version_url]: https://www.npmjs.com/package/@prettygoodtech/namespaced-web-storage
[badge_build]: https://img.shields.io/github/actions/workflow/status/prettygoodtech/namespaced-web-storage/pr-checks.yml?branch=main&style=flat-square
[badge_build_url]: https://github.com/prettygoodtech/namespaced-web-storage/actions/workflows/pr-checks.yml?query=branch%3Amain
[badge_codecov]: https://img.shields.io/codecov/c/github/prettygoodtech/namespaced-web-storage/main?token=HFVS0CAE3G&style=flat-square
[badge_codecov_url]: https://codecov.io/gh/prettygoodtech/namespaced-web-storage
[badge_license]: https://img.shields.io/github/license/prettygoodtech/namespaced-web-storage?color=blue&style=flat-square
