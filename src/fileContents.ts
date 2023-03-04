import { yamlItem } from './yaml';
import Turndown from 'turndown';

export function getFileContent(
  tag: string,
  title: string,
  content: string,
  excerpt: string,
  length: number
) {
  const markdownBody = new Turndown({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
  }).turndown(content);

  return (
    '---' +
    '\n' +
    yamlItem('link', document.URL) +
    yamlItem('title', title) +
    yamlItem('timestamp', new Intl.DateTimeFormat('en-US').format(new Date())) +
    yamlItem('domain', window.location.hostname) +
    yamlItem('excerpt', excerpt) +
    yamlItem('word_count', length.toString()) +
    yamlItem('status', 'unread') +
    '---' +
    '\n' +
    tag +
    '\n\n' +
    markdownBody
  );
}
