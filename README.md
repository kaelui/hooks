# React Hooks

[![CI](https://github.com/kaelui/hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/ci.yml)
[![Deploy Storybook](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/kaelui/hooks/actions/workflows/deploy-storybook.yml)

This library provides a set of custom React hooks that help simplify common patterns and interactions in React applications. These hooks aim to improve code reusability, readability, and maintainability.

## 📦 Install

```bash
pnpm add @kaelui/hooks
```

## 🪝 Available Hooks

- [useDisclosure](https://kaelui.github.io/hooks/?path=/docs/usedisclosure--docs/): manages disclosure state (open/closed).
- [useResizeObserver](https://kaelui.github.io/hooks/?path=/docs/useresizeobserver--docs/): uses `ResizeObserver` to track changes in element dimensions.
- [useMediaQuery](https://kaelui.github.io/hooks/?path=/docs/usemediaquery--docs/): subscribe and respond to media query changes.

## 🧑🏽‍💻 Development

### Creating a New Hook

To create a new hook with all the required files, run:

```bash
pnpm create-hook
```

This will prompt you for a hook name and description, then automatically generate necessary files.

## License

MIT
