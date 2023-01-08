'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
import { Readability } from '@mozilla/readability';
import Turndown from 'turndown'

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

/* Optional vault name */
const vault = 'Zettelkasten';

/* Optional folder name such as "Clippings/" */
const folder = 'links/';

/* Optional tags  */
const tags = '#clippings';

function getFileName(fileName: string) {
  const platform = window.navigator.platform,
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

  if (windowsPlatforms.indexOf(platform) !== -1) {
    fileName = fileName.replace(':', '').replace(/[/\\?%*|"<>]/g, '-');
  } else {
    fileName = fileName
      .replace(':', '')
      .replace(/\//g, '-')
      .replace(/\\/g, '-');
  }
  return fileName;
}

console.log("Parsing document")
const parsedDocument = new Readability(document.cloneNode(true) as Document).parse();

if (!parsedDocument) {
  throw new Error("Couldn't parse web page content");
}

const { title, content, excerpt, length } = parsedDocument;

const markdownBody = new Turndown({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
}).turndown(content);

const fileContent =
    "---" + "\n"	
    + "link: "  + `"${document.URL}"` + "\n"
    + "title: " + `"${title}"` + "\n"
    + "timestamp: " + `"${new Intl.DateTimeFormat('en-US').format(new Date())}"` + "\n"
    + "domain: " + `"${window.location.hostname}"` + "\n"
    + "excerpt: " + `"${excerpt}"` + "\n"
    + "word_count: " + `"${length}"` + "\n"
    + "status: " + "unread\n"
    + "---" + "\n"
    + tags + "\n\n"
    + markdownBody;

document.location.href =
  "obsidian://new?" +
  "file=" +
  encodeURIComponent(folder + getFileName(title)) +
  "&content=" +
  encodeURIComponent(fileContent) +
  "&vault=" + encodeURIComponent(`${vault}`);
