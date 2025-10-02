import { generateTableNameFromUrl } from '../db.js';

describe('Database Module', () => {
    describe('generateTableNameFromUrl', () => {
        test('should use custom table name when provided', () => {
            const url = 'https://example.com/data/myfile.csv';
            const customName = 'custom_table';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('custom_table');
        });

        test('should extract filename from URL when no custom name provided', () => {
            const url = 'https://example.com/data/sales_data.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('sales_data');
        });

        test('should handle special characters in custom table name', () => {
            const url = 'https://example.com/data/file.csv';
            const customName = 'my-table-name!@#';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_table_name');
        });

        test('should handle table names starting with numbers', () => {
            const url = 'https://example.com/123data.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('table_123data');
        });

        test('should handle empty custom name and fall back to URL', () => {
            const url = 'https://example.com/fallback.csv';
            const customName = '   '; // Whitespace only
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('fallback');
        });

        test('should handle complex URLs with query parameters', () => {
            const url = 'https://example.com/path/to/data.csv?param=value&other=123';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('data');
        });

        test('should handle URLs with multiple dots in filename', () => {
            const url = 'https://example.com/my.data.file.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('my_data_file');
        });

        test('should handle URLs ending with slash', () => {
            const url = 'https://example.com/folder/';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('default_table_name');
        });

        test('should sanitize table names with consecutive special characters', () => {
            const url = 'https://example.com/test.csv';
            const customName = 'my---table___name';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_table_name');
        });

        test('should handle numeric-only custom names', () => {
            const url = 'https://example.com/test.csv';
            const customName = '12345';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('table_12345');
        });

        test('should handle single underscore as custom name', () => {
            const url = 'https://example.com/test.csv';
            const customName = '_';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('default_table_name');
        });

        test('should preserve valid underscores in names', () => {
            const url = 'https://example.com/test.csv';
            const customName = 'valid_table_name_123';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('valid_table_name_123');
        });
    });
});