export function exportToObsidian(
  fileName: string,
  fileContent: string,
  vault: string,
  folder: string
) {
  document.location.href =
    'obsidian://new?' +
    'file=' +
    encodeURIComponent(folder + '/' + fileName) +
    '&content=' +
    encodeURIComponent(fileContent) +
    '&vault=' +
    encodeURIComponent(`${vault}`);
}
