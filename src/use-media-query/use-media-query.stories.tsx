import type { Meta, StoryObj } from "@storybook/react";
import { useMediaQuery } from "./use-media-query";

const meta = {
  title: "useMediaQuery",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const isDesktop = useMediaQuery("(min-width: 834px)");

    const isPrefersDark = useMediaQuery("(prefers-color-scheme: dark)", false);

    const isLandscape = useMediaQuery("(orientation: landscape)", false, {
      getInitialValueInEffect: false,
    });

    return (
      <div>
        <p>Is desktop: {isDesktop ? "Yes" : "No"}</p>
        <p>Prefers dark: {isPrefersDark ? "Yes" : "No"}</p>
        <p>Is landscape: {isLandscape ? "Yes" : "No"}</p>
      </div>
    );
  },
};
