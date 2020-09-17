export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const decapitalize = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);

export const toTitleCase = (camelCase: string): string =>
  capitalize(camelCase)
    .replace(/([A-Z])/g, ' $1')
    .trim();

export const toCamelCase = (titleCase: string): string =>
  decapitalize(titleCase).replace(/\s/g, '');
