import { fileSources } from '../csvSources.js';

describe('CSV Sources Configuration', () => {
    test('fileSources should be an array', () => {
        expect(Array.isArray(fileSources)).toBe(true);
    });

    test('fileSources should contain at least one source', () => {
        expect(fileSources.length).toBeGreaterThan(0);
    });

    test('each source should have required properties', () => {
        fileSources.forEach((source, index) => {
            // Check required properties
            expect(source).toHaveProperty('url');
            expect(source).toHaveProperty('type');
            
            // Check that url is a string
            expect(typeof source.url).toBe('string');
            
            // Check that type is either 'csv' or 'tsv'
            expect(['csv', 'tsv']).toContain(source.type);
            
            // Check optional tableName property if it exists
            if (source.tableName !== undefined) {
                expect(typeof source.tableName).toBe('string');
                expect(source.tableName.trim()).not.toBe('');
            }
        });
    });

    test('sources with custom table names should have valid names', () => {
        const sourcesWithTableNames = fileSources.filter(source => source.tableName);
        
        sourcesWithTableNames.forEach(source => {
            // Table name should not be empty
            expect(source.tableName.trim()).not.toBe('');
            
            // Table name should not contain only special characters
            expect(source.tableName).toMatch(/[a-zA-Z0-9]/);
        });
    });

    test('sources without table names should have valid URLs for name generation', () => {
        const sourcesWithoutTableNames = fileSources.filter(source => !source.tableName);
        
        sourcesWithoutTableNames.forEach(source => {
            // URL should have a filename part
            const filename = source.url.substring(source.url.lastIndexOf('/') + 1);
            expect(filename).not.toBe('');
            
            // Filename should have characters before the extension
            const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
            expect(nameWithoutExtension).not.toBe('');
        });
    });

    test('specific sources should have expected table names', () => {
        // Test that specific sources have the expected table names
        const categoriesSource = fileSources.find(s => s.url.includes('cats.csv'));
        if (categoriesSource) {
            expect(categoriesSource.tableName).toBe('categories');
        }

        const booksSource = fileSources.find(s => s.url.includes('books.tsv'));
        if (booksSource) {
            expect(booksSource.tableName).toBe('books');
        }

        const quotesSource = fileSources.find(s => s.url.includes('quotes.tsv'));
        if (quotesSource) {
            expect(quotesSource.tableName).toBe('book_quotes');
        }
    });
});