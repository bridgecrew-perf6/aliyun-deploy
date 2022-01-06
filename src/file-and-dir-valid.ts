export function isFileAndDirValid(value: string): boolean {
  return typeof value === 'string' && !!value
}

export function formatFileAndDirValue(value: string): string[] {
  return value.split(',')
}
