export function yamlItem(key: string, value: string): string {
  const escapedValue = value.replace(/"/g, "'").replace(/\n/g, ' ');
  return `${key}: "${escapedValue}"\n`;
}
