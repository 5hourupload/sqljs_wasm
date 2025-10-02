# CSV Sources with Custom Table Names Feature

## Overview
The application now supports loading CSV/TSV data sources with optional custom table names. When loading data into SQLite, you can specify the exact table name to use, or let the system automatically generate one from the filename.

## Configuration

### csvSources.js Structure
Each data source in the `fileSources` array can have the following properties:

```javascript
{
    url: 'https://example.com/data.csv',      // Required: URL of the CSV/TSV file
    tableName: 'custom_name',                 // Optional: Custom table name for SQLite
    type: 'csv'                               // Optional: 'csv' or 'tsv' (defaults to 'csv')
}
```

### Examples

1. **With custom table name:**
```javascript
{
    url: 'https://raw.githubusercontent.com/datasets/country-codes/master/data/country-codes.csv',
    tableName: 'countries',  // Will create table named 'countries' instead of 'country_codes'
    type: 'csv'
}
```

2. **Without custom table name (uses filename):**
```javascript
{
    url: 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv'
    // Will create table named 'countries_aggregated' (from filename)
}
```

## How It Works

1. **Table Name Generation:**
   - If `tableName` is provided, it will be sanitized and used
   - If not provided, the filename (without extension) is extracted from the URL and sanitized
   - Special characters are replaced with underscores
   - Names starting with numbers get 'table_' prefix
   - Multiple underscores are condensed to single ones

2. **Sanitization Rules:**
   - `my-table-name!` becomes `my_table_name`
   - `123data` becomes `table_123data`
   - `my___table` becomes `my_table`

## Usage

### Switching Between Data Sources

In `main.js`, you can switch between SQLite database and CSV sources:

```javascript
// Configuration: Set to 'sqlite' to load from SQLite DB, or 'csv' to load from CSV sources
const dataSourceMode = 'csv'; // or 'sqlite'
```

### Testing the Feature

1. **Run the test suite:**
```bash
npm test
```

2. **Test with real data:**
   - Open `test-csv-sources.html` in a browser
   - This loads real CSV data from GitHub datasets
   - Shows how custom table names are applied

3. **Use in production:**
   - Open `index.html` 
   - Set `dataSourceMode` to 'csv' in main.js
   - Configure your sources in `csvSources.js`

## API Functions

### generateTableNameFromUrl(url, customTableName)
Generates a sanitized table name from a URL or uses a custom name if provided.

**Parameters:**
- `url` (string): The URL to generate a table name from (used as fallback)
- `customTableName` (string, optional): An optional custom table name

**Returns:** 
- (string) The sanitized table name

### initializeDatabaseFromCSV(sources)
Initializes the SQL.js database from CSV sources.

**Parameters:**
- `sources` (Array): Array of source configurations

**Returns:** 
- (Promise<SQL.Database>) The initialized SQL.js database instance

### loadCSVSource(dbInstance, source)
Loads CSV/TSV data from a source configuration into the database.

**Parameters:**
- `dbInstance` (SQL.Database): The initialized SQL.js database instance
- `source` (Object): The source configuration object

## Benefits

1. **Flexibility:** Choose meaningful table names that make SQL queries more intuitive
2. **Backward Compatibility:** Works with existing code - just don't specify tableName
3. **Clean Database Schema:** Avoid awkward table names from URLs
4. **Multiple Format Support:** Handles both CSV and TSV files

## Example SQL Queries

With custom table names:
```sql
-- Instead of: SELECT * FROM "country-codes"
SELECT * FROM countries LIMIT 5;

-- Instead of: SELECT * FROM "gdp"  
SELECT * FROM gdp_data WHERE year = 2020;

-- Join tables with meaningful names
SELECT c.name, g.value 
FROM countries c
JOIN gdp_data g ON c.code = g.country_code;
```