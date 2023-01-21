'use strict';

import './options.css';

export const STORAGE_KEYS = {
  VAULT_NAME: "vaultName",
  FOLDER: "folder",
  TAG: "tag"
} as const

export type Keys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

function save_options() {
  const vault = (document.getElementById('vault') as HTMLInputElement).value;
  const folder = (document.getElementById('folder') as HTMLInputElement).value;
  const tag = (document.getElementById('tag') as HTMLInputElement).value;
  chrome.storage.sync.set(
    {
      [STORAGE_KEYS.VAULT_NAME]: vault,
      [STORAGE_KEYS.FOLDER]: folder,
      [STORAGE_KEYS.TAG]: tag,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      if (!status) {
        throw new Error('Cannot set status');
      }
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get((items) => {
    (document.getElementById('vault') as HTMLInputElement).value = items[STORAGE_KEYS.VAULT_NAME] || "";
    (document.getElementById('folder') as HTMLInputElement).value = items[STORAGE_KEYS.FOLDER] || "";
    (document.getElementById('tag') as HTMLInputElement).value = items[STORAGE_KEYS.TAG] || "";
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save')?.addEventListener('click', save_options);
