function save_options() {
  const vault = (document.getElementById('vault') as HTMLInputElement).value;
  const folder = (document.getElementById('folder') as HTMLInputElement).value;
  const tag = (document.getElementById('tag') as HTMLInputElement).value;
  chrome.storage.sync.set(
    {
      vaultName: vault,
      folder: folder,
      tag,
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
    (document.getElementById('vault') as HTMLInputElement).value = items.vaultName;
    (document.getElementById('folder') as HTMLInputElement).value = items.folder;
    (document.getElementById('tag') as HTMLInputElement).value = items.tag;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save')?.addEventListener('click', save_options);
