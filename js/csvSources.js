/**
 * Configuration for CSV and TSV data sources to be loaded into the SQLite database.
 * Each source can optionally specify a custom table name.
 * If no tableName is provided, the table name will be derived from the filename.
 */

const fileSources = [
    {
        url: 'https://raw.githubusercontent.com/aewshopping/history-books-lite/refs/heads/main/data/books-tags.csv',
        type: 'csv',
        // No tableName specified - will default to 'books_tags' (derived from filename)
    },
    {
        url: 'https://raw.githubusercontent.com/aewshopping/history-books-lite/refs/heads/main/data/cats.csv',
        type: 'csv',
        tableName: 'categories'  // Custom table name
    },
    {
        url: 'https://raw.githubusercontent.com/aewshopping/history-books-lite/refs/heads/main/data/books.tsv',
        type: 'tsv',
        tableName: 'books'  // Custom table name
    },
    {
        url: 'https://raw.githubusercontent.com/aewshopping/history-books-lite/refs/heads/main/data/tags.csv',
        type: 'csv'
        // No tableName specified - will default to 'tags' (derived from filename)
    },
    {
        url: 'https://raw.githubusercontent.com/aewshopping/history-books-lite/refs/heads/main/data/quotes.tsv',
        type: 'tsv',
        tableName: 'book_quotes'  // Custom table name
    }
];

export { fileSources };