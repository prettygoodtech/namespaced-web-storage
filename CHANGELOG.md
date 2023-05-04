# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep_a_changelog],
and this project adheres to [Semantic Versioning][semver].

## [Unreleased]

## [0.5.0] - 2023-05-04
### Added
- Assertion for `prefix` constructor argument. The constructor will now throw if
the `prefix` is not a non-empty string.

### Changed
- Upgrade `lint-staged` from `13.2.0` to `13.2.2`.
- Upgrade `prettier` from `2.8.4` to `2.8.8`.
- Upgrade `typescript` from `5.0.2` to `5.0.4`.

## [0.4.0] - 2023-03-17
### Added
- Support for the following `Object` static methods:
  - `keys`
  - `values`
  - `entries`
  - `getOwnPropertyNames`
  - `getOwnPropertyDescriptor`
  - `getOwnPropertyDescriptors`

## [0.3.0] - 2023-03-16
### Added
- "Features" section to README.
- Support for dot and bracket property accessors.

### Changed
- Upgrade `@ava/typescript` from `3.0.1` to `4.0.0`.
- Upgrade `typescript` from `5.0.1-rc` to `5.0.2`, thus switching to a stable
release.

## [0.2.1] - 2023-03-15
### Changed
- Rename test files to use `test` instead of `spec`.

### Fixed
- Include TypeScript source files in package releases. Release [0.2.0] added
source maps, but they are useless without source files.

## [0.2.0] - 2023-03-14
### Added
- Source maps are now generated and included.

### Changed
- Improve README documentation:
  - Add "Installation and Usage" section
  - Add info badges at the top
- The npm script `test` will not also generate test coverage reports.

## [0.1.0] - 2023-03-13
### Added
- `NamespacedStorage` class with
  - `length`
  - `setItem`
  - `getItem`
  - `deleteItem`
  - `key`
  - `clear`

[Unreleased]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/prettygoodtech/namespaced-web-storage/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/prettygoodtech/namespaced-web-storage/compare/e61e635ae62b128ef724ee3ab981e9a935fe2c2d...v0.1.0
[keep_a_changelog]: https://keepachangelog.com/en/1.0.0/
[semver]: https://semver.org/spec/v2.0.0.html
