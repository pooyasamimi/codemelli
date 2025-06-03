# Iranian Provinces and Cities Data

This project contains a comprehensive JSON dataset of Iranian provinces and their cities, including their corresponding codes.

## Data Structure

The data is organized in a hierarchical structure:
- Provinces (استان‌ها)
- Cities (شهرها)

Each province contains:
- `name`: The name of the province in Persian
- `cities`: An array of cities belonging to that province

Each city contains:
- `name`: The name of the city in Persian
- `code`: A unique numeric code for the city

## Example

```json
{
  "name": "آذربایجان شرقی",
  "cities": [
    { "name": "آذرشهر", "code": 170 },
    { "name": "اسکو", "code": 149 },
    // ... more cities
  ]
}
```

## Features

- Complete list of all Iranian provinces
- Comprehensive city data for each province
- Unique city codes for identification
- Persian language support
- UTF-8 encoding

## Usage

The data is stored in `public/provinces.json` and can be used for:
- Location-based applications
- Address forms
- Geographic data visualization
- Administrative purposes

## Data Source

This dataset contains official administrative divisions of Iran, including:
- 31 provinces
- Over 400 cities
- Official city codes

## Technical Details

- File Format: JSON
- Encoding: UTF-8
- Language: Persian
- Structure: Hierarchical (Provinces > Cities)

## License

This data is provided for educational and development purposes. Please ensure proper attribution when using this data in your projects.
