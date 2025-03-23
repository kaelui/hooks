import type { Meta, StoryObj } from "@storybook/react";
import { useLogger } from "./useLogger";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

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
