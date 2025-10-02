const fileSources = [
    { url: 'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/books-tags.csv', type: 'csv', tableName: 'book_tags' },
    { url: 'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/cats.csv', type: 'csv', tableName: 'categories' },
    { url: 'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/popular-history-books.csv', type: 'csv', tableName: 'books' },
    { url: 'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_csv/tags.csv', type: 'csv' },  // No custom tableName, will use default
    { url: 'https://raw.githubusercontent.com/aewshopping/history_books/refs/heads/main/data_tsv/quotes.tsv', type: 'tsv', tableName: 'historical_quotes' }
];

export { fileSources };
