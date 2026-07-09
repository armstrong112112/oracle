export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      return { ...messages, ...flattenMessages(value, prefixedKey) };
    }

    return { ...messages, [prefixedKey]: value };
  }, {});
}
