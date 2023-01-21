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
import { Keys, STORAGE_KEYS } from './options';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

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

function parseDocument() {
const parsedDocument = new Readability(document.cloneNode(true) as Document).parse();

if (!parsedDocument) {
  throw new Error("Couldn't parse web page content");
}

return parsedDocument;
}

function getFileContent(tag: string, title: string, content: string, excerpt: string, length: number) {

const markdownBody = new Turndown({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
}).turndown(content);

return(
    "---" + "\n"	
    + "link: "  + `"${document.URL}"` + "\n"
    + "title: " + `"${title}"` + "\n"
    + "timestamp: " + `"${new Intl.DateTimeFormat('en-US').format(new Date())}"` + "\n"
    + "domain: " + `"${window.location.hostname}"` + "\n"
    + "excerpt: " + `"${excerpt}"` + "\n"
    + "word_count: " + `"${length}"` + "\n"
    + "status: " + "unread\n"
    + "---" + "\n"
    + tag + "\n\n"
    + markdownBody)
}

function exportToObsidian(title: string, fileContent: string, vault: string, folder: string) {
document.location.href =
  "obsidian://new?" +
  "file=" +
  encodeURIComponent(folder + getFileName(title)) +
  "&content=" +
  encodeURIComponent(fileContent) +
  "&vault=" + encodeURIComponent(`${vault}`)
}

type Settings = {[key in Keys]: string}

async function getSettings() {
  return chrome.storage.sync.get(Object.values(STORAGE_KEYS)) as Promise<Settings>
}

async function main() {
  const {tag, vaultName, folder} = await getSettings()
  const {title, excerpt, content, length} = parseDocument()
  const fileContent = getFileContent(tag, title, content, excerpt, length)
  exportToObsidian(title, fileContent, vaultName, folder)
}

main()
