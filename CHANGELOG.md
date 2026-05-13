# Changelog

All notable changes to HeroUI Vue are documented here.

## Unreleased

## 0.0.4

### Fixed

- Restored runtime Tailwind theme variables for the published styles entrypoint.
- Aligned runtime theme aliases with upstream HeroUI selectors for `.light`, `.default`, `.dark`, and `[data-theme]`.
- Fixed docs preview shells and the delivery/payment radio demo so dark mode uses HeroUI background and foreground tokens instead of hard-coded light backgrounds.

### Changed

- Aligned README installation docs with the upstream HeroUI Quick Start structure.
- Moved package Tailwind source scanning into the styles entrypoint so consumers do not need to configure `@source` manually.

### Packages

- `@rysinal/heroui-vue@0.0.4`
- `@rysinal/heroui-vue-styles@0.0.4`

## 0.0.3

### Added

- Added npm package README files for `@rysinal/heroui-vue` and `@rysinal/heroui-vue-styles`.
- Added changelog-based GitHub Release publishing to the npm publish workflow.
- Added package tarball checks to ensure npm README files are included before publishing.

### Changed

- Updated installation docs to install both the Vue package and companion styles package.

### Packages

- `@rysinal/heroui-vue@0.0.3`
- `@rysinal/heroui-vue-styles@0.0.3`

## 0.0.2

### Added

- Published `@rysinal/heroui-vue` and `@rysinal/heroui-vue-styles` through GitHub Actions Trusted Publishing.
- Verified the tag-triggered npm publish workflow with GitHub OIDC.

### Packages

- `@rysinal/heroui-vue@0.0.2`
- `@rysinal/heroui-vue-styles@0.0.2`

## 0.0.1

### Added

- Published the initial npm versions of the Vue component package and styles package.
- Added package metadata, npm export maps, and npm Trusted Publishing setup.

### Packages

- `@rysinal/heroui-vue@0.0.1`
- `@rysinal/heroui-vue-styles@0.0.1`
