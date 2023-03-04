import { yamlItem } from '../src/yaml';

describe('yamlItem', () => {
  it('returns valid yaml item', () => {
    expect(yamlItem('title', 'test')).toBe('title: "test"\n');
  });

  it('replaces all double quotes with single quotes', () => {
    expect(yamlItem('title', '"test"')).toBe('title: "\'test\'"\n');
  });

  it('replaces all line breaks with spaces', () => {
    expect(yamlItem('title', 'test\ntest')).toBe('title: "test test"\n');
  });
});
