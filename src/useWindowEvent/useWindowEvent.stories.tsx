import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { action } from "storybook/actions";
import { useWindowEvent } from "./useWindowEvent";

const meta = {
  title: "useWindowEvent",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useWindowEvent("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    useWindowEvent("keydown", (event) => {
      if (event.key === "Escape") {
        action("keydown")({ key: "Escape" });
        console.log("Escape key pressed");
      }
    });

    return <div>Current window width: {windowWidth}px</div>;
  },
};
