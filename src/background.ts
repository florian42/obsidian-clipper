'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    throw Error('No tab id received');
  }

  // Check for required settings
  const settings = await chrome.storage.sync.get(['vaultName']);

  if (!settings.vaultName) {
    // Configuration is missing, open options page
    chrome.runtime.openOptionsPage();
  } else {
    // Configuration exists, proceed with main functionality
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js'],
    });
  }
});
