# Contributing Guidelines
Thank you for your interest in contributing to Namespaced Web Storage.

This project is still in its infancy, so there are many ways in which you can
contribute, even beyond writing code.

## Code of Conduct
This project has adopted the [Contributor Covenant Code of Conduct][code_of_conduct].
If you are unfamiliar with it, please give it a read before contributing.

## Security and Vulnerabilities
If you have found a vulnerability, please refer to [SECURITY][security] for
instructions.

## Contributing Code
### What You'll Need
- [A bug or feature you want to work on][issues_help_wanted]. Avoid working on
something that is not already discussed and documented as a GitHub Issue.
- Node.js LTS v16 or newer.
- An editor, ideally one with good support for TypeScript, like [VS Code][vs_code].

### Get Started
1. [Make a fork of the project][fork].
2. Clone your fork.
3. Install the dependencies with `npm install`.
4. Run tests to make sure the setup so far works as expected:
   1. Run `npm start build`, then
   2. Run `npm test`. All tests should pass.
5. Create a work branch off of `main`.
6. Make your changes and commit them.
7. Push your work branch to your fork.
8. Once you are satisfied with your changes, open a pull request.
9. Wait for a review from the maintainers.

### Design
#### ES Modules
This project supports only ES modules and does not plan to add support for
CommonJS. However, the project is designed in a way to also target Node.js, for
the few scenarios where one might need to use the Web Storage API in such an
environment (e.g. isomorphic behaviour, or unit tests on `localStorage`), with
the caveat that it is limited to Node.js projects that use the ECMAScript
modules loader.

### Conventions
This project uses a combination of [Husky][husky], [lint-staged][lint_staged],
and [Prettier][prettier] to automatically format staged files just before
committing them. This ensures that the code stay consistently formatted without
any additional developer input or thought.

### npm Scripts
#### `prebuild`
This script will remove any existing build artifact directories. Currently,
these are `lib` and `types`.

You can run this script explicitly like any other
npm script, however, you will rarely need to. Instead, it is meant to be run
automatically before `build` in order to always have a clean build with no
leftover artifacts from previous builds.

#### `build`
This script will use the TypeScript compiler `tsc` to transpile the TypeScript
source code to usable JavaScript.

This script will implicitly trigger the `prebuild` script to run before itself.

You might need to run `build` before running `test` if there are no build
artifacts.

#### `test`
This script will use [AVA][ava] to run unit tests. However, AVA runs on the
transpiled code in `lib`. If you have no build artifacts (e.g. you just cloned
the repository), AVA will throw an exception. Additionally, you should `build`
often, otherwise you risk of running tests on stale code or even state tests.

As a rule of thumb, always run `build` before `test`.

#### `prepare`
This is a [lifecycle script][npm_lifecycle_scripts] necessary for [Husky][husky]
to work properly. You'll probably never need to run this directly. 

### License
By contributing your code, you agree to license your contribution under the
Apache License, Version 2.0 (the "License"). A copy of the License is included
with this project at [LICENSE][license_local]. Alternatively, you may obtain a
copy of the License at [https://www.apache.org/licenses/LICENSE-2.0][license_upstream].

[fork]: https://github.com/prettygoodtech/namespaced-web-storage/fork
[vs_code]: https://code.visualstudio.com/
[issues_help_wanted]: https://github.com/prettygoodtech/namespaced-web-storage/labels/help%20wanted
[ava]: https://github.com/avajs/ava
[husky]: https://github.com/typicode/husky
[lint_staged]: https://github.com/okonet/lint-staged
[prettier]: https://prettier.io/
[npm_lifecycle_scripts]: https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-scripts
[code_of_conduct]: CODE_OF_CONDUCT.md
[security]: SECURITY.md
[license_local]: LICENSE
[license_upstream]: https://www.apache.org/licenses/LICENSE-2.0