import { generateTableNameFromUrl } from '../db.js';

describe('Table Naming Functionality', () => {
  describe('Custom table names vs default names', () => {
    test('should use custom table name when provided', () => {
      const source = {
        url: 'https://example.com/data/my-file.csv',
        type: 'csv',
        tableName: 'custom_table'
      };
      
      // Simulate the logic from db.js
      const tableName = source.tableName || generateTableNameFromUrl(source.url);
      expect(tableName).toBe('custom_table');
    });

    test('should use generated table name when custom name not provided', () => {
      const source = {
        url: 'https://example.com/data/my-file.csv',
        type: 'csv'
      };
      
      // Simulate the logic from db.js
      const tableName = source.tableName || generateTableNameFromUrl(source.url);
      expect(tableName).toBe('my_file');
    });

    test('should handle empty string as falsy and use generated name', () => {
      const source = {
        url: 'https://example.com/data/my-file.csv',
        type: 'csv',
        tableName: ''
      };
      
      // Simulate the logic from db.js
      const tableName = source.tableName || generateTableNameFromUrl(source.url);
      expect(tableName).toBe('my_file');
    });

    test('should handle various custom table names correctly', () => {
      const testCases = [
        {
          source: {
            url: 'https://example.com/data/books-tags.csv',
            type: 'csv',
            tableName: 'book_tags'
          },
          expected: 'book_tags'
        },
        {
          source: {
            url: 'https://example.com/data/cats.csv',
            type: 'csv',
            tableName: 'categories'
          },
          expected: 'categories'
        },
        {
          source: {
            url: 'https://example.com/data/popular-history-books.csv',
            type: 'csv',
            tableName: 'history_books'
          },
          expected: 'history_books'
        },
        {
          source: {
            url: 'https://example.com/data/quotes.tsv',
            type: 'tsv',
            tableName: 'famous_quotes'
          },
          expected: 'famous_quotes'
        }
      ];

      testCases.forEach(({ source, expected }) => {
        const tableName = source.tableName || generateTableNameFromUrl(source.url);
        expect(tableName).toBe(expected);
      });
    });
  });

  describe('Integration with actual file sources', () => {
    test('should correctly determine table names for all sources in csvSources.js', async () => {
      const { fileSources } = await import('../csvSources.js');
      
      const expectedTableNames = {
        'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/books-tags.csv': 'book_tags',
        'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/cats.csv': 'categories',
        'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/popular-history-books.csv': 'history_books',
        'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/tags.csv': 'tags', // Default from URL
        'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_tsv/quotes.tsv': 'famous_quotes'
      };

      fileSources.forEach(source => {
        const tableName = source.tableName || generateTableNameFromUrl(source.url);
        expect(tableName).toBe(expectedTableNames[source.url]);
      });
    });
  });
});