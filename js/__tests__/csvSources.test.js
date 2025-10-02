import { fileSources } from '../csvSources.js';

describe('fileSources', () => {
  test('should be an array', () => {
    expect(Array.isArray(fileSources)).toBe(true);
  });

  test('should not be empty', () => {
    expect(fileSources.length).toBeGreaterThan(0);
  });

  test('each element should be an object with url and type properties', () => {
    fileSources.forEach(source => {
      expect(source).toBeInstanceOf(Object);
      expect(source).toHaveProperty('url');
      expect(typeof source.url).toBe('string');
      expect(source).toHaveProperty('type');
      expect(typeof source.type).toBe('string');
    });
  });

  test('tableName property should be optional and a string when present', () => {
    fileSources.forEach(source => {
      if ('tableName' in source) {
        expect(typeof source.tableName).toBe('string');
        expect(source.tableName.length).toBeGreaterThan(0);
      }
    });
  });

  test('url properties should be valid URLs', () => {
    fileSources.forEach(source => {
      expect(() => new URL(source.url)).not.toThrow();
    });
  });

  test('type properties should be either "csv" or "tsv"', () => {
    fileSources.forEach(source => {
      expect(['csv', 'tsv']).toContain(source.type);
    });
  });
});
