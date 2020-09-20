import { capitalize, decapitalize, toCamelCase, toTitleCase } from './string-helper';

describe('string-helper', () => {
  describe('capitalize', () => {
    it('should capitalize a text', () => {
      expect(capitalize('lorem ipsum')).toBe('Lorem ipsum');
    });
  });

  describe('decapitalize', () => {
    it('should decapitalize a text', () => {
      expect(decapitalize('Lorem Ipsum')).toBe('lorem Ipsum');
    });
  });

  describe('toTitleCase', () => {
    it('should convert camel case to title case', () => {
      expect(toTitleCase('loremIpsum')).toBe('Lorem Ipsum');
    });
  });

  describe('toCamelCase', () => {
    it('should convert title case to camel case', () => {
      expect(toCamelCase('Lorem Ipsum')).toBe('loremIpsum');
    });
  });
});
