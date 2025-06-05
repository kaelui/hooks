import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useScrollIntoView } from "./useScrollIntoView";

const meta = {
  title: "useScrollIntoView",
  component: function HookComponent() {
    return <div>Hook Component</div>; // Placeholder, actual render is in stories
  },
  parameters: {
    layout: "fullscreen", // Use fullscreen to better demonstrate scrolling
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const longContent = Array.from({ length: 50 }, (_, i) => (
  <p
    key={i}
    style={{
      margin: "20px 0",
      padding: "10px",
      border: "1px dashed lightgray",
    }}
  >
    Item {i + 1}
  </p>
));

const wideContent = Array.from({ length: 30 }, (_, i) => (
  <div
    key={i}
    style={{
      display: "inline-block",
      width: "150px",
      height: "100px",
      margin: "10px",
      border: "1px dashed lightgray",
      writingMode: "vertical-lr",
      textAlign: "center",
    }}
  >
    Item {i + 1}
  </div>
));

export const BasicWindowScroll: Story = {
  render: function Render() {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
      offset: 60, // Example offset
    });

    return (
      <div style={{ padding: "20px" }}>
        <h1>Scroll Down to Find the Target</h1>
        <button onClick={() => scrollIntoView()}>
          Scroll to Target (Start)
        </button>
        <button onClick={() => scrollIntoView({ alignment: "center" })}>
          Scroll to Target (Center)
        </button>
        <button onClick={() => scrollIntoView({ alignment: "end" })}>
          Scroll to Target (End)
        </button>
        {longContent.slice(0, 25)}
        <div
          ref={targetRef}
          style={{
            marginTop: "20px",
            padding: "30px",
            border: "2px solid red",
            backgroundColor: "lightcoral",
          }}
        >
          TARGET ELEMENT
        </div>
        {longContent.slice(25)}
      </div>
    );
  },
};

