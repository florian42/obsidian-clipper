'use strict';

import './options.css';

document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('submit', saveOptions);

export const STORAGE_KEYS = {
  VAULT_NAME: 'vaultName',
  FOLDER: 'folder',
  TAG: 'tag',
  TITLE: 'title',
  DOMAIN: 'domain',
  EXCERPT: 'excerpt',
  LINK: 'link',
  STATUS: 'status',
  TIMESTAMP: 'timestamp',
  WORD_COUNT: 'word_count',
  INCLUDE_DOMAIN: 'include_domain',
  INCLUDE_EXCERPT: 'include_excerpt',
  INCLUDE_LINK: 'include_link',
  INCLUDE_STATUS: 'include_status',
  INCLUDE_TIMESTAMP: 'include_timestamp',
  INCLUDE_TITLE: 'include_title',
  INCLUDE_WORD_COUNT: 'include_word_count',
} as const;

export type SettingEntries = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function saveOptions(event: SubmitEvent) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const data = getFormValues(form);

  chrome.storage.sync.set(
    {
      [STORAGE_KEYS.VAULT_NAME]: sanitizeInput(data.vault),
      [STORAGE_KEYS.FOLDER]: sanitizeInput(data.folder),
      [STORAGE_KEYS.TAG]: sanitizeInput(data.tag),
      [STORAGE_KEYS.TITLE]: sanitizeInput(data.title),
      [STORAGE_KEYS.DOMAIN]: sanitizeInput(data.domain),
      [STORAGE_KEYS.EXCERPT]: sanitizeInput(data.excerpt),
      [STORAGE_KEYS.LINK]: sanitizeInput(data.link),
      [STORAGE_KEYS.STATUS]: sanitizeInput(data.status),
      [STORAGE_KEYS.TIMESTAMP]: sanitizeInput(data.timestamp),
      [STORAGE_KEYS.WORD_COUNT]: sanitizeInput(data.wordCount),
      [STORAGE_KEYS.INCLUDE_DOMAIN]: convertOnToBoolean(data['include-domain']),
      [STORAGE_KEYS.INCLUDE_EXCERPT]: convertOnToBoolean(
        data['include-excerpt']
      ),
      [STORAGE_KEYS.INCLUDE_LINK]: convertOnToBoolean(data['include-link']),
      [STORAGE_KEYS.INCLUDE_STATUS]: convertOnToBoolean(data['include-status']),
      [STORAGE_KEYS.INCLUDE_TIMESTAMP]: convertOnToBoolean(
        data['include-timestamp']
      ),
      [STORAGE_KEYS.INCLUDE_TITLE]: convertOnToBoolean(data['include-title']),
      [STORAGE_KEYS.INCLUDE_WORD_COUNT]: convertOnToBoolean(
        data['include-word-count']
      ),
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

function convertOnToBoolean(value: string | undefined): boolean {
  return value === 'on';
}

export function restoreOptions() {
  chrome.storage.sync.get((items) => {
    (document.getElementById('vault') as HTMLInputElement).value =
      items[STORAGE_KEYS.VAULT_NAME] || '';
    (document.getElementById('folder') as HTMLInputElement).value =
      items[STORAGE_KEYS.FOLDER] || '';
    (document.getElementById('tag') as HTMLInputElement).value =
      items[STORAGE_KEYS.TAG] || '';

    (document.getElementById('title') as HTMLInputElement).value =
      items[STORAGE_KEYS.TITLE] || 'title';
    (document.getElementById('domain') as HTMLInputElement).value =
      items[STORAGE_KEYS.DOMAIN] || 'domain';
    (document.getElementById('excerpt') as HTMLInputElement).value =
      items[STORAGE_KEYS.EXCERPT] || 'excerpt';
    (document.getElementById('link') as HTMLInputElement).value =
      items[STORAGE_KEYS.LINK] || 'link';
    (document.getElementById('status-input') as HTMLInputElement).value =
      items[STORAGE_KEYS.STATUS] || 'status';
    (document.getElementById('timestamp') as HTMLInputElement).value =
      items[STORAGE_KEYS.TIMESTAMP] || 'timestamp';
    (document.getElementById('wordCount') as HTMLInputElement).value =
      items[STORAGE_KEYS.WORD_COUNT] || 'word-count';

    (document.getElementById('domain-checkbox') as HTMLInputElement).checked =
      items[STORAGE_KEYS.INCLUDE_DOMAIN] ?? true;
    (document.getElementById('excerpt-checkbox') as HTMLInputElement).checked =
      items[STORAGE_KEYS.INCLUDE_EXCERPT] ?? true;
    (document.getElementById('link-checkbox') as HTMLInputElement).checked =
      items[STORAGE_KEYS.INCLUDE_LINK] ?? true;
    (document.getElementById('status-checkbox') as HTMLInputElement).checked =
      items[STORAGE_KEYS.INCLUDE_STATUS] ?? false;
    (
      document.getElementById('timestamp-checkbox') as HTMLInputElement
    ).checked = items[STORAGE_KEYS.INCLUDE_TIMESTAMP] ?? true;
    (document.getElementById('title-checkbox') as HTMLInputElement).checked =
      items[STORAGE_KEYS.INCLUDE_TITLE] ?? true;
    (
      document.getElementById('word-count-checkbox') as HTMLInputElement
    ).checked = items[STORAGE_KEYS.INCLUDE_WORD_COUNT] ?? true;
  });
}

function sanitizeInput(input: string | null): string | null {
  if (!input) {
    return null;
  }
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function getFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  const formValues: Record<string, any> = {};

  for (const [name, value] of formData.entries()) {
    formValues[name] = value;
  }

  return formValues;
}
