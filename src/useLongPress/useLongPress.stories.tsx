import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useLongPress } from "./useLongPress";

const meta = {
  title: "useLongPress",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const [status, setStatus] = useState("Ready");
    const [longPressCount, setLongPressCount] = useState(0);

    const longPressHandlers = useLongPress(
      () => {
        setStatus("Long pressed!");
        setLongPressCount((prev) => prev + 1);
      },
      {
        threshold: 500,
        onStart: () => setStatus("Press started... hold for 500ms"),
        onFinish: () => setStatus("Press completed successfully"),
        onCancel: () => setStatus("Press cancelled - released too early"),
      }
    );

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h3>useLongPress Demo</h3>
        <p>
          Press and hold the button below for 500ms to trigger a long press.
        </p>

        <button
          {...longPressHandlers}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            userSelect: "none",
            margin: "10px 0",
          }}
        >
          Hold Me!
        </button>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Long press count:</strong> {longPressCount}
          </p>
        </div>

        <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul>
            <li>Press and hold for 500ms to trigger long press</li>
            <li>Release early to see cancel behavior</li>
            <li>Watch the status updates during interaction</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const WithCustomThreshold: Story = {
  render: function Render() {
    const [status, setStatus] = useState("Ready");
    const [threshold, setThreshold] = useState(1000);

    const longPressHandlers = useLongPress(
      () => setStatus(`Long pressed after ${threshold}ms!`),
      {
        threshold,
        onStart: () => setStatus(`Press started... hold for ${threshold}ms`),
        onCancel: () => setStatus("Cancelled - too early!"),
      }
    );

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h3>Custom Threshold Demo</h3>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="threshold"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Threshold (ms): {threshold}
          </label>
          <input
            id="threshold"
            type="range"
            min="200"
            max="3000"
            step="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ width: "300px" }}
          />
        </div>

        <button
          {...longPressHandlers}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Hold for {threshold}ms
        </button>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
      </div>
    );
  },
};

export const TouchSupport: Story = {
  render: function Render() {
    const [events, setEvents] = useState<string[]>([]);

    const addEvent = (eventType: string) => {
      setEvents((prev) => [
        ...prev.slice(-4), // Keep only last 5 events
        `${new Date().toLocaleTimeString()}: ${eventType}`,
      ]);
    };

    const longPressHandlers = useLongPress(
      () => addEvent("Long press triggered!"),
      {
        threshold: 400,
        onStart: () => addEvent("Touch/mouse started"),
        onFinish: () => addEvent("Long press finished"),
        onCancel: () => addEvent("Touch/mouse cancelled"),
      }
    );

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h3>Touch & Mouse Support</h3>
        <p>
          This demo works with both mouse and touch events. Try on a touch
          device!
        </p>

        <div
          {...longPressHandlers}
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#f8f9fa",
            border: "2px dashed #dee2e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            userSelect: "none",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>👆</div>
            <div>Touch or Click & Hold</div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>Event Log:</h4>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "14px",
              minHeight: "100px",
              fontFamily: "monospace",
            }}
          >
            {events.length === 0 ? (
              <em>No events yet...</em>
            ) : (
              events.map((event, index) => (
                <div key={index} style={{ marginBottom: "2px" }}>
                  {event}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setEvents([])}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Clear Log
          </button>
        </div>
      </div>
    );
  },
};
