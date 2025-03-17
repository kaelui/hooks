import type { Meta, StoryObj } from "@storybook/react";
import { useResizeObserver } from "./useResizeObserver";

const meta = {
  title: "useResizeObserver",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const [ref, rect] = useResizeObserver<HTMLDivElement>();

    return (
      <div
        ref={ref}
        style={{
          border: "1px solid #ccc",
          resize: "both",
          overflow: "auto",
          padding: "20px",
        }}
      >
        <p>Resize this box using the corner handle</p>
        <pre>{JSON.stringify(rect, null, 2)}</pre>
      </div>
    );
  },
};
