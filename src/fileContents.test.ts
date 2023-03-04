import { getFileContent } from './fileContents';
import yaml from 'js-yaml';

describe('getFileContent', () => {
  const mockContent = `# This is a test file

  This file is used for testing getFileContent function.

  - Item 1
  - Item 2`;

  const expectedOutput = `---
link: "${document.URL}"
title: "My Test File"
timestamp: "3/4/2023"
domain: "localhost"
excerpt: "This file is used for testing getFileContent function."
word_count: "102"
status: "unread"
---
# Test Tag

\\# This is a test file This file is used for testing getFileContent function. - Item 1 - Item 2`;

  it('returns file content with correct YAML metadata', () => {
    const tag = '# Test Tag';
    const title = 'My Test File';
    const excerpt = 'This file is used for testing getFileContent function.';
    const length = 102;

    const result = getFileContent(tag, title, mockContent, excerpt, length);

    expect(result).toEqual(expectedOutput);
    yaml.load(extractYaml(result) || '');
  });
});

function extractYaml(str: string) {
  const start = str.indexOf('---');
  const end = str.indexOf('---', start + 3);

  if (start !== -1 && end !== -1) {
    return str.slice(start + 3, end).trim();
  } else {
    return null;
  }
}
