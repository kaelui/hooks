# React Hooks

[![CI](https://github.com/kaelui/hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/ci.yml)
[![Deploy Storybook](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml)
[![codecov](https://codecov.io/gh/kaelui/hooks/branch/main/graph/badge.svg)](https://codecov.io/gh/kaelui/hooks)

This library provides a set of custom React hooks that help simplify common patterns and interactions in React applications. These hooks aim to improve code reusability, readability, and maintainability.

## 📦 Install

> **Note**: This package is currently only available via GitHub Packages.

### Setting up GitHub Packages access

1. Generate a GitHub personal access token with `read:packages` scope:
   - Go to GitHub Settings → [Personal Access Tokens](https://github.com/settings/tokens)
   - Generate a new token with at least the `read:packages` permission
   - Copy the token value

2. Create or update your `.npmrc` file in your project root or home directory:

```
@kaelui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

3. Install the package:

```bash
pnpm add @kaelui/hooks
```

## 🪝 Available Hooks

- [useDisclosure](https://kaelui.github.io/hooks/?path=/docs/usedisclosure--docs/): manages disclosure state (open/closed).
- [useResizeObserver](https://kaelui.github.io/hooks/?path=/docs/useresizeobserver--docs/): uses `ResizeObserver` to track changes in element dimensions.
- [useMediaQuery](https://kaelui.github.io/hooks/?path=/docs/usemediaquery--docs/): subscribe and respond to media query changes.
- [useMounted](https://kaelui.github.io/hooks/?path=/docs/usemounted--docs/): returns `true` if component is mounted.
- [useDidUpdate](https://kaelui.github.io/hooks/?path=/docs/usedidupdate--docs/): executes a callback function when dependencies change, but skips the initial mount effect.
- [useLogger](https://kaelui.github.io/hooks/?path=/docs/uselogger--docs/): automatically logs specified values to the console on each component render for debugging.
- [useWindowEvent](https://kaelui.github.io/hooks/?path=/docs/usewindowevent--docs/): adds an event listener to the window object.
- [useReducedMotion](https://kaelui.github.io/hooks/?path=/docs/usereducedmotion--docs/): detects if the user has requested reduced motion.
- [useScrollIntoView](https://kaelui.github.io/hooks/?path=/docs/usescrollintoview--docs/): smoothly scrolls an element into view with customizable animation, alignment, and other options.
- [useLongPress](https://kaelui.github.io/hooks/?path=/docs/uselongpress--docs/): detects long press gestures on mouse and touch events with customizable threshold and callbacks.

## 🧑🏽‍💻 Development

### Creating a New Hook

To create a new hook with all the required files, run:

```bash
pnpm create-hook
```

This will prompt you for a hook name and description, then automatically generate necessary files.

## License

MIT
