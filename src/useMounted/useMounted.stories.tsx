import type { Meta, StoryObj } from "@storybook/react";
import { useMounted } from "./useMounted";

const meta = {
  title: "useMounted",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const result = useMounted();

    return (
      <div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  },
};
