export function yamlItem(key: string, value: string): string {
    return `${key}: "${value.replace(/"/g, "'")}"\n`
}