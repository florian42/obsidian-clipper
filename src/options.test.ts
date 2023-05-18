import { STORAGE_KEYS, saveOptions, restoreOptions } from './options';

describe('options.ts', () => {
  // Mock chrome.storage.sync
  const storageData: { [key: string]: any } = {};
  (global as any).chrome = {
    storage: {
      sync: {
        set: (data: { [key: string]: any }, callback: () => void) => {
          Object.assign(storageData, data);
          callback();
        },
        get: (callback: (items: { [key: string]: any }) => void) => {
          callback(storageData);
        },
      },
    },
  };

  // Helper function to create a form element
  const createFormElement = (
    id: string,
    value: string | boolean,
    type: string = 'text',
    name?: string
  ) => {
    const element = document.createElement('input');
    element.id = id;
    element.type = type;
    element.name = name || id;
    if (type === 'checkbox') {
      (element as HTMLInputElement).checked = value as boolean;
    } else {
      (element as HTMLInputElement).value = value as string;
    }
    return element;
  };

  // Helper function to create a div element with a given id
  const createDivElement = (id: string) => {
    const element = document.createElement('div');
    element.id = id;
    return element;
  };

  describe('saveOptions', () => {
    it('should save form values to chrome storage', () => {
      // Helper function to create form elements

      const form = document.createElement('form');
      form.appendChild(createFormElement('vault', 'testVault'));
      form.appendChild(createFormElement('folder', 'testFolder'));
      form.appendChild(createFormElement('tag', 'testTag'));
      form.appendChild(createFormElement('title', 'testTitle'));
      form.appendChild(createFormElement('domain', 'testDomain'));
      form.appendChild(createFormElement('excerpt', 'testExcerpt'));
      form.appendChild(createFormElement('link', 'testLink'));
      form.appendChild(createFormElement('status-input', 'testStatusInput', 'text', 'status'));
      form.appendChild(createFormElement('timestamp', 'testTimestamp'));
      form.appendChild(createFormElement('wordCount', 'testWordCount'));
      form.appendChild(createFormElement('domain-checkbox', true, 'checkbox', 'include-domain'));
      form.appendChild(createFormElement('title-checkbox', true, 'checkbox', 'include-title'));
      form.appendChild(
        createFormElement('excerpt-checkbox', false, 'checkbox')
      );
      form.appendChild(createFormElement('link-checkbox', true, 'checkbox', 'include-link'));
      form.appendChild(createFormElement('status-checkbox', false, 'checkbox', 'include-status'));
      form.appendChild(
        createFormElement('timestamp-checkbox', true, 'checkbox', 'include-timestamp')
      );
      form.appendChild(
        createFormElement('word-count-checkbox', false, 'checkbox', 'include-word-count')
      );

      document.body.appendChild(form);

      // Create and append the "status" div element
      const statusDiv = createDivElement('status');
      document.body.appendChild(statusDiv);

      const submitEvent = new Event('submit');
      form.addEventListener('submit', (event) => {
        event.preventDefault()
        saveOptions(event as any)
      });
      form.dispatchEvent(submitEvent);

      expect(storageData[STORAGE_KEYS.VAULT_NAME]).toBe('testVault');
      expect(storageData[STORAGE_KEYS.FOLDER]).toBe('testFolder');
      expect(storageData[STORAGE_KEYS.TAG]).toBe('testTag');
      expect(storageData[STORAGE_KEYS.TITLE]).toBe('testTitle');
      expect(storageData[STORAGE_KEYS.DOMAIN]).toBe('testDomain');
      expect(storageData[STORAGE_KEYS.EXCERPT]).toBe('testExcerpt');
      expect(storageData[STORAGE_KEYS.LINK]).toBe('testLink');
      expect(storageData[STORAGE_KEYS.STATUS]).toBe('testStatusInput');
      expect(storageData[STORAGE_KEYS.TIMESTAMP]).toBe('testTimestamp');
      expect(storageData[STORAGE_KEYS.WORD_COUNT]).toBe('testWordCount');
      expect(storageData[STORAGE_KEYS.INCLUDE_DOMAIN]).toBe(true);
      expect(storageData[STORAGE_KEYS.INCLUDE_TITLE]).toBe(true);
      expect(storageData[STORAGE_KEYS.INCLUDE_EXCERPT]).toBe(false);
      expect(storageData[STORAGE_KEYS.INCLUDE_LINK]).toBe(true);
      expect(storageData[STORAGE_KEYS.INCLUDE_STATUS]).toBe(false);
      expect(storageData[STORAGE_KEYS.INCLUDE_TIMESTAMP]).toBe(true);
      expect(storageData[STORAGE_KEYS.INCLUDE_WORD_COUNT]).toBe(false);
    });
  });

  describe('restoreOptions', () => {
    it('should restore values from chrome storage to form elements', () => {
      // Set values in the mocked chrome storage
      storageData[STORAGE_KEYS.VAULT_NAME] = 'restoredVault';
      storageData[STORAGE_KEYS.FOLDER] = 'restoredFolder';
      storageData[STORAGE_KEYS.INCLUDE_DOMAIN] = true;
      storageData[STORAGE_KEYS.TAG] = 'restoredTag';
      storageData[STORAGE_KEYS.INCLUDE_TITLE] = true;
      storageData[STORAGE_KEYS.INCLUDE_EXCERPT] = false;
      storageData[STORAGE_KEYS.INCLUDE_LINK] = true;
      storageData[STORAGE_KEYS.INCLUDE_STATUS] = false;
      storageData[STORAGE_KEYS.INCLUDE_TIMESTAMP] = true;
      storageData[STORAGE_KEYS.INCLUDE_WORD_COUNT] = false;
      storageData[STORAGE_KEYS.TITLE] = 'restoredTitle';
      storageData[STORAGE_KEYS.DOMAIN] = 'restoredDomain';
      storageData[STORAGE_KEYS.EXCERPT] = 'restoredExcerpt';
      storageData[STORAGE_KEYS.LINK] = 'restoredLink';
      storageData[STORAGE_KEYS.STATUS] = 'restoredStatusInput';
      storageData[STORAGE_KEYS.TIMESTAMP] = 'restoredTimestamp';
      storageData[STORAGE_KEYS.WORD_COUNT] = 'restoredWordCount';

      // Create and append form elements
      const createElement = (id: string, type: string) => {
        const element = document.createElement('input');
        element.id = id;
        element.type = type;
        return element;
      };

      const textInputs = [
        'vault',
        'folder',
        'tag',
        'title',
        'domain',
        'excerpt',
        'link',
        'status-input',
        'timestamp',
        'wordCount',
      ];

      textInputs.forEach((id) => {
        document.body.appendChild(createElement(id, 'text'));
      });

      const checkboxInputs = [
        'domain-checkbox',
        'title-checkbox',
        'excerpt-checkbox',
        'link-checkbox',
        'status-checkbox',
        'timestamp-checkbox',
        'word-count-checkbox',
      ];

      checkboxInputs.forEach((id) => {
        document.body.appendChild(createElement(id, 'checkbox'));
      });

      // Call restoreOptions and check if the values are restored correctly
      restoreOptions();

      expect((document.getElementById('vault') as HTMLInputElement).value).toBe(
        'restoredVault'
      );
      expect(
        (document.getElementById('folder') as HTMLInputElement).value
      ).toBe('restoredFolder');
      expect((document.getElementById('tag') as HTMLInputElement).value).toBe(
        'restoredTag'
      );
      expect((document.getElementById('title') as HTMLInputElement).value).toBe(
        'restoredTitle'
      );
      expect(
        (document.getElementById('domain') as HTMLInputElement).value
      ).toBe('restoredDomain');
      expect(
        (document.getElementById('excerpt') as HTMLInputElement).value
      ).toBe('restoredExcerpt');
      expect((document.getElementById('link') as HTMLInputElement).value).toBe(
        'restoredLink'
      );
      expect(
        (document.getElementById('status-input') as HTMLInputElement).value
      ).toBe('restoredStatusInput');
      expect(
        (document.getElementById('timestamp') as HTMLInputElement).value
      ).toBe('restoredTimestamp');
      expect(
        (document.getElementById('wordCount') as HTMLInputElement).value
      ).toBe('restoredWordCount');
      expect(
        (document.getElementById('domain-checkbox') as HTMLInputElement).checked
      ).toBe(true);
      expect(
        (document.getElementById('title-checkbox') as HTMLInputElement).checked
      ).toBe(true);
      expect(
        (document.getElementById('excerpt-checkbox') as HTMLInputElement)
          .checked
      ).toBe(false);
      expect(
        (document.getElementById('link-checkbox') as HTMLInputElement).checked
      ).toBe(true);
      expect(
        (document.getElementById('status-checkbox') as HTMLInputElement).checked
      ).toBe(false);
      expect(
        (document.getElementById('timestamp-checkbox') as HTMLInputElement)
          .checked
      ).toBe(true);
      expect(
        (document.getElementById('word-count-checkbox') as HTMLInputElement)
          .checked
      ).toBe(false);
    });
  });
});
