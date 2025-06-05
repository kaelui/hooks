import type { Meta, StoryObj } from "@storybook/react-vite";
import { useReducedMotion } from "./useReducedMotion";
import { useState, useEffect } from "react";

const meta = {
  title: "useReducedMotion",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const prefersReducedMotion = useReducedMotion();
    const [position, setPosition] = useState(0);

    // Simple animation effect that moves the box back and forth
    useEffect(() => {
      if (prefersReducedMotion) return;

      const interval = setInterval(() => {
        setPosition((prev) => (prev >= 200 ? 0 : prev + 5));
      }, 50);

      return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    return (
      <div>
        <h2>useReducedMotion Example</h2>
        <p>
          This example shows how animations can be conditionally applied based
          on the user&apos;s motion preference.
        </p>

        {/* Animated box with conditional transitions */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            padding: 20,
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
            borderRadius: 8,
            color: "white",
            width: 200,
            transform: `translateX(${position}px)`,
            transition: prefersReducedMotion
              ? "none"
              : "transform 0.1s ease-out",
          }}
        >
          {prefersReducedMotion ? "Motion Reduced" : "Animated Box"}
        </div>

        <div>
          <strong>Current State:</strong>
          <pre>
            {JSON.stringify({ prefersReducedMotion, position }, null, 2)}
          </pre>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 16,
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            How to toggle prefers-reduced-motion:
          </h3>
          <h4>Chrome / Edge:</h4>
          <ol>
            <li>Open DevTools (F12 or Command+Option+I on Mac)</li>
            <li>Click the &quot;...&quot; menu in the top-right corner</li>
            <li>Select &quot;More tools&quot; → &quot;Rendering&quot;</li>
            <li>
              Scroll down to find &quot;Emulate CSS media feature
              prefers-reduced-motion&quot;
            </li>
            <li>
              Choose &quot;prefers-reduced-motion: reduce&quot; from the
              dropdown
            </li>
          </ol>

          <h4>Firefox:</h4>
          <ol>
            <li>Open DevTools (F12 or Command+Option+I on Mac)</li>
            <li>
              Click on the &quot;...&quot; menu in the top-right of DevTools
            </li>
            <li>Select &quot;Settings&quot;</li>
            <li>
              Go to &quot;Advanced settings&quot; and check &quot;Disable
              webpage animations&quot;
            </li>
          </ol>

          <h4>Safari:</h4>
          <ol>
            <li>Open Developer Tools (Command+Option+I)</li>
            <li>Go to the &quot;Develop&quot; menu in the macOS menu bar</li>
            <li>
              Select &quot;Experimental Features&quot; → &quot;CSS
              prefers-reduced-motion Media Query&quot;
            </li>
          </ol>
        </div>
      </div>
    );
  },
};
