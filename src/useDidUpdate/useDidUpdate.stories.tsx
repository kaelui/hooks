import type { Meta, StoryObj } from "@storybook/react-vite";
import { useDidUpdate } from "./useDidUpdate";
import { useState } from "react";
import { action } from "storybook/actions";

const meta = {
  title: "useDidUpdate",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const [count, setCount] = useState(0);

    useDidUpdate(() => {
      console.log("Count changed:", count);
      action("Count changed")(count);
      // This effect runs only when count changes, not on initial render

      // You can return a cleanup function just like in useEffect
      return () => {
        console.log("Cleaning up previous effect");
        action("Cleaning up previous effect")(count);
      };
    }, [count]);

    return (
      <div>
        <p>Current count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  },
};
