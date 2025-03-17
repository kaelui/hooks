/**
 * Generates an index file template that exports the hook
 *
 * @param {string} hookDirName - The name of the hook to export
 * @returns {string} The generated index file content
 */
export const getIndexTemplate = (
  hookDirName
) => `export * from "./${hookDirName}";
`;

/**
 * Generates a React hook template file
 *
 * @param {string} hookName - The name of the hook
 * @param {string} description - The description of the hook's functionality
 * @returns {string} The generated hook file content
 */
export const getHookTemplate = (hookName, description) => `/**
 * ${description}
 *
 * @returns The ${hookName} functionality
 *
 * @example
 * const result = ${hookName}();
 */
export function ${hookName}() {
  // Add your hook logic here
}
`;

/**
 * Generates a test file template for a React hook
 *
 * @param {string} hookName - The name of the hook to test
 * @param {string} hookDirName - The name of the hook directory
 * @returns {string} The generated test file content
 */
export const getTestTemplate = (
  hookName,
  hookDirName
) => `import { renderHook } from "@testing-library/react";
import { ${hookName} } from "./${hookDirName}";

describe("${hookName}", () => {
  it("should do something correctly", () => {
    const { result } = renderHook(() => ${hookName}());
    
    expect(result.current).toBeDefined();
    // Add more assertions based on your hook's functionality
  });
  
  // Add more test cases based on your hook's functionality
});
`;

/**
 * Generates a Storybook story template for a React hook
 *
 * @param {string} hookName - The name of the hook
 * @param {string} hookDirName - The name of the hook directory
 * @returns {string} The generated story file content
 */
export const getStoryTemplate = (
  hookName,
  hookDirName
) => `import type { Meta, StoryObj } from "@storybook/react";
import { ${hookName} } from "./${hookDirName}";

const meta = {
  title: "${hookName}",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: function Render() {
    const result = ${hookName}();

    return (
      <div>
        {/* Add your story content here */}
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  },
};
`;

/**
 * Generates a MDX documentation template for a React hook
 *
 * @param {string} hookName - The name of the hook
 * @param {string} description - The description of the hook's functionality
 * @param {string} hookDirName - The name of the hook directory
 * @returns {string} The generated MDX documentation content
 */
export const getMdxTemplate = (
  hookName,
  description,
  hookDirName
) => `import { Canvas, Meta } from "@storybook/blocks";
import * as ${hookName}Story from "./${hookDirName}.stories";

<Meta of={${hookName}Story} />

# \`${hookName}\`

${description}

## Features

- Feature 1
- Feature 2
- Feature 3

## Parameters

- \`param1\` (required): Description of parameter 1
- \`param2\` (optional): Description of parameter 2

## Returns

Description of what the hook returns

## Example Usage

\`\`\`jsx
function Example() {
  const result = ${hookName}();
  
  return (
    <div>
      {/* Example usage */}
    </div>
  );
}
\`\`\`

<Canvas of={${hookName}Story.Primary} />
`;
