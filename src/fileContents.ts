import { yamlItem } from './yaml';
import Turndown from 'turndown';

export type Metadata =
  | 'link'
  | 'title'
  | 'timestamp'
  | 'domain'
  | 'excerpt'
  | 'word_count'
  | 'status';

export type Option =
  | 'include_domain'
  | 'include_excerpt'
  | 'include_link'
  | 'include_status'
  | 'include_timestamp'
  | 'include_title'
  | 'include_word_count';

export type MetadataOrOption =
  | Metadata
  | Option

export type Config = {
  [K in MetadataOrOption]: K extends Option ? boolean : string;
};

type FileContents = {
  tag: string;
  title: string;
  content: string;
  excerpt: string;
  length: number;
};

export function getFileContent(
  { tag, title, content, excerpt, length }: FileContents,
  config: Partial<Config>
) {
  const markdownBody = new Turndown({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
  }).turndown(content);

  const tagContent = tag ?? '';

  return (
    '---' +
    '\n' +
    yamlItemOrEmpty(config.link, document.URL, config.include_link) +
    yamlItemOrEmpty(config.title, title, config.include_title) +
    yamlItemOrEmpty(
      config.timestamp,
      new Intl.DateTimeFormat('en-US').format(new Date()),
      config.include_timestamp
    ) +
    yamlItemOrEmpty(config.domain, window.location.hostname, config.include_domain) +
    yamlItemOrEmpty(config.excerpt, excerpt, config.include_excerpt) +
    yamlItemOrEmpty(config.word_count, length.toString(), config.include_word_count) +
    yamlItemOrEmpty(config.status, 'unread', config.include_status) +
    '---' +
    '\n' +
    tagContent +
    '\n\n' +
    markdownBody
  );
}

function yamlItemOrEmpty(item: string | undefined, value: string, include = false) {
  if (!include || !item) {
    return '';
  }
  return yamlItem(item, value)
}
