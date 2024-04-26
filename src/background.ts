'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    throw Error('No tab id received');
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js'],
  });
});
