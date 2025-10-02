import { generateTableNameFromUrl } from '../db.js';

describe('Database Table Name Generation', () => {
    describe('generateTableNameFromUrl', () => {
        test('should use custom table name when provided', () => {
            const url = 'https://example.com/data.csv';
            const customName = 'my_custom_table';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_custom_table');
        });

        test('should sanitize custom table name', () => {
            const url = 'https://example.com/data.csv';
            const customName = 'my-custom-table!@#';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_custom_table');
        });

        test('should use filename when no custom name provided', () => {
            const url = 'https://example.com/test-data.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('test_data');
        });

        test('should remove file extension from generated name', () => {
            const url = 'https://example.com/myfile.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('myfile');
        });

        test('should handle URLs with query parameters', () => {
            const url = 'https://example.com/data.csv?version=1';
            const result = generateTableNameFromUrl(url);
            // The function removes the extension and query parameters
            expect(result).toBe('data');
        });

        test('should handle empty custom table name', () => {
            const url = 'https://example.com/fallback.csv';
            const customName = '   ';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('fallback');
        });

        test('should handle table names starting with numbers', () => {
            const url = 'https://example.com/data.csv';
            const customName = '123table';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('table_123table');
        });

        test('should handle special characters in URL filename', () => {
            const url = 'https://example.com/my-data-file.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('my_data_file');
        });

        test('should condense multiple underscores', () => {
            const url = 'https://example.com/data.csv';
            const customName = 'my___table___name';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_table_name');
        });

        test('should handle edge case of all special characters', () => {
            const url = 'https://example.com/@#$.csv';
            const result = generateTableNameFromUrl(url);
            expect(result).toBe('default_table_name');
        });

        test('should trim leading and trailing underscores', () => {
            const url = 'https://example.com/data.csv';
            const customName = '_my_table_';
            const result = generateTableNameFromUrl(url, customName);
            expect(result).toBe('my_table');
        });
    });
});