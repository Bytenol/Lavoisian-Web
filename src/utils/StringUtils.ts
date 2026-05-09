export const isDigit = (char: string) => char.match(/[0-9]/);

export const isAlphabet = (char: string) => char.match(/[a-z]|[A-Z]/);

export const isUpper = (char: string) => char.match(/[A-Z]/);