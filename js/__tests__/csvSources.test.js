import { fileSources } from '../csvSources.js';

describe('CSV Sources Configuration', () => {
    test('fileSources should be an array', () => {
        expect(Array.isArray(fileSources)).toBe(true);
    });

    test('each source should have a url property', () => {
        fileSources.forEach(source => {
            expect(source).toHaveProperty('url');
            expect(typeof source.url).toBe('string');
            expect(source.url.length).toBeGreaterThan(0);
        });
    });

    test('tableName should be optional but a string if provided', () => {
        fileSources.forEach(source => {
            if (source.hasOwnProperty('tableName')) {
                expect(typeof source.tableName).toBe('string');
                expect(source.tableName.length).toBeGreaterThan(0);
            }
        });
    });

    test('type should be optional but either csv or tsv if provided', () => {
        fileSources.forEach(source => {
            if (source.hasOwnProperty('type')) {
                expect(['csv', 'tsv']).toContain(source.type);
            }
        });
    });

    test('sources with custom table names should be properly configured', () => {
        const sourcesWithTableNames = fileSources.filter(s => s.tableName);
        
        // Check that at least some sources have custom table names for testing
        expect(sourcesWithTableNames.length).toBeGreaterThan(0);
        
        sourcesWithTableNames.forEach(source => {
            expect(source.tableName).toBeTruthy();
            expect(typeof source.tableName).toBe('string');
        });
    });

    test('sources without table names should still have valid URLs', () => {
        const sourcesWithoutTableNames = fileSources.filter(s => !s.tableName);
        
        sourcesWithoutTableNames.forEach(source => {
            expect(source.url).toBeTruthy();
            // URL should have a filename that can be extracted
            const filename = source.url.substring(source.url.lastIndexOf('/') + 1);
            expect(filename.length).toBeGreaterThan(0);
        });
    });

    test('should have diverse source types for testing', () => {
        const csvSources = fileSources.filter(s => !s.type || s.type === 'csv');
        const tsvSources = fileSources.filter(s => s.type === 'tsv');
        
        // We should have at least one CSV source
        expect(csvSources.length).toBeGreaterThan(0);
        
        // Check if we have TSV sources (optional but good for testing)
        if (tsvSources.length > 0) {
            expect(tsvSources[0].type).toBe('tsv');
        }
    });

    test('source URLs should be properly formatted', () => {
        fileSources.forEach(source => {
            // Check that URL starts with http:// or https://
            expect(source.url).toMatch(/^https?:\/\//);
            
            // Check that URL has a file extension
            expect(source.url).toMatch(/\.(csv|tsv|txt)$/i);
        });
    });
});