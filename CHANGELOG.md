# Changelog

## 0.3.0 - 2025-04-14

### 🚀 Features

- Add new hooks for window events, reduced motion, and smooth scrolling - [PR](https://github.com/kaelui/hooks/pull/1)
- feat: add useScrollIntoView hook for smooth scrolling functionality - [Commit](https://github.com/kaelui/hooks/commit/e9207c9f6e9f9b345e244779f7dcd77da9a5e1f8)
- feat: add useReducedMotion hook to detect user motion preferences - [Commit](https://github.com/kaelui/hooks/commit/99b3a1fedce39ed5d59bdc1db8ca9edbca53b5d4)
- feat: add useWindowEvent hook for window event handling - [Commit](https://github.com/kaelui/hooks/commit/652ed923dc33150ad502ffbb14fa6ed15fcc6f2a)

### 🐛 Fixes

- fix: enable task location inclusion in vitest configuration - [Commit](https://github.com/kaelui/hooks/commit/1a3b0a96870ec5d993c2ed165a7b66c2c734a009)
- fix: ensure coverage is enabled in vitest configuration - [Commit](https://github.com/kaelui/hooks/commit/9934a36180a909afa74c227666d0e5e3a636cfff)
- fix: add return type to getScrollStart function and implement unit tests for scroll position retrieval - [Commit](https://github.com/kaelui/hooks/commit/fbf0a8c68312b92173206b600ea00007d7d97804)

### 🧪 Tests

- test: add unit tests for useMediaQuery behavior in Node environment and update existing tests - [Commit](https://github.com/kaelui/hooks/commit/7a8b9486c4d5b7e0acb657d12bd327f81cb68d7a)
- test: add unit test for onScrollFinish callback in useScrollIntoView - [Commit](https://github.com/kaelui/hooks/commit/ee87de8556172bc4d91544fc7230c7857bf825f8)
- test: add unit tests for getScrollStart function in Node environment - [Commit](https://github.com/kaelui/hooks/commit/37935ccddbe550e2e95ed95910e031cb42351572)
- test: add unit tests for setScrollParam function in Node environment to ensure no errors with null parent - [Commit](https://github.com/kaelui/hooks/commit/a55d8ca8e338629f3745df3ceb8b3d645b2f5b6d)
- test: add unit tests for getRelativePosition function to validate scroll position calculations - [Commit](https://github.com/kaelui/hooks/commit/5cd2c1d8d787dbc6f2035fdd3a5e2bc741428062)
- test: add unit tests for setScrollParam function to validate scroll behavior - [Commit](https://github.com/kaelui/hooks/commit/540b6d2145f6b38121548c4a2e526df571a2367c)
- test: enhance useScrollIntoView tests with multiple alignment scenarios and offset handling - [Commit](https://github.com/kaelui/hooks/commit/711f9e643d8de68569d0bf84087fbcca0a02c3e3)

### 📝 Documentation

- docs: enhance documentation for useMediaQuery hook with detailed examples - [Commit](https://github.com/kaelui/hooks/commit/bb7d48013c43a9f8779c611357f0c445969cc5a0)
- docs: update README to include GitHub Packages access instructions - [Commit](https://github.com/kaelui/hooks/commit/6c90241ad54020feb7cd954133c6e3b86d7f9b6f)

### 🔧 Maintenance

- chore: update tsconfig to include vitest and tsup config files; remove unused Page import from vitest config - [Commit](https://github.com/kaelui/hooks/commit/fa864a45f90b37c9a8ccfa04e6a703aa21fc8223)

### 🧰 Tooling

- refactor: remove commented placeholder for additional Node-specific config in vitest configuration - [Commit](https://github.com/kaelui/hooks/commit/c0d720b509a9096622df8bf4d18bad498a7e1044)

## 0.2.3 - 2025-03-24

### 🐛 Fixes

- fix: update package.json to use wildcard for use-* paths - [Commit](https://github.com/kaelui/hooks/commit/269bbe681e8c3cf1ad8fe58963adb07a494cbbe1)

## 0.2.2 - 2025-03-23

### 🚀 Features

- feat: rename use-disclosure to useDisclosure - [Commit](https://github.com/kaelui/hooks/commit/a59ddebcce91f208cd707e0d1c7cf56ac69dad64)
- feat: rename use-media-query to useMediaQuery - [Commit](https://github.com/kaelui/hooks/commit/3539989447faf209ba03e3490cf6fcd78e0e6444)
- feat: rename use-mounted to useMounted - [Commit](https://github.com/kaelui/hooks/commit/60aa5fbda41487df50398e01e68a510e526cc606)
- feat: migrate useResizeObserver to new naming convention - [Commit](https://github.com/kaelui/hooks/commit/ff84cea24032c5e872931f49130d1e2f47f058e3)
- feat: add useLogger and useDidUpdate hooks with documentation and tests - [Commit](https://github.com/kaelui/hooks/commit/e31e4e69c65059521a0d41a1b5570307080e80a1)
- feat: add index.ts update functionality for new hook exports - [Commit](https://github.com/kaelui/hooks/commit/6c044188d588776722138e1a239005c982594db7)

### 🧰 Tooling

- refactor: simplify hook creation by removing unnecessary kebab-case conversion - [Commit](https://github.com/kaelui/hooks/commit/4025e396fe57fd7c77defa641a35167403a27888)

## 0.2.1 - 2025-03-19

### 🚀 Features

- feat: add useMounted hook export to index - [Commit](https://github.com/kaelui/hooks/commit/1449624f584377c4285484547e357242578b1257)

### 🧪 Tests

- test: enhance useResizeObserver tests for reliability and clarity - [Commit](https://github.com/kaelui/hooks/commit/c9f0f6f22f163b96af856a2d9d27220a73e95602)
- test: improve useResizeObserver tests for clarity and accuracy - [Commit](https://github.com/kaelui/hooks/commit/0fc740263a38caf7045c1b148ad8b3e653270d62)

## 0.2.0 - 2025-03-19

### 🚀 Features

- feat: add useMounted hook to track component mount status and update documentation - [Commit](https://github.com/kaelui/hooks/commit/465e65ef2123f9eb2cce342b734897b20cee81ce)
- feat: update Storybook dev port and enhance useMediaQuery initial value logic - [Commit](https://github.com/kaelui/hooks/commit/bfdad3eaf9d059f34f13cde6c65d7548015419e4)
- feat: update Storybook configuration and scripts for improved development experience - [Commit](https://github.com/kaelui/hooks/commit/d05d34e9d06b1db2ff656b1837fdcf1bb8b5b74d)
- feat: update vitest configuration to exclude test and story files from coverage - [Commit](https://github.com/kaelui/hooks/commit/ccbc6ddb9a075e2d750f5a2b3724b28ca0e17dc3)
- feat: add Codecov badge to README for coverage tracking - [Commit](https://github.com/kaelui/hooks/commit/58dbbff2c2bef52760a3e7b02e6945c4d4eb65a1)
- feat: add Playwright browser installation step in CI workflow - [Commit](https://github.com/kaelui/hooks/commit/2c10039d53a7911344227174dbdbfbcee9393277)
- feat: enhance CI workflow with coverage reporting and update pnpm version - [Commit](https://github.com/kaelui/hooks/commit/b7e15733217fdcb95f7b54277cc8bdda04e6de8f)

### 🔧 Maintenance

- chore: remove pnpm version specification in CI workflows - [Commit](https://github.com/kaelui/hooks/commit/e4690f7adaa28d255164a4b540ae04ba361e4771)
- chore: update vitest configuration and upgrade Storybook and Vitest dependencies - [Commit](https://github.com/kaelui/hooks/commit/a809a9a157a20daeb4df2309b6344f98f268f7ae)

## 0.1.0 - 2025-03-18

### 🚀 Features

- feat: update imports for consistency - [Commit](https://github.com/kaelui/hooks/commit/c3ab833b8560472ae13b12b1264f9ee77e8c5200)
- feat: update README with CI badges and add documentation for isBrowser utility - [Commit](https://github.com/kaelui/hooks/commit/880534d643800fea608ea71f53351d9d15d0cf06)
- feat: add useMediaQuery hook for media query detection and update README - [Commit](https://github.com/kaelui/hooks/commit/3a0f803898fdc9e33a2e5b005a88e40ba95037d9)
- feat: enhance hook creation script with kebab-case conversion and improved README updates - [Commit](https://github.com/kaelui/hooks/commit/2e711c75149831691abfcec79f6baa5718a2614e)
- feat: export useResizeObserver from index file - [Commit](https://github.com/kaelui/hooks/commit/8ecdd2a37b4d8bb28b8a32075d1189803b482f66)
- feat: add useResizeObserver hook for tracking element size changes - [Commit](https://github.com/kaelui/hooks/commit/ca096c175deb095db4ccdb18046b67d8110c2c6c)
- feat: add @vitest/ui dependency and update vitest configuration - [Commit](https://github.com/kaelui/hooks/commit/774c5720ee5f7cedb46dc83a30118c83fd576ba9)

### 🐛 Fixes

- fix: update commit template URLs to reflect new repository ownership - [Commit](https://github.com/kaelui/hooks/commit/bc6ee64af9057c837db02a3c22941e6df791a34d)

### 🧪 Tests

- test: enhance useDisclosure tests with onOpen and onClose callbacks - [Commit](https://github.com/kaelui/hooks/commit/588ec8bc83f56871c7858268c3b02fa57a90fd0d)

### 🧰 Tooling

- refactor: rename useResizeObserver files for consistency - [Commit](https://github.com/kaelui/hooks/commit/9ce79529c3e0aded8974fdfefa73cad9dd7fa329)

## 0.0.7 - 2025-03-17

### 🧰 Tooling

- ci: add artifact upload and download steps in workflows - [Commit](https://github.com/kaelui/hooks/commit/64949f26a79b7b4e7f5340b7d72405af14dd6c57)

## 0.0.6 - 2025-03-17

### 🐛 Fixes

- fix: update label patterns to include 'docs' for consistency - [Commit](https://github.com/kaelui/hooks/commit/a52a776ed8b506834a30705a5ff3b59b04995b43)

### 📝 Documentation

- docs: update changelog to include version history and feature details - [Commit](https://github.com/kaelui/hooks/commit/3c1ca5b8a336b8a4e4146cb5aef6917f5a22d580)

## 0.0.5 - 2025-03-17

### 🔧 Maintenance

- chore: comment out npm publish step in workflow - [Commit](https://github.com/kaelui/hooks/commit/ed936de0f38a4b9609e596236f745c75006a85ad)

## 0.0.4 - 2025-03-17

## 🚀 Features

- feat: add npm publish step to workflow - [Commit](https://github.com/kaelui/hooks/commit/d1978b4b9d80066ecf22805ecd585294e79306ee)

## 0.0.3 - 2025-03-17

## 🐛 Fixes

- fix: update permissions in publish.yml to allow id-token writing - [Commit](https://github.com/kaelui/hooks/commit/8bf59f8bb6f3c0518d3b27e4ccb896bacec1b50a)

## 0.0.2 - 2025-03-17

## 🐛 Fixes

- fix: enable publish workflow trigger in release.yml - [Commit](https://github.com/kaelui/hooks/commit/82a7d898d7a81b8685af53a0be373f5e53edcb65)

## 0.0.1 - 2025-03-17

## 🐛 Fixes

- fix: bump version to 0.0.0 and update repository URL in package.json - [Commit](https://github.com/kaelui/hooks/commit/4fe6aed601497481868be07c13b445d2d7b73b1d)

## 🔧 Maintenance

- chore: update GitHub Actions workflow to enable package publishing and adjust npm registry settings - [Commit](https://github.com/kaelui/hooks/commit/f9cd3db90fd830b8e6d1d7331e44bd7104653096)
