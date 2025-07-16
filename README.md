# Text Comparison Tool

A JavaScript-based web application that compares two text strings and visualizes their differences in real-time.

## Features

- Compare two text strings and highlight the differences
- Identifies various types of text modifications:
    - Added words
    - Deleted words
    - Moved words
    - Changed words
- Interactive web interface with two text areas for input
- Real-time comparison and visualization
- Case-sensitive comparison support

## Technical Details

The application consists of three main components:

- `compare.js`: Core comparison logic
- `stringify.js`: String handling and processing
- `wortify.js`: Word-level analysis and state management

### Dependencies

- jQuery 2.1.3
- Modern web browser with JavaScript support

## Usage

1. Open the HTML file in a web browser
2. Enter your first text in the left text area
3. Enter your second text in the right text area
4. Click the "GO" button to see the comparison results
5. Changes will be highlighted in yellow background

## Visualization

The tool uses different visual indicators to show changes:
- Added content is highlighted with yellow background
- Deleted content is marked with "|" symbol
- The output includes a detailed table view showing the exact changes

## Examples

The tool can handle various text modification scenarios:
- Text additions at the end
- Text deletions
- Middle-text modifications
- Special character handling
- Long text comparisons

## Technical Implementation

The comparison algorithm uses:
- Word-by-word comparison
- Position tracking
- State management for each word (Added, Deleted, Moved, Standard)
- Maximum distance checking for moved words

## Browser Compatibility

Works in modern web browsers that support:
- JavaScript
- jQuery
- CSS3