/**
 * CSV data sources configuration.
 * Each source can have:
 * - url: The URL of the CSV/TSV file (required)
 * - tableName: Optional custom table name for SQLite (defaults to filename without extension)
 * - type: 'csv' or 'tsv' (defaults to 'csv' if not specified)
 */
const fileSources = [
    {
        url: 'https://raw.githubusercontent.com/datasets/country-codes/master/data/country-codes.csv',
        tableName: 'countries',  // Custom table name instead of 'country_codes'
        type: 'csv'
    },
    {
        url: 'https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv',
        tableName: 'gdp_data',  // Custom table name
        type: 'csv'
    },
    {
        url: 'https://raw.githubusercontent.com/datasets/population/master/data/population.csv',
        tableName: 'world_population',  // Custom table name instead of just 'population'
        type: 'csv'
    },
    {
        url: 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv'
        // No tableName specified, will default to 'countries_aggregated' (filename without extension)
    }
];

export { fileSources };