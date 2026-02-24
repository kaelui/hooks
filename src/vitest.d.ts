declare module "vitest/browser" {
  interface BrowserCommands {
    emulateReducedMotion: (
      reducedMotion: "reduce" | "no-preference" | null
    ) => Promise<void>;
  }
}

export {};
