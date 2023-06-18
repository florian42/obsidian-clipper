import {Config, getFileContent} from './fileContents';
import yaml from 'js-yaml';

describe('getFileContent', () => {
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('March 4, 2023 11:13:00') });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns file content with correct YAML metadata', () => {
    const tag = '# Test Tag';
    const title = 'My Test File';
    const excerpt = 'This file is used for testing getFileContent function.';
    const length = 102;

    const defaultConfig = {
      link: 'link',
      title: 'title',
      timestamp: 'timestamp',
      domain: 'domain',
      excerpt: 'excerpt',
      word_count: 'word_count',
      status: 'status',
      include_status: true,
      include_title: true,
      include_link: true,
      include_timestamp: true,
      include_domain: true,
      include_excerpt: true,
      include_word_count: true,
    };

    const result = getFileContent(
      {
        tag,
        title,
        content: mockContent,
        excerpt,
        length,
      },
      defaultConfig
    );

    expect(result).toEqual(expectedOutput);
    yaml.load(extractYaml(result) || '');
  });

  it('returns file content with renamed YAML metadata', () => {
    const tag = '# Test Tag';
    const title = 'My Test File';
    const excerpt = 'This file is used for testing getFileContent function.';
    const length = 102;

    const customConfig = {
      link: 'url',
      title: 'headline',
      timestamp: 'time',
      domain: 'source',
      excerpt: 'summary',
      word_count: 'words',
      status: 'read_sta',
      include_status: true,
      include_title: true,
      include_link: true,
      include_timestamp: true,
      include_domain: true,
      include_excerpt: true,
      include_word_count: true,
    };

    const result = getFileContent(
      {
        tag,
        title,
        content: '',
        excerpt,
        length,
      },
      customConfig
    );

    expect(result).toEqual(expectedOutputRenamed);
    yaml.load(extractYaml(result) || '');
  });

  it('skips fields to exclude from file', () => {
    const tag = '# Test Tag';
    const title = 'My Test File';
    const excerpt = 'This file is used for testing getFileContent function.';
    const length = 102;

    const customConfig: Config = {
      link: 'link',
      title: 'title',
      timestamp: 'timestamp',
      domain: 'domain',
      excerpt: 'excerpt',
      word_count: 'word_count',
      status: 'status',
      include_status: false,
      include_title: true,
      include_link: true,
      include_timestamp: false,
      include_domain: false,
      include_excerpt: false,
      include_word_count: false,
    };

    const result = getFileContent(
      {
        tag,
        title,
        content: '',
        excerpt,
        length,
      },
      customConfig
    );

    expect(result).toEqual(expectedOutputSkipped);
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

const expectedOutputRenamed = `---
url: "${document.URL}"
headline: "My Test File"
time: "3/4/2023"
source: "localhost"
summary: "This file is used for testing getFileContent function."
words: "102"
read_sta: "unread"
---
# Test Tag

`;

const expectedOutputSkipped = `---
link: "${document.URL}"
title: "My Test File"
---
# Test Tag

`;