export const CustomContainerScroll: Story = {
  render: function Render() {
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
      HTMLDivElement,
      HTMLDivElement
    >({
      duration: 800,
      offset: 20,
    });

    return (
      <div style={{ padding: "20px" }}>
        <h1>Custom Container Scrolling</h1>
        <p>The scrolling happens inside a fixed height container</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button onClick={() => scrollIntoView()}>
            Scroll to Target (Start)
          </button>
          <button onClick={() => scrollIntoView({ alignment: "center" })}>
            Scroll to Target (Center)
          </button>
          <button onClick={() => scrollIntoView({ alignment: "end" })}>
            Scroll to Target (End)
          </button>
        </div>

        <div
          ref={scrollableRef}
          style={{
            height: "400px",
            overflow: "auto",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {longContent.slice(0, 15)}
          <div
            ref={targetRef}
            style={{
              padding: "30px",
              border: "2px solid red",
              backgroundColor: "lightcoral",
              margin: "30px 0",
            }}
          >
            TARGET ELEMENT
          </div>
          {longContent.slice(15, 30)}
        </div>
      </div>
    );
  },
};

export const HorizontalScrolling: Story = {
  render: function Render() {
    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
      HTMLDivElement,
      HTMLDivElement
    >({
      axis: "x",
      offset: 20,
      duration: 1000,
    });

    return (
      <div style={{ padding: "20px" }}>
        <h1>Horizontal Scrolling</h1>
        <p>Scroll horizontally to view the target element</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button onClick={() => scrollIntoView()}>
            Scroll to Target (Start)
          </button>
          <button onClick={() => scrollIntoView({ alignment: "center" })}>
            Scroll to Target (Center)
          </button>
          <button onClick={() => scrollIntoView({ alignment: "end" })}>
            Scroll to Target (End)
          </button>
        </div>

        <div
          ref={scrollableRef}
          style={{
            whiteSpace: "nowrap",
            overflow: "auto",
            padding: "20px",
            border: "1px solid #ccc",
          }}
        >
          {wideContent.slice(0, 10)}
          <div
            ref={targetRef}
            style={{
              display: "inline-block",
              width: "200px",
              height: "150px",
              margin: "10px",
              border: "2px solid red",
              backgroundColor: "lightcoral",
              textAlign: "center",
              lineHeight: "150px",
            }}
          >
            TARGET ELEMENT
          </div>
          {wideContent.slice(10, 20)}
        </div>
      </div>
    );
  },
};

export const MultipleTargets: Story = {
  render: function Render() {
    const target1 = useScrollIntoView<HTMLDivElement>({
      offset: 50,
      duration: 800,
    });

    const target2 = useScrollIntoView<HTMLDivElement>({
      offset: 50,
      duration: 800,
    });

    const target3 = useScrollIntoView<HTMLDivElement>({
      offset: 50,
      duration: 800,
    });

    return (
      <div style={{ padding: "20px" }}>
        <h1>Multiple Scroll Targets</h1>
        <div
          style={{
            position: "sticky",
            top: 0,
            padding: "10px",
            backgroundColor: "white",
            zIndex: 10,
            borderBottom: "1px solid #eee",
          }}
        >
          <button
            onClick={() => target1.scrollIntoView()}
            style={{ margin: "0 10px" }}
          >
            Scroll to Target 1
          </button>
          <button
            onClick={() => target2.scrollIntoView()}
            style={{ margin: "0 10px" }}
          >
            Scroll to Target 2
          </button>
          <button
            onClick={() => target3.scrollIntoView()}
            style={{ margin: "0 10px" }}
          >
            Scroll to Target 3
          </button>
        </div>

        {longContent.slice(0, 10)}
        <div
          ref={target1.targetRef}
          style={{
            padding: "20px",
            border: "2px solid blue",
            backgroundColor: "lightblue",
            margin: "20px 0",
          }}
        >
          TARGET 1
        </div>

        {longContent.slice(10, 20)}
        <div
          ref={target2.targetRef}
          style={{
            padding: "20px",
            border: "2px solid green",
            backgroundColor: "lightgreen",
            margin: "20px 0",
          }}
        >
          TARGET 2
        </div>

        {longContent.slice(20, 30)}
        <div
          ref={target3.targetRef}
          style={{
            padding: "20px",
            border: "2px solid purple",
            backgroundColor: "lavender",
            margin: "20px 0",
          }}
        >
          TARGET 3
        </div>

        {longContent.slice(30, 40)}
      </div>
    );
  },
};

export const ConfigurableDemo: Story = {
  render: function Render() {
    const [duration, setDuration] = useState(1000);
    const [offset, setOffset] = useState(50);
    const [axis, setAxis] = useState<"x" | "y">("y");

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
      HTMLDivElement,
      HTMLDivElement
    >({
      duration,
      offset,
      axis,
      onScrollFinish: () => console.log("Scroll finished!"),
    });

    return (
      <div style={{ padding: "20px" }}>
        <h1>Configurable Scroll Demo</h1>
        <div style={{ marginBottom: "20px" }}>
          <div>
            <label>
              Duration (ms):
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              {duration}ms
            </label>
          </div>

          <div>
            <label>
              Offset (px):
              <input
                type="range"
                min="0"
                max="200"
                value={offset}
                onChange={(e) => setOffset(Number(e.target.value))}
              />
              {offset}px
            </label>
          </div>

          <div>
            <label>
              Axis:
              <select
                value={axis}
                onChange={(e) => setAxis(e.target.value as "x" | "y")}
              >
                <option value="y">Vertical (y)</option>
                <option value="x">Horizontal (x)</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => scrollIntoView()}
              style={{ marginRight: "10px" }}
            >
              Scroll to Target (Start)
            </button>
            <button
              onClick={() => scrollIntoView({ alignment: "center" })}
              style={{ marginRight: "10px" }}
            >
              Scroll to Target (Center)
            </button>
            <button onClick={() => scrollIntoView({ alignment: "end" })}>
              Scroll to Target (End)
            </button>
          </div>
        </div>

        <div
          ref={scrollableRef}
          style={{
            height: axis === "y" ? "400px" : "200px",
            width: "100%",
            overflow: "auto",
            border: "1px solid #ccc",
            whiteSpace: axis === "x" ? "nowrap" : "normal",
            padding: "10px",
          }}
        >
          {axis === "y" ? (
            <>
              {longContent.slice(0, 15)}
              <div
                ref={targetRef}
                style={{
                  padding: "30px",
                  border: "2px solid red",
                  backgroundColor: "lightcoral",
                  margin: "30px 0",
                }}
              >
                TARGET ELEMENT
              </div>
              {longContent.slice(15, 30)}
            </>
          ) : (
            <>
              {wideContent.slice(0, 10)}
              <div
                ref={targetRef}
                style={{
                  display: "inline-block",
                  width: "200px",
                  height: "150px",
                  margin: "10px",
                  border: "2px solid red",
                  backgroundColor: "lightcoral",
                  textAlign: "center",
                  lineHeight: "150px",
                }}
              >
                TARGET ELEMENT
              </div>
              {wideContent.slice(10, 20)}
            </>
          )}
        </div>
      </div>
    );
  },
};
