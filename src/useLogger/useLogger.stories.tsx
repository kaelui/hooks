import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";
import { useLogger } from "./useLogger";

const meta = {
  title: "useLogger",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const [count, setCount] = useState(0);
    useLogger("Demo", [{ count, hello: "world" }]);
    return (
      <button
        onClick={() => {
          const nextCount = count + 1;
          action("Demo")({ count: nextCount, hello: "world" });
          setCount(nextCount);
        }}
      >
        Update count ({count})
      </button>
    );
  },
};
