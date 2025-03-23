# React Hooks

[![CI](https://github.com/kaelui/hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/ci.yml)
[![Deploy Storybook](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml)
[![codecov](https://codecov.io/gh/kaelui/hooks/branch/main/graph/badge.svg)](https://codecov.io/gh/kaelui/hooks)

This library provides a set of custom React hooks that help simplify common patterns and interactions in React applications. These hooks aim to improve code reusability, readability, and maintainability.

## 📦 Install

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

## 🧑🏽‍💻 Development

### Creating a New Hook

To create a new hook with all the required files, run:

```bash
pnpm create-hook
```

This will prompt you for a hook name and description, then automatically generate necessary files.

## License

MIT
