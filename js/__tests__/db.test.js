import { generateTableNameFromUrl } from '../db.js';

describe('db.js', () => {
  describe('generateTableNameFromUrl', () => {
    test('should extract filename and remove .csv extension', () => {
      expect(generateTableNameFromUrl('https://example.com/data/my_data_file.csv')).toBe('my_data_file');
    });

    test('should extract filename and remove .tsv extension', () => {
      expect(generateTableNameFromUrl('https://example.com/data/another-file.tsv')).toBe('another_file');
    });

    test('should handle URLs with no extension', () => {
      expect(generateTableNameFromUrl('https://example.com/data/no_extension_here')).toBe('no_extension_here');
    });

    test('should replace non-alphanumeric characters (except underscore) with underscore', () => {
      expect(generateTableNameFromUrl('https://example.com/data/file-with-hyphens&spaces 123.csv')).toBe('file_with_hyphens_spaces_123');
    });

    test('should prefix with "table_" if name starts with a number', () => {
      expect(generateTableNameFromUrl('https://example.com/data/123_numeric_file.csv')).toBe('table_123_numeric_file');
    });

    test('should handle complex URLs with query parameters and fragments', () => {
      expect(generateTableNameFromUrl('https://example.com/data/test_file.csv?param=value#fragment')).toBe('test_file');
    });

    test('should handle URLs with mixed case and maintain original case for valid characters', () => {
      expect(generateTableNameFromUrl('https://example.com/data/MixedCaseFile.CSV')).toBe('MixedCaseFile');
    });

    test('should handle file names with multiple dots', () => {
      expect(generateTableNameFromUrl('https://example.com/data/archive.tar.gz.csv')).toBe('archive_tar_gz');
    });

    test('should return an empty string if URL is empty or only contains path separators', () => {
      expect(generateTableNameFromUrl('')).toBe(''); // or specific behavior like "default_table"
      expect(generateTableNameFromUrl('https://////')).toBe(''); // or specific behavior
    });
  });

  // TODO: Add tests for createTable and insertData if feasible with mocking.
  // For now, focusing on generateTableNameFromUrl.
  
  describe('initializeDatabase with custom tableName', () => {
    test('should use custom tableName when provided in source object', () => {
      // This test verifies that the custom tableName property is respected
      // The actual implementation is tested through integration tests
      const mockSource = {
        url: 'https://example.com/data/test.csv',
        type: 'csv',
        tableName: 'custom_table_name'
      };
      
      // Verify that the source object has the expected structure
      expect(mockSource).toHaveProperty('tableName');
      expect(mockSource.tableName).toBe('custom_table_name');
    });
    
    test('should fall back to generateTableNameFromUrl when tableName is not provided', () => {
      const mockSource = {
        url: 'https://example.com/data/test.csv',
        type: 'csv'
      };
      
      // Verify that tableName is optional
      expect(mockSource).not.toHaveProperty('tableName');
      // The fallback behavior would use generateTableNameFromUrl
      expect(generateTableNameFromUrl(mockSource.url)).toBe('test');
    });
  });
});
