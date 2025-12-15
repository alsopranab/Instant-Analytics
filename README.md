# Instant Analytics

Instant Analytics is a lightweight, client-side analytics tool that allows users to upload CSV data and ask natural-language questions to generate charts, insights, and explanations instantly — without a backend or external libraries.

---

## Key Capabilities

- Upload CSV files directly in the browser
- Automatically detect schema and data types
- Ask natural-language questions (e.g. “Show total sales by month”)
- Intelligent chart selection (bar, line, pie, table)
- Data transformation and aggregation on the fly
- Clear explanations of what the chart represents
- Zero dependencies, zero build tools

---

## Philosophy

Instant Analytics is designed around three principles:

1. **Instant Feedback**  
   No setup, no server, no waiting. Upload and analyze immediately.

2. **Human Queries, Machine Logic**  
   Users think in questions. The system translates intent into analytics.

3. **Strict Separation of Concerns**  
   Data, intelligence, visualization, and UI are isolated and testable.

---

## Project Structure

```
instant-analytics/
├── index.html # Application shell
├── README.md # Documentation
├── assets/
│ ├── css/ # Design system and styles
│ │ ├── tokens.css # Colors, spacing, typography
│ │ ├── base.css # Resets and layout
│ │ ├── components.css # UI components
│ │ ├── charts.css # Chart-specific styles
│ │ └── motion.css # Transitions and animations
│ └── js/
│ ├── app.js # App bootstrap and orchestration
│ ├── data/ # Data ingestion and schema
│ │ ├── load.js
│ │ ├── tabs.js
│ │ ├── csv.js
│ │ └── schema.js
│ ├── intelligence/ # Query understanding
│ │ ├── intent.js
│ │ ├── suggest.js
│ │ └── explain.js
│ ├── charts/ # Chart engine
│ │ ├── decide.js
│ │ ├── transform.js
│ │ └── render.js
│ ├── ui/ # UI logic
│ │ ├── input.js
│ │ ├── tabs.js
│ │ ├── query.js
│ │ └── dashboard.js
│ └── utils/ # Shared utilities
│ ├── debounce.js
│ └── helpers.js
```

---

## How It Works

1. User uploads a CSV file
2. The system parses and infers schema
3. Data is organized into tabs (tables)
4. User enters a natural-language query
5. Intent is detected (metric, dimension, aggregation)
6. A chart type is selected automatically
7. Data is transformed and rendered
8. Explanation and suggestions are shown

All of this happens **entirely in the browser**.

---

## Usage

1. Open `index.html` in a modern browser
2. Upload a `.csv` file
3. Select a data tab if multiple tables exist
4. Type a question in plain English
5. View the generated chart and explanation

No installation required.

---

## Browser Support

- Chrome (latest)
- Edge (latest)
- Firefox (latest)

ES modules are required.

---

## Limitations

- Client-side only (large CSVs may impact performance)
- No persistent storage
- No authentication or multi-user support

---

## License

This project is provided as-is for educational and internal use.
